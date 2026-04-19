const https = require('https');
const fs = require('fs');
const path = require('path');
const constants = require('./youtube-constants');

// Load tracks from the music page
function loadTracks() {
    const content = fs.readFileSync(constants.INPUT_FILE, 'utf8');
    
    // Extract the tracks array using regex
    const tracksMatch = content.match(/const tracks:\s*Track\[\]\s*=\s*\[([\s\S]*?)\];/);
    if (!tracksMatch) {
        throw new Error('Could not find tracks array in ' + constants.INPUT_FILE);
    }
    
    const tracksContent = tracksMatch[1];
    const tracks = [];
    
    // Parse each track object
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
            era: match[8]
        });
    }
    
    console.log(`✓ Loaded ${tracks.length} tracks from ${path.relative(process.cwd(), constants.INPUT_FILE)}`);
    return tracks;
}

// Make YouTube API request
function youtubeRequest(params) {
    return new Promise((resolve, reject) => {
        const queryParams = new URLSearchParams(params).toString();
        const url = `https://www.googleapis.com/youtube/v3/videos?${queryParams}`;
        
        https.get(url, (res) => {
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => {
                try {
                    resolve(JSON.parse(data));
                } catch (e) {
                    reject(new Error(`Failed to parse response: ${e.message}`));
                }
            });
        }).on('error', reject);
    });
}

// Verify a batch of video IDs
async function verifyBatch(videoIds) {
    const params = {
        part: 'status',
        id: videoIds.join(','),
        key: constants.YOUTUBE_API_KEY
    };
    
    const response = await youtubeRequest(params);
    
    if (!response.items || response.items.length === 0) {
        return videoIds.map(id => ({ id, status: 'not_found', reasons: ['video not found or deleted'] }));
    }
    
    // Create a map of results
    const resultsMap = new Map();
    response.items.forEach(item => {
        const status = item.status;
        
        let videoStatus = 'ok';
        let reasons = [];
        
        // Check if video exists in response
        if (!status) {
            videoStatus = 'not_found';
            reasons.push('no status returned');
        } else {
            // Check embeddable
            if (status.embeddable !== constants.REQUIRED_STATUS.embeddable) {
                videoStatus = 'broken';
                reasons.push('not embeddable');
            }
            
            // Check privacy status
            if (status.privacyStatus !== constants.REQUIRED_STATUS.privacyStatus) {
                videoStatus = 'broken';
                reasons.push(`privacy: ${status.privacyStatus}`);
            }
            
            // Check upload status
            if (status.uploadStatus !== constants.REQUIRED_STATUS.uploadStatus) {
                videoStatus = 'broken';
                reasons.push(`upload: ${status.uploadStatus}`);
            }
        }
        
        resultsMap.set(item.id, {
            id: item.id,
            status: videoStatus,
            reasons: reasons,
            embeddable: status?.embeddable || false,
            privacyStatus: status?.privacyStatus || 'unknown'
        });
    });
    
    // Handle IDs that weren't returned (deleted/private)
    const missingIds = videoIds.filter(id => !resultsMap.has(id));
    missingIds.forEach(id => {
        resultsMap.set(id, {
            id,
            status: 'not_found',
            reasons: ['video not found or deleted'],
            embeddable: false
        });
    });
    
    return videoIds.map(id => resultsMap.get(id));
}

// Verify all tracks
async function verifyAllTracks(tracks) {
    const results = [];
    const totalBatches = Math.ceil(tracks.length / constants.BATCH_SIZE);
    
    console.log(`\n🔍 Verifying ${tracks.length} videos in ${totalBatches} batch(es)...\n`);
    
    for (let i = 0; i < tracks.length; i += constants.BATCH_SIZE) {
        const batch = tracks.slice(i, i + constants.BATCH_SIZE);
        const batchNum = Math.floor(i / constants.BATCH_SIZE) + 1;
        
        console.log(`  Batch ${batchNum}/${totalBatches}: Verifying ${batch.length} videos...`);
        
        const videoIds = batch.map(t => t.youtubeId);
        const batchResults = await verifyBatch(videoIds);
        
        // Merge results with track info
        batchResults.forEach((result, idx) => {
            results.push({
                ...result,
                trackId: batch[idx].id,
                trackTitle: batch[idx].title,
                trackArtist: batch[idx].artist,
                trackLanguage: batch[idx].language,
                trackEra: batch[idx].era
            });
        });
        
        // Delay between batches
        if (i + constants.BATCH_SIZE < tracks.length) {
            await new Promise(resolve => setTimeout(resolve, constants.REQUEST_DELAY));
        }
    }
    
    return results;
}

// Generate report
function generateReport(results) {
    const working = results.filter(r => r.status === 'ok');
    const broken = results.filter(r => r.status !== 'ok');
    
    const report = {
        generatedAt: new Date().toISOString(),
        summary: {
            total: results.length,
            working: working.length,
            broken: broken.length,
            notFound: results.filter(r => r.status === 'not_found').length,
            notEmbeddable: results.filter(r => r.reasons?.includes('not embeddable')).length
        },
        working: working.map(r => ({
            id: r.id,
            title: r.trackTitle,
            artist: r.trackArtist,
            language: r.trackLanguage,
            era: r.trackEra,
            embeddable: r.embeddable,
            privacyStatus: r.privacyStatus
        })),
        broken: broken.map(r => ({
            originalId: r.id,
            trackId: r.trackId,
            title: r.trackTitle,
            artist: r.trackArtist,
            language: r.trackLanguage,
            era: r.trackEra,
            status: r.status,
            reasons: r.reasons || [],
            embeddable: r.embeddable,
            privacyStatus: r.privacyStatus,
            searchQuery: `${r.trackTitle} ${r.trackArtist} lyrics`
        }))
    };
    
    return report;
}

// Save backup of original IDs
function saveBackup(tracks) {
    const backup = {
        backedUpAt: new Date().toISOString(),
        totalTracks: tracks.length,
        ids: tracks.map(t => ({
            trackId: t.id,
            title: t.title,
            originalYoutubeId: t.youtubeId
        }))
    };
    
    fs.writeFileSync(constants.BACKUP_FILE, JSON.stringify(backup, null, 2));
    console.log(`✓ Backup saved to ${path.relative(process.cwd(), constants.BACKUP_FILE)}`);
}

// Main execution
async function main() {
    console.log('🎵 SAVI Music - YouTube ID Verification Tool\n');
    console.log('=' .repeat(50));
    
    try {
        // Load tracks
        const tracks = loadTracks();
        
        // Save backup
        saveBackup(tracks);
        
        // Verify all tracks
        const results = await verifyAllTracks(tracks);
        
        // Generate report
        const report = generateReport(results);
        
        // Save report
        fs.writeFileSync(constants.REPORT_FILE, JSON.stringify(report, null, 2));
        console.log(`\n✓ Report saved to ${path.relative(process.cwd(), constants.REPORT_FILE)}`);
        
        // Print summary
        console.log('\n' + '='.repeat(50));
        console.log('📊 VERIFICATION SUMMARY');
        console.log('='.repeat(50));
        console.log(`Total tracks:     ${report.summary.total}`);
        console.log(`✅ Working:        ${report.summary.working} (${(report.summary.working/report.summary.total*100).toFixed(1)}%)`);
        console.log(`❌ Broken:         ${report.summary.broken}`);
        console.log(`   • Not found:   ${report.summary.notFound}`);
        console.log(`   • Not embeddable: ${report.summary.notEmbeddable}`);
        
        if (report.broken.length > 0) {
            console.log('\n' + '='.repeat(50));
            console.log('⚠️  BROKEN VIDEOS (Need Replacement)');
            console.log('='.repeat(50));
            
            report.broken.forEach((video, idx) => {
                console.log(`\n${idx + 1}. ${video.title} (${video.artist})`);
                console.log(`   ID: ${video.originalId}`);
                console.log(`   Issue: ${video.reasons.join(', ')}`);
                console.log(`   Search: "${video.searchQuery}"`);
            });
            
            console.log('\n' + '='.repeat(50));
            console.log('💡 NEXT STEPS:');
            console.log('='.repeat(50));
            console.log('1. Search YouTube for each broken video using the suggested query');
            console.log('2. Copy the 11-character video ID from the working URL');
            console.log('3. Run: node scripts/update-youtube-ids.js with your replacements');
            console.log('\nExample search URL format:');
            console.log('https://www.youtube.com/results?search_query=YOUR+SEARCH+QUERY\n');
        } else {
            console.log('\n🎉 All videos are working correctly! No action needed.\n');
        }
        
    } catch (error) {
        console.error('\n❌ Error:', error.message);
        process.exit(1);
    }
}

main();
