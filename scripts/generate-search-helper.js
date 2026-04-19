const fs = require('fs');
const path = require('path');
const constants = require('./youtube-constants');
const { exec } = require('child_process');

// Load the verification report
function loadReport() {
    if (!fs.existsSync(constants.REPORT_FILE)) {
        throw new Error('Report file not found. Run verify-youtube-ids.js first.');
    }
    return JSON.parse(fs.readFileSync(constants.REPORT_FILE, 'utf8'));
}

// Generate HTML file with search links
function generateSearchHelper(report) {
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SAVI Music - YouTube ID Replacement Helper</title>
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: #0a0a0a;
            color: #f5f5f5;
            padding: 40px 20px;
            line-height: 1.6;
        }
        .container { max-width: 1200px; margin: 0 auto; }
        h1 {
            font-size: 2.5rem;
            margin-bottom: 10px;
            background: linear-gradient(135deg, #00C853, #69f0ae);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .subtitle { color: #999; margin-bottom: 30px; }
        .stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin-bottom: 40px;
        }
        .stat-card {
            background: rgba(255,255,255,0.05);
            border: 1px solid rgba(255,255,255,0.1);
            border-radius: 12px;
            padding: 20px;
            text-align: center;
        }
        .stat-number { font-size: 2.5rem; font-weight: bold; }
        .stat-label { color: #999; font-size: 0.9rem; text-transform: uppercase; letter-spacing: 1px; }
        .stat-number.success { color: #00C853; }
        .stat-number.danger { color: #ff5252; }
        .track-list { display: grid; gap: 15px; }
        .track-card {
            background: rgba(255,255,255,0.05);
            border: 1px solid rgba(255,255,255,0.1);
            border-radius: 12px;
            padding: 20px;
            display: grid;
            grid-template-columns: 1fr auto;
            align-items: center;
            gap: 20px;
            transition: all 0.3s;
        }
        .track-card:hover {
            background: rgba(255,255,255,0.08);
            border-color: #00C853;
        }
        .track-info h3 { font-size: 1.2rem; margin-bottom: 5px; }
        .track-meta { color: #999; font-size: 0.9rem; }
        .track-meta span {
            display: inline-block;
            background: rgba(255,255,255,0.1);
            padding: 2px 8px;
            border-radius: 4px;
            margin-right: 8px;
            font-size: 0.8rem;
        }
        .actions { display: flex; gap: 10px; }
        .btn {
            display: inline-block;
            padding: 10px 20px;
            border-radius: 8px;
            text-decoration: none;
            font-weight: 600;
            font-size: 0.9rem;
            transition: all 0.3s;
            border: none;
            cursor: pointer;
        }
        .btn-primary {
            background: #00C853;
            color: #000;
        }
        .btn-primary:hover {
            background: #69f0ae;
            transform: translateY(-2px);
            box-shadow: 0 4px 15px rgba(0,200,83,0.4);
        }
        .btn-secondary {
            background: rgba(255,255,255,0.1);
            color: #f5f5f5;
        }
        .btn-secondary:hover {
            background: rgba(255,255,255,0.2);
        }
        .old-id {
            font-family: monospace;
            background: rgba(255,82,82,0.1);
            color: #ff5252;
            padding: 2px 6px;
            border-radius: 4px;
            font-size: 0.85rem;
        }
        .instructions {
            background: rgba(0,200,83,0.1);
            border: 1px solid rgba(0,200,83,0.3);
            border-radius: 12px;
            padding: 25px;
            margin-bottom: 30px;
        }
        .instructions h2 {
            color: #00C853;
            margin-bottom: 15px;
        }
        .instructions ol {
            margin-left: 20px;
            color: #ccc;
        }
        .instructions li { margin-bottom: 10px; }
        .instructions code {
            background: rgba(0,0,0,0.3);
            padding: 2px 6px;
            border-radius: 4px;
            font-family: 'Monaco', 'Consolas', monospace;
            color: #69f0ae;
        }
        .filter-bar {
            margin-bottom: 20px;
            display: flex;
            gap: 10px;
            flex-wrap: wrap;
        }
        .filter-btn {
            padding: 8px 16px;
            border-radius: 20px;
            border: 1px solid rgba(255,255,255,0.2);
            background: transparent;
            color: #f5f5f5;
            cursor: pointer;
            transition: all 0.3s;
        }
        .filter-btn.active, .filter-btn:hover {
            background: #00C853;
            border-color: #00C853;
            color: #000;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🎵 SAVI Music - YouTube ID Replacement</h1>
        <p class="subtitle">Find and replace broken YouTube video IDs</p>
        
        <div class="stats">
            <div class="stat-card">
                <div class="stat-number success">${report.summary.working}</div>
                <div class="stat-label">Working Videos</div>
            </div>
            <div class="stat-card">
                <div class="stat-number danger">${report.summary.broken}</div>
                <div class="stat-label">Need Replacement</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">${report.summary.total}</div>
                <div class="stat-label">Total Tracks</div>
            </div>
        </div>
        
        <div class="instructions">
            <h2>📋 How to Use This Page</h2>
            <ol>
                <li>Click <strong>"Search YouTube"</strong> for each song that needs a replacement</li>
                <li>Find a working video (preferably with lyrics)</li>
                <li>Copy the <strong>11-character video ID</strong> from the URL:
                    <ul>
                        <li>From <code>youtube.com/watch?v=<strong>ABCDEFGHIJK</strong></code></li>
                        <li>Or <code>youtu.be/<strong>ABCDEFGHIJK</strong></code></li>
                    </ul>
                </li>
                <li>Run the update script: <code>node scripts/update-youtube-ids.js</code></li>
                <li>Enter the new ID when prompted</li>
            </ol>
        </div>
        
        <div class="filter-bar">
            <button class="filter-btn active" data-filter="all">All (${report.broken.length})</button>
            <button class="filter-btn" data-filter="Hindi">Hindi</button>
            <button class="filter-btn" data-filter="Kannada">Kannada</button>
            <button class="filter-btn" data-filter="1980s">1980s</button>
            <button class="filter-btn" data-filter="1990s">1990s</button>
            <button class="filter-btn" data-filter="2000s">2000s</button>
            <button class="filter-btn" data-filter="2010s">2010s</button>
            <button class="filter-btn" data-filter="Latest">Latest</button>
        </div>
        
        <div class="track-list">
            ${report.broken.map(video => `
                <div class="track-card" data-language="${video.language}" data-era="${video.era}">
                    <div class="track-info">
                        <h3>${video.title}</h3>
                        <div class="track-meta">
                            <span>${video.artist}</span>
                            <span>${video.language}</span>
                            <span>${video.era}</span>
                        </div>
                        <div style="margin-top: 10px;">
                            <span class="old-id">Old ID: ${video.originalId}</span>
                        </div>
                    </div>
                    <div class="actions">
                        <a href="https://www.youtube.com/results?search_query=${encodeURIComponent(video.searchQuery)}" 
                           target="_blank" 
                           class="btn btn-primary">
                            🔍 Search YouTube
                        </a>
                        <a href="https://www.youtube.com/results?search_query=${encodeURIComponent(video.title + ' ' + video.artist + ' lyrics official video')}" 
                           target="_blank" 
                           class="btn btn-secondary">
                            🎯 Search Official
                        </a>
                    </div>
                </div>
            `).join('')}
        </div>
    </div>
    
    <script>
        // Filter functionality
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                const filter = this.dataset.filter;
                document.querySelectorAll('.track-card').forEach(card => {
                    if (filter === 'all') {
                        card.style.display = '';
                    } else if (card.dataset.language === filter || card.dataset.era === filter) {
                        card.style.display = '';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    </script>
</body>
</html>`;

    const outputPath = path.join(__dirname, 'youtube-replacement-helper.html');
    fs.writeFileSync(outputPath, html);
    console.log(`✓ Generated helper page: ${path.relative(process.cwd(), outputPath)}`);
    return outputPath;
}

// Open in browser
function openInBrowser(filePath) {
    const platform = process.platform;
    let command;
    
    if (platform === 'darwin') {
        command = `open "${filePath}"`;
    } else if (platform === 'win32') {
        command = `start "${filePath}"`;
    } else {
        command = `xdg-open "${filePath}"`;
    }
    
    exec(command, (err) => {
        if (err) {
            console.log(`ℹ️  Open this file in your browser: ${filePath}`);
        } else {
            console.log('✓ Opened in browser');
        }
    });
}

// Main
try {
    console.log('🎵 SAVI Music - YouTube Replacement Helper\n');
    const report = loadReport();
    const htmlPath = generateSearchHelper(report);
    openInBrowser(htmlPath);
    
    console.log('\n💡 Next Steps:');
    console.log('1. Use the opened page to search for replacement videos');
    console.log('2. Collect the new 11-character YouTube IDs');
    console.log('3. Run: node scripts/update-youtube-ids.js');
    console.log('4. Enter your new IDs when prompted\n');
} catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
}
