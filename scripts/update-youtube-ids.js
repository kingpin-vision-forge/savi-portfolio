const fs = require('fs');
const path = require('path');
const readline = require('readline');
const constants = require('./youtube-constants');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function question(query) {
    return new Promise(resolve => rl.question(query, resolve));
}

// Load the verification report
function loadReport() {
    if (!fs.existsSync(constants.REPORT_FILE)) {
        throw new Error('Report file not found. Run verify-youtube-ids.js first.');
    }
    
    const report = JSON.parse(fs.readFileSync(constants.REPORT_FILE, 'utf8'));
    console.log(`✓ Loaded report with ${report.broken.length} broken videos`);
    return report;
}

// Load current tracks
function loadTracks() {
    const content = fs.readFileSync(constants.INPUT_FILE, 'utf8');
    
    const tracksMatch = content.match(/const tracks:\s*Track\[\]\s*=\s*\[([\s\S]*?)\];/);
    if (!tracksMatch) {
        throw new Error('Could not find tracks array');
    }
    
    const tracksContent = tracksMatch[1];
    const tracks = [];
    const trackRegex = /\{\s*id:\s*(\d+),\s*title:\s*'([^']+)',\s*artist:\s*'([^']+)',\s*duration:\s*'([^']+)',\s*cover:\s*'([^']+)',\s*youtubeId:\s*'([^']+)',\s*language:\s*'([^']+)',\s*era:\s*'([^']+)'\s*\}/g;
    let match;
    
    while ((match = trackRegex.exec(tracksContent)) !== null) {
        tracks.push({
            id: parseInt(match[1]),
            title: match[2],
            artist: match[3],
            duration: match[4],
            cover: match[5],
            youtubeId: match[6],
            language: match[7],
            era: match[8],
            startIndex: match.index,
            endIndex: trackRegex.lastIndex,
            fullMatch: match[0]
        });
    }
    
    return { content, tracks, tracksMatch };
}

// Validate YouTube ID format (11 characters, alphanumeric + - and _)
function isValidYoutubeId(id) {
    return /^[a-zA-Z0-9_-]{11}$/.test(id);
}

// Extract video ID from YouTube URL
function extractVideoId(input) {
    input = input.trim();
    
    // Already an ID (11 chars)
    if (isValidYoutubeId(input)) {
        return input;
    }
    
    // Full URL: https://www.youtube.com/watch?v=VIDEO_ID
    const watchMatch = input.match(/[?&]v=([a-zA-Z0-9_-]{11})/);
    if (watchMatch) return watchMatch[1];
    
    // Short URL: https://youtu.be/VIDEO_ID
    const shortMatch = input.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
    if (shortMatch) return shortMatch[1];
    
    // Embed URL: https://www.youtube.com/embed/VIDEO_ID
    const embedMatch = input.match(/\/embed\/([a-zA-Z0-9_-]{11})/);
    if (embedMatch) return embedMatch[1];
    
    return null;
}

// Interactive mode - collect replacements one by one
async function interactiveMode(report, tracks) {
    console.log('\n🔧 INTERACTIVE UPDATE MODE\n');
    console.log('For each broken video, you can:');
    console.log('  • Enter the new 11-character YouTube ID');
    console.log('  • Paste the full YouTube URL');
    console.log('  • Type "skip" to skip this video');
    console.log('  • Type "quit" to cancel\n');
    
    const replacements = new Map();
    
    for (const video of report.broken) {
        console.log('-'.repeat(60));
        console.log(`Track: ${video.title} - ${video.artist} (${video.era}, ${video.language})`);
        console.log(`Current ID: ${video.originalId}`);
        console.log(`Issue: ${video.reasons.join(', ')}`);
        console.log(`Suggested search: ${video.searchQuery}`);
        console.log(`Search URL: https://www.youtube.com/results?search_query=${encodeURIComponent(video.searchQuery)}`);
        console.log();
        
        const answer = await question('Enter new YouTube ID/URL (or "skip"/"quit"): ');
        
        if (answer.toLowerCase() === 'quit') {
            console.log('\n❌ Update cancelled by user.');
            rl.close();
            return null;
        }
        
        if (answer.toLowerCase() === 'skip') {
            console.log('⊘ Skipped\n');
            continue;
        }
        
        const newId = extractVideoId(answer);
        if (!newId) {
            console.log('❌ Invalid YouTube ID or URL. Must be 11 characters.\n');
            continue;
        }
        
        console.log(`✓ Will update to: ${newId}\n`);
        replacements.set(video.trackId, { oldId: video.originalId, newId, title: video.title });
    }
    
    rl.close();
    return replacements;
}

// Batch mode - load replacements from JSON
function batchMode(replacementsFile) {
    if (!fs.existsSync(replacementsFile)) {
        throw new Error(`Replacements file not found: ${replacementsFile}`);
    }
    
    const replacements = JSON.parse(fs.readFileSync(replacementsFile, 'utf8'));
    const replacementMap = new Map();
    
    Object.entries(replacements).forEach(([trackId, newId]) => {
        const validatedId = extractVideoId(newId);
        if (!validatedId) {
            console.warn(`⚠️  Invalid ID for track ${trackId}: ${newId}`);
            return;
        }
        replacementMap.set(parseInt(trackId), { oldId: 'unknown', newId: validatedId });
    });
    
    return replacementMap;
}

// Apply replacements to the file
function applyReplacements(tracksData, replacements) {
    let { content, tracks } = tracksData;
    let updatedCount = 0;
    const changes = [];
    
    tracks.forEach(track => {
        const replacement = replacements.get(track.id);
        if (replacement) {
            const oldString = `youtubeId: '${track.youtubeId}'`;
            const newString = `youtubeId: '${replacement.newId}'`;
            
            if (content.includes(oldString)) {
                content = content.replace(oldString, newString);
                updatedCount++;
                changes.push({
                    trackId: track.id,
                    title: track.title,
                    oldId: track.youtubeId,
                    newId: replacement.newId
                });
            } else {
                console.warn(`⚠️  Could not find youtubeId field for track ${track.id}`);
            }
        }
    });
    
    return { content, updatedCount, changes };
}

// Save updated file
function saveUpdatedFile(content, filePath) {
    const backupPath = filePath + '.backup';
    
    // Create backup
    fs.copyFileSync(filePath, backupPath);
    console.log(`✓ Backup created: ${path.relative(process.cwd(), backupPath)}`);
    
    // Write updated content
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✓ Updated: ${path.relative(process.cwd(), filePath)}`);
}

// Main execution
async function main() {
    console.log('🎵 SAVI Music - YouTube ID Update Tool\n');
    console.log('='.repeat(50));
    
    try {
        // Load report
        const report = loadReport();
        
        if (report.broken.length === 0) {
            console.log('\n✅ No broken videos to update!');
            return;
        }
        
        // Load tracks
        const tracksData = loadTracks();
        
        // Choose mode
        const mode = process.argv[2];
        let replacements;
        
        if (mode === '--batch' && process.argv[3]) {
            console.log('\n📦 BATCH MODE: Loading replacements from file...');
            replacements = batchMode(process.argv[3]);
        } else {
            // Interactive mode (default)
            replacements = await interactiveMode(report, tracksData.tracks);
            
            if (!replacements || replacements.size === 0) {
                console.log('\nℹ️  No updates to apply.');
                return;
            }
        }
        
        // Show summary
        console.log('\n' + '='.repeat(50));
        console.log('📋 UPDATE SUMMARY');
        console.log('='.repeat(50));
        console.log(`Tracks to update: ${replacements.size}`);
        console.log();
        
        replacements.forEach((replacement, trackId) => {
            const track = tracksData.tracks.find(t => t.id === trackId);
            console.log(`• ${track?.title || 'Unknown'}: ${replacement.oldId} → ${replacement.newId}`);
        });
        
        console.log();
        
        // Confirm
        if (mode !== '--batch') {
            const confirm = await question('Apply these updates? (yes/no): ');
            if (confirm.toLowerCase() !== 'yes') {
                console.log('\n❌ Update cancelled.');
                rl.close();
                return;
            }
        }
        
        // Apply updates
        const result = applyReplacements(tracksData, replacements);
        
        if (result.updatedCount === 0) {
            console.log('\n⚠️  No updates were applied.');
            return;
        }
        
        // Save
        saveUpdatedFile(result.content, constants.INPUT_FILE);
        
        // Save update report
        const updateReport = {
            updatedAt: new Date().toISOString(),
            totalUpdated: result.updatedCount,
            changes: result.changes
        };
        
        const updateReportPath = __dirname + '/youtube-ids-update-report.json';
        fs.writeFileSync(updateReportPath, JSON.stringify(updateReport, null, 2));
        
        console.log('\n' + '='.repeat(50));
        console.log('✅ UPDATE COMPLETE!');
        console.log('='.repeat(50));
        console.log(`Updated ${result.updatedCount} video ID(s)`);
        console.log(`Report saved to: ${path.relative(process.cwd(), updateReportPath)}`);
        console.log('\n💡 Next steps:');
        console.log('1. Run: npm run dev');
        console.log('2. Visit: http://localhost:3000/music');
        console.log('3. Test the updated videos\n');
        
    } catch (error) {
        console.error('\n❌ Error:', error.message);
        process.exit(1);
    } finally {
        rl.close();
    }
}

main();
