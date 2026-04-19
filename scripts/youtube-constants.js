require('dotenv').config({ path: __dirname + '/.env' });

module.exports = {
    // YouTube API Configuration
    YOUTUBE_API_KEY: process.env.YOUTUBE_API_KEY,
    
    // File Paths
    INPUT_FILE: __dirname + '/../src/app/music/page.tsx',
    REPORT_FILE: __dirname + '/youtube-verification-report.json',
    BACKUP_FILE: __dirname + '/youtube-ids-backup.json',
    
    // API Settings
    BATCH_SIZE: 100,  // YouTube allows up to 100 IDs per request
    REQUEST_DELAY: 100,  // ms between requests to avoid rate limiting
    
    // Search Configuration - Prioritize lyrics channels
    LYRICS_CHANNEL_KEYWORDS: [
        'lyrics',
        'lyrical',
        'lyric',
        'with lyrics',
        'full song lyrics',
        'best of lyrics'
    ],
    
    // Query templates for searching replacements
    SEARCH_TEMPLATES: [
        '{title} {artist} lyrics',
        '{title} {movie} lyrics',
        '{title} lyrics',
        '{title} {artist} full song',
        '{title} lyrical video'
    ],
    
    // Channels to prioritize (lyrics-focused)
    PRIORITY_CHANNELS: [
        'Best of Lyrics',
        'Lyrics Station',
        'Bollywood Lyrics',
        'Hindi Lyrics',
        'Kannada Lyrics',
        'T-Series Lyrics',
        'Zee Music Lyrics',
        'Sony Music Lyrics'
    ],
    
    // Video status requirements
    REQUIRED_STATUS: {
        embeddable: true,
        privacyStatus: 'public',
        uploadStatus: 'processed'
    }
};
