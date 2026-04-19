const https = require('https');
const fs = require('fs');
const constants = require('./youtube-constants');

// Make YouTube API request
function youtubeRequest(path, params) {
    return new Promise((resolve, reject) => {
        const queryParams = new URLSearchParams(params).toString();
        const url = `https://www.googleapis.com/youtube/v3/${path}?${queryParams}`;
        
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

// Search for a video
async function searchVideo(query, maxResults = 5) {
    const params = {
        part: 'snippet,id',
        q: query,
        type: 'video',
        maxResults: maxResults,
        key: constants.YOUTUBE_API_KEY
    };
    
    const response = await youtubeRequest('search', params);
    
    if (!response.items || response.items.length === 0) {
        return [];
    }
    
    // Get video IDs from search results
    const videoIds = response.items.map(item => item.id.videoId).filter(id => id);
    
    if (videoIds.length === 0) {
        return [];
    }
    
    // Check if these videos are embeddable
    const statusParams = {
        part: 'status',
        id: videoIds.join(','),
        key: constants.YOUTUBE_API_KEY
    };
    
    const statusResponse = await youtubeRequest('videos', statusParams);
    
    if (!statusResponse.items || statusResponse.items.length === 0) {
        return [];
    }
    
    // Filter for embeddable videos
    const embeddable = statusResponse.items.filter(
        item => item.status?.embeddable === true && item.status?.privacyStatus === 'public'
    );
    
    return embeddable.map(item => ({
        id: item.id,
        title: response.items.find(r => r.id.videoId === item.id)?.snippet?.title || 'Unknown',
        channel: response.items.find(r => r.id.videoId === item.id)?.snippet?.channelTitle || 'Unknown'
    }));
}

// Find best replacement for a track
async function findReplacement(track) {
    const searchQueries = constants.SEARCH_TEMPLATES.map(
        template => template.replace('{title}', track.title).replace('{artist}', track.artist).replace('{movie}', track.artist)
    );
    
    for (const query of searchQueries) {
        console.log(`  Searching: "${query}"`);
        
        try {
            const results = await searchVideo(query, 5);
            
            if (results.length > 0) {
                // Prioritize lyrics channels
                const lyricsResult = results.find(r => 
                    constants.LYRICS_CHANNEL_KEYWORDS.some(keyword => 
                        r.title.toLowerCase().includes(keyword) || r.channel.toLowerCase().includes(keyword)
                    )
                );
                
                if (lyricsResult) {
                    return {
                        query: query,
                        ...lyricsResult,
                        priority: 'lyrics_channel'
                    };
                }
                
                // Otherwise return first result
                return {
                    query: query,
                    ...results[0],
                    priority: 'first_result'
                };
            }
        } catch (error) {
            console.log(`  Error: ${error.message}`);
        }
        
        // Delay between searches
        await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    return null;
}

// Load broken tracks from report
function loadBrokenTracks() {
    const report = JSON.parse(fs.readFileSync(constants.REPORT_FILE, 'utf8'));
    return report.broken;
}

// Main execution
async function main() {
    console.log('🎵 SAVI Music - Finding Replacement YouTube IDs\n');
    console.log('='.repeat(60));
    
    const brokenTracks = loadBrokenTracks();
    console.log(`Found ${brokenTracks.length} tracks needing replacement\n`);
    
    const replacements = [];
    const notFound = [];
    
    for (let i = 0; i < brokenTracks.length; i++) {
        const track = brokenTracks[i];
        console.log(`\n[${i + 1}/${brokenTracks.length}] ${track.title} - ${track.artist} (${track.era}, ${track.language})`);
        
        const replacement = await findReplacement(track);
        
        if (replacement) {
            console.log(`  ✓ Found: ${replacement.id} (${replacement.title.slice(0, 60)}...)`);
            console.log(`  Channel: ${replacement.channel}`);
            replacements.push({
                trackId: track.trackId,
                title: track.title,
                artist: track.artist,
                oldId: track.originalId,
                newId: replacement.id,
                newTitle: replacement.title,
                channel: replacement.channel,
                searchQuery: replacement.query
            });
        } else {
            console.log(`  ✗ No replacement found`);
            notFound.push(track);
        }
        
        // Delay between searches to avoid rate limiting
        if (i < brokenTracks.length - 1) {
            await new Promise(resolve => setTimeout(resolve, 150));
        }
    }
    
    // Save results
    const results = {
        generatedAt: new Date().toISOString(),
        summary: {
            total: brokenTracks.length,
            found: replacements.length,
            notFound: notFound.length
        },
        replacements: replacements,
        notFound: notFound.map(t => ({
            trackId: t.trackId,
            title: t.title,
            artist: t.artist,
            searchQuery: t.searchQuery
        }))
    };
    
    const outputPath = __dirname + '/youtube-replacements-found.json';
    fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
    
    console.log('\n' + '='.repeat(60));
    console.log('📊 RESULTS SUMMARY');
    console.log('='.repeat(60));
    console.log(`Total tracks: ${results.summary.total}`);
    console.log(`✅ Found replacements: ${results.summary.found} (${(results.summary.found/results.summary.total*100).toFixed(1)}%)`);
    console.log(`❌ Not found: ${results.summary.notFound}`);
    console.log(`\n💾 Results saved to: ${outputPath}`);
    
    if (replacements.length > 0) {
        console.log('\n💡 NEXT STEP:');
        console.log('Run the update script with the found replacements:');
        console.log(`node scripts/apply-replacements.js`);
    }
}

main().catch(error => {
    console.error('❌ Error:', error.message);
    process.exit(1);
});
