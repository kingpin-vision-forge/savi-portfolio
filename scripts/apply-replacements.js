const fs = require('fs');
const path = require('path');
const constants = require('./youtube-constants');

// Load replacements
function loadReplacements() {
    const filePath = __dirname + '/youtube-replacements-found.json';
    if (!fs.existsSync(filePath)) {
        throw new Error('Replacements file not found. Run find-replacements.js first.');
    }
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

// Load current tracks
function loadTracks() {
    const content = fs.readFileSync(constants.INPUT_FILE, 'utf8');
    const tracks = [];
    // More flexible regex to handle variable spacing
    const trackRegex = /\{\s*id:\s*(\d+),\s*title:\s*'([^']+)',\s*artist:\s*'([^']+)',\s*duration:\s*'([^']+)',\s*cover:\s*'([^']+)',\s*youtubeId:\s*'([^']+)',\s*language:\s*'([^']+)',\s*era:\s*'([^']+)'\s*\}/g;
    let match;
    
    while ((match = trackRegex.exec(content)) !== null) {
        tracks.push({
            id: parseInt(match[1]),
            title: match[2],
            artist: match[3],
            youtubeId: match[6],
            startIndex: match.index,
            fullMatch: match[0]
        });
    }
    
    return { content, tracks };
}

// Apply replacements
function applyReplacements(replacementsData) {
    let { content, tracks } = loadTracks();
    const changes = [];
    
    replacementsData.replacements.forEach(repl => {
        // Use 'id' instead of 'trackId' since that's what's in the tracks array
        const track = tracks.find(t => t.id === repl.trackId);
        if (!track) {
            console.warn(`⚠️  Track ${repl.trackId} (${repl.title}) not found in source file`);
            return;
        }
        
        const oldString = `youtubeId: '${track.youtubeId}'`;
        const newString = `youtubeId: '${repl.newId}'`;
        
        if (content.includes(oldString)) {
            content = content.replace(oldString, newString);
            changes.push({
                trackId: repl.trackId,
                title: repl.title,
                oldId: repl.oldId,
                newId: repl.newId,
                newTitle: repl.newTitle,
                channel: repl.channel
            });
        } else {
            console.warn(`⚠️  Could not find youtubeId field for track ${repl.trackId} (${track.youtubeId})`);
        }
    });
    
    return { content, changes };
}

// Save updated file
function saveUpdatedFile(content) {
    const backupPath = constants.INPUT_FILE + '.backup';
    fs.copyFileSync(constants.INPUT_FILE, backupPath);
    console.log(`✓ Backup created: ${path.relative(process.cwd(), backupPath)}`);
    
    fs.writeFileSync(constants.INPUT_FILE, content, 'utf8');
    console.log(`✓ Updated: ${path.relative(process.cwd(), constants.INPUT_FILE)}`);
}

// Main
function main() {
    console.log('🎵 SAVI Music - Apply Found Replacements\n');
    console.log('='.repeat(60));
    
    try {
        const replacementsData = loadReplacements();
        console.log(`Loaded ${replacementsData.replacements.length} replacement IDs\n`);
        
        const result = applyReplacements(replacementsData);
        
        if (result.changes.length === 0) {
            console.log('ℹ️  No changes to apply.');
            return;
        }
        
        console.log(`Ready to update ${result.changes.length} tracks:\n`);
        result.changes.forEach((change, i) => {
            console.log(`${i + 1}. ${change.title}`);
            console.log(`   ${change.oldId} → ${change.newId}`);
            console.log(`   Channel: ${change.channel}`);
        });
        
        console.log('\n' + '='.repeat(60));
        const confirm = 'yes'; // Auto-confirm since we verified these IDs
        if (confirm === 'yes') {
            saveUpdatedFile(result.content);
            
            // Save update report
            const updateReport = {
                updatedAt: new Date().toISOString(),
                totalUpdated: result.changes.length,
                changes: result.changes,
                stillNeeded: replacementsData.notFound
            };
            
            const reportPath = __dirname + '/youtube-update-report.json';
            fs.writeFileSync(reportPath, JSON.stringify(updateReport, null, 2));
            
            console.log('\n' + '='.repeat(60));
            console.log('✅ UPDATE COMPLETE!');
            console.log('='.repeat(60));
            console.log(`Updated ${result.changes.length} video ID(s)`);
            console.log(`Report saved to: ${path.relative(process.cwd(), reportPath)}`);
            
            if (replacementsData.notFound.length > 0) {
                console.log(`\n⚠️  ${replacementsData.notFound.length} tracks still need manual replacement:`);
                replacementsData.notFound.forEach(track => {
                    console.log(`   • ${track.title} (${track.artist})`);
                });
                console.log('\n💡 Use the search helper to find replacements for these:');
                console.log('   node scripts/generate-search-helper.js\n');
            } else {
                console.log('\n🎉 All tracks have been updated!');
                console.log('\n💡 Next steps:');
                console.log('1. Run: npm run dev');
                console.log('2. Visit: http://localhost:3000/music');
                console.log('3. Test the updated videos\n');
            }
        } else {
            console.log('\n❌ Update cancelled.');
        }
        
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
}

main();
