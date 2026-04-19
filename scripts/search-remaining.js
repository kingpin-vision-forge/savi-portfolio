const https = require('https');
const fs = require('fs');

const YOUTUBE_API_KEY = 'AIzaSyBbjRkXWJcbvLFJDMb9ciD44c6R7l1u3qI';

// Remaining tracks that need IDs
const remainingTracks = [
    { trackId: 93, title: 'Raabta', artist: 'Agent Vinod', language: 'Hindi', era: '2010s' },
    { trackId: 51, title: 'Belageddu', artist: 'Kirik Party', language: 'Kannada', era: '2010s' },
    { trackId: 52, title: 'Chuttu Chuttu', artist: 'Raambo 2', language: 'Kannada', era: '2010s' },
    { trackId: 53, title: 'Bombe Helutaithe', artist: 'Raajakumara', language: 'Kannada', era: '2010s' },
    { trackId: 55, title: 'Geleya Ennale', artist: 'Mass Leader', language: 'Kannada', era: '2010s' },
    { trackId: 56, title: 'Sanju Mathu Geetha', artist: 'Sanju Weds Geetha', language: 'Kannada', era: '2010s' },
    { trackId: 57, title: 'Naane Neenanthe', artist: 'BRAT', language: 'Kannada', era: '2010s' },
    { trackId: 58, title: 'Salaam Rocky Bhai', artist: 'KGF Chapter 1', language: 'Kannada', era: '2010s' },
    { trackId: 59, title: 'Dheera Dheera', artist: 'KGF', language: 'Kannada', era: '2010s' },
    { trackId: 108, title: 'Karagida Baaninalli', artist: 'Simple Agi Ondh Love Story', language: 'Kannada', era: '2010s' },
    { trackId: 109, title: 'Ninna Snehadinda', artist: 'Mugulu Nage', language: 'Kannada', era: '2010s' },
    { trackId: 110, title: 'Annthamma', artist: 'Mr & Mrs Ramachari', language: 'Kannada', era: '2010s' },
    { trackId: 111, title: 'Usire Usire', artist: 'Hebbuli', language: 'Kannada', era: '2010s' },
    { trackId: 60, title: 'Akhiyaan Gulaab', artist: 'Teri Baaton Mein Aisa Uljha Jiya', language: 'Hindi', era: 'Latest' },
    { trackId: 61, title: 'Satyanaas', artist: 'Chandu Champion', language: 'Hindi', era: 'Latest' },
    { trackId: 62, title: 'Tauba Tauba', artist: 'Bad Newz', language: 'Hindi', era: 'Latest' },
    { trackId: 64, title: 'Zinda Banda', artist: 'Jawan', language: 'Hindi', era: 'Latest' },
    { trackId: 65, title: 'Main Hoon', artist: 'Battle Of Galwan', language: 'Hindi', era: 'Latest' },
    { trackId: 93, title: 'Chaleya', artist: 'Jawan', language: 'Hindi', era: 'Latest' },
    { trackId: 94, title: 'Gehra Hua', artist: 'Dhurandhar', language: 'Hindi', era: 'Latest' },
    { trackId: 95, title: 'Heeriye', artist: 'Jasleen Royal ft. Arijit Singh', language: 'Hindi', era: 'Latest' },
    { trackId: 97, title: 'Lutt Le Gaya', artist: 'Dhurandhar', language: 'Hindi', era: 'Latest' },
    { trackId: 98, title: 'Param Sundari', artist: 'Mimi', language: 'Hindi', era: 'Latest' },
    { trackId: 99, title: 'Tere Pyaar Mein', artist: 'Tu Jhoothi Main Makkaar', language: 'Hindi', era: 'Latest' },
    { trackId: 66, title: 'Idre Nemdiyaag Irbek', artist: 'The Devil', language: 'Kannada', era: 'Latest' },
    { trackId: 67, title: 'Bangle Bangari', artist: 'EKKA', language: 'Kannada', era: 'Latest' },
    { trackId: 68, title: 'Ayyo Sivane', artist: 'Cult', language: 'Kannada', era: 'Latest' },
    { trackId: 69, title: 'Shiva Shiva', artist: 'KD', language: 'Kannada', era: 'Latest' },
    { trackId: 129, title: 'Nee Sigoovaregu', artist: 'Bhajarangi 2', language: 'Kannada', era: 'Latest' },
    { trackId: 131, title: 'Dhamaka', artist: 'Siddu Moolimani', language: 'Kannada', era: 'Latest' },
    { trackId: 132, title: 'Naavaduva Nudiye', artist: 'Gandhada Gudi 2', language: 'Kannada', era: 'Latest' },
    { trackId: 133, title: 'Sapta Sagaradaache Ello', artist: 'Sapta Sagaradaache Ello', language: 'Kannada', era: 'Latest' },
    { trackId: 134, title: 'Singara Siriye', artist: 'Kantara', language: 'Kannada', era: 'Latest' },
    { trackId: 135, title: 'Sojugada Soojumallige', artist: 'GGVV', language: 'Kannada', era: 'Latest' },
    { trackId: 136, title: 'Sulthana', artist: 'KGF Chapter 2', language: 'Kannada', era: 'Latest' },
    { trackId: 137, title: 'Thoogire Rangana', artist: 'Dr. Vidyabhushana', language: 'Kannada', era: 'Latest' },
    { trackId: 138, title: 'Toofan', artist: 'KGF Chapter 2', language: 'Kannada', era: 'Latest' },
    { trackId: 139, title: 'Varaha Roopam', artist: 'Kantara', language: 'Kannada', era: 'Latest' }
];

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
                    reject(new Error(`Failed to parse: ${e.message}`));
                }
            });
        }).on('error', reject);
    });
}

async function searchVideo(query, maxResults = 10) {
    const searchResponse = await youtubeRequest('search', {
        part: 'snippet,id',
        q: query,
        type: 'video',
        maxResults: maxResults,
        key: YOUTUBE_API_KEY
    });
    
    if (!searchResponse.items || searchResponse.items.length === 0) {
        return [];
    }
    
    const videoIds = searchResponse.items.map(item => item.id.videoId).filter(id => id);
    
    if (videoIds.length === 0) return [];
    
    const statusResponse = await youtubeRequest('videos', {
        part: 'status',
        id: videoIds.join(','),
        key: YOUTUBE_API_KEY
    });
    
    if (!statusResponse.items || statusResponse.items.length === 0) {
        return [];
    }
    
    const embeddable = statusResponse.items.filter(
        item => item.status?.embeddable === true && item.status?.privacyStatus === 'public'
    );
    
    return embeddable.map(item => ({
        id: item.id,
        title: searchResponse.items.find(r => r.id.videoId === item.id)?.snippet?.title || 'Unknown',
        channel: searchResponse.items.find(r => r.id.videoId === item.id)?.snippet?.channelTitle || 'Unknown'
    }));
}

async function findReplacement(track) {
    const queries = [
        `${track.title} ${track.artist} lyrics`,
        `${track.title} ${track.artist} official video`,
        `${track.title} ${track.artist} full song`,
        `${track.title} lyrics`,
        `${track.title} ${track.artist}`
    ];
    
    for (const query of queries) {
        console.log(`  Searching: "${query}"`);
        
        try {
            const results = await searchVideo(query, 10);
            
            if (results.length > 0) {
                // Prioritize official/lyrics channels
                const officialResult = results.find(r => 
                    r.channel.toLowerCase().includes('t-series') ||
                    r.channel.toLowerCase().includes('sony') ||
                    r.channel.toLowerCase().includes('zee') ||
                    r.channel.toLowerCase().includes('lyrics') ||
                    r.channel.toLowerCase().includes('official') ||
                    r.title.toLowerCase().includes('lyrical') ||
                    r.title.toLowerCase().includes('lyrics')
                );
                
                if (officialResult) {
                    return { query, ...officialResult };
                }
                
                return { query, ...results[0] };
            }
        } catch (error) {
            console.log(`  Error: ${error.message}`);
        }
        
        await new Promise(resolve => setTimeout(resolve, 150));
    }
    
    return null;
}

async function main() {
    console.log('🔍 Searching for remaining 38 tracks\n');
    console.log('='.repeat(60));
    
    const found = [];
    const notFound = [];
    
    for (let i = 0; i < remainingTracks.length; i++) {
        const track = remainingTracks[i];
        console.log(`\n[${i + 1}/${remainingTracks.length}] ${track.title} - ${track.artist}`);
        
        const replacement = await findReplacement(track);
        
        if (replacement) {
            console.log(`  ✓ Found: ${replacement.id}`);
            console.log(`  Channel: ${replacement.channel}`);
            found.push({
                trackId: track.trackId,
                title: track.title,
                artist: track.artist,
                newId: replacement.id,
                newTitle: replacement.title,
                channel: replacement.channel,
                searchQuery: replacement.query
            });
        } else {
            console.log(`  ✗ No replacement found`);
            notFound.push(track);
        }
        
        if (i < remainingTracks.length - 1) {
            await new Promise(resolve => setTimeout(resolve, 200));
        }
    }
    
    console.log('\n' + '='.repeat(60));
    console.log('📊 RESULTS');
    console.log('='.repeat(60));
    console.log(`Found: ${found.length}/${remainingTracks.length}`);
    
    if (found.length > 0) {
        const outputPath = 'scripts/remaining-found.json';
        fs.writeFileSync(outputPath, JSON.stringify({ found, notFound }, null, 2));
        console.log(`\n💾 Saved to: ${outputPath}`);
        console.log('\n💡 Run this command to apply these replacements:');
        console.log('node scripts/apply-remaining.js\n');
    }
}

main().catch(console.error);
