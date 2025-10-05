const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const API_PORT = 3001;

// Static file server
const staticServer = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');

    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    let filePath = req.url === '/' ? '/index.html' : req.url;
    filePath = path.join(__dirname, filePath);

    const ext = path.extname(filePath);
    const mimeTypes = {
        '.html': 'text/html',
        '.js': 'application/javascript',
        '.css': 'text/css',
        '.json': 'application/json'
    };

    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404);
            res.end('Not Found');
            return;
        }
        res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'text/plain' });
        res.end(data);
    });
});

// API server for running tests
const apiServer = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    if (req.method === 'POST' && req.url === '/run-test-stream') {
        let body = '';
        req.on('data', chunk => { body += chunk; });
        req.on('end', () => {
            const { featureContent } = JSON.parse(body);

            res.writeHead(200, {
                'Content-Type': 'text/event-stream',
                'Cache-Control': 'no-cache',
                'Connection': 'keep-alive',
                'Access-Control-Allow-Origin': '*'
            });

            const docker = spawn('docker', [
                'run', '--rm', '--platform', 'linux/amd64', '-i', 'karate-java17:latest'
            ]);

            docker.stdin.write(featureContent);
            docker.stdin.end();

            docker.stdout.on('data', (data) => {
                data.toString().split('\n').forEach(line => {
                    if (line.trim()) {
                        res.write(`data: ${JSON.stringify({type: 'stdout', line})}\n\n`);
                    }
                });
            });

            docker.stderr.on('data', (data) => {
                data.toString().split('\n').forEach(line => {
                    if (line.trim()) {
                        res.write(`data: ${JSON.stringify({type: 'stderr', line})}\n\n`);
                    }
                });
            });

            docker.on('close', (code) => {
                res.write(`data: ${JSON.stringify({type: 'exit', code})}\n\n`);
                res.end();
            });
        });
    } else {
        res.writeHead(404);
        res.end();
    }
});

staticServer.listen(PORT, () => {
    console.log(`\n🥋 Karate Playground`);
    console.log(`   Frontend: http://localhost:${PORT}`);
});

apiServer.listen(API_PORT, () => {
    console.log(`   API:      http://localhost:${API_PORT}`);
    console.log(`\n✅ Ready!\n`);
});
