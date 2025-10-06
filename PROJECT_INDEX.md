# Karate Playground - Complete Project Index

## 🎯 Project Overview
**Karate Playground** is a browser-based testing environment for the Karate API testing framework. It allows users to write, edit, and execute Karate tests directly in the browser without any local installation.

### Key Features
- **Monaco Editor** with custom Karate/Gherkin syntax highlighting
- **Real-time streaming** of test execution output
- **Docker-based** Karate Framework 1.4.1 with Java 17
- **Zero installation** required for end users
- **Fast execution** (~3 seconds per test)

## 📁 Project Structure

```
karate-playground/
├── index.html          # Frontend UI with Monaco Editor
├── server.js           # Node.js backend server
├── Dockerfile          # Docker container for Karate runtime
├── run-test.sh         # Shell script to execute Karate tests
├── package.json        # Node.js dependencies
├── test.js            # Playwright E2E test
├── railway.json        # Railway deployment config
├── DEPLOYMENT.md       # Deployment documentation
└── README.md          # Project documentation
```

## 🏗️ Architecture

### Frontend ([index.html](index.html))
- **Monaco Editor Integration** (lines 79-176)
  - Custom Karate language definition
  - Syntax highlighting for Gherkin keywords
  - Dark theme optimized for Karate tests
- **Real-time Output Display** (lines 177-264)
  - Server-Sent Events (SSE) for streaming
  - Color-coded output (success, error, info, debug)
  - Auto-scrolling output window

### Backend ([server.js](server.js))

#### Static File Server (Port 3000)
- Serves frontend HTML/JS/CSS files
- CORS enabled for cross-origin requests
- MIME type handling

#### API Server (Port 3001)
- **Endpoint**: `POST /run-test-stream`
- **Function**: Executes Karate tests in Docker container
- **Response**: Server-Sent Events stream
- **Process**:
  1. Receives Karate feature content
  2. Spawns Docker container (`karate-java17:latest`)
  3. Pipes feature content to container stdin
  4. Streams stdout/stderr back to client
  5. Reports exit code on completion

### Docker Container ([Dockerfile](Dockerfile))
- **Base Image**: `openjdk:17-slim`
- **Karate Version**: 1.4.1 (standalone JAR)
- **Execution**: Via [run-test.sh](run-test.sh) entrypoint

## 🔌 API Documentation

### `/run-test-stream` Endpoint

**Request:**
```json
{
  "featureContent": "Feature: Test\n  Scenario: Example\n    Given url 'https://api.example.com'\n    When method get\n    Then status 200"
}
```

**Response:** Server-Sent Events stream
```
data: {"type": "stdout", "line": "Running test..."}
data: {"type": "stdout", "line": "1 > POST https://jsonplaceholder.typicode.com/posts"}
data: {"type": "stdout", "line": "1 < 201"}
data: {"type": "exit", "code": 0}
```

## 📦 Dependencies

### Production
- `@bjorn3/browser_wasi_shim` (v0.3.0) - WebAssembly system interface
- `xterm-pty` (v0.9.4) - Terminal emulation

### Development
- `playwright` (v1.50.2) - E2E testing framework

### External CDN
- **Monaco Editor** (v0.45.0) - Code editor
- **RequireJS** (v2.3.6) - Module loader

## 🚀 Deployment Options

### Primary: Railway.app (Recommended)
- **Config**: [railway.json](railway.json)
- **Features**:
  - Auto-builds from Dockerfile
  - 500 hours/month free tier
  - Auto-deploy on git push
  - ~3 second test execution

### Alternative: Render.com
- Docker environment support
- Similar deployment process
- Free tier available

### Local Development
```bash
# Build Docker image
docker build -t karate-java17:latest .

# Install dependencies
npm install

# Start servers
npm start
# Frontend: http://localhost:3000
# API: http://localhost:3001
```

## 🧪 Testing

### E2E Test ([test.js](test.js))
- Uses Playwright for browser automation
- Tests editor loading
- Verifies test execution
- Validates output parsing

Run with:
```bash
npx playwright install
node test.js
```

## 🎨 UI Components

### Monaco Editor Configuration
- **Language ID**: `karate`
- **Theme**: `karate-dark` (custom)
- **Keywords**: Feature, Scenario, Given, When, Then, url, path, request, method, status, match
- **Syntax Groups**:
  - Control keywords (Feature, Scenario)
  - Step keywords (Given, When, Then)
  - Karate commands (url, path, request)
  - HTTP methods (GET, POST, PUT, DELETE)

### Output Styling Classes
- `.success` - Green (#4ec9b0) for passed tests
- `.error` - Red (#f48771) for failures
- `.info` - Blue (#569cd6) for feature info
- `.debug` - Gray (#858585) for debug logs
- `.request` - Yellow (#dcdcaa) for HTTP requests
- `.response` - Cyan (#4fc1ff) for HTTP responses

## 🔧 Configuration Files

### package.json
- Entry point: `server.js`
- Start script: `node server.js`

### railway.json
- Builder: NIXPACKS
- Health check: Root path `/`
- Timeout: 100ms

### Dockerfile
- Java 17 runtime
- Karate 1.4.1 standalone JAR
- Custom test runner script

## 📊 Performance Characteristics
- **Test Execution**: ~3 seconds average
- **Docker Startup**: ~1 second
- **Frontend Load**: < 500ms
- **Memory Usage**: ~200MB (Docker container)
- **Network**: Streaming response (no buffering)

## 🛠️ Development Notes
- Frontend and API servers run separately for flexibility
- Docker container is ephemeral (created per test run)
- Output streaming prevents timeout issues
- Monaco Editor provides professional IDE experience
- No build step required (vanilla JS)

## 📝 Future Enhancements Potential
- Multiple test file support
- Test history/persistence
- Collaborative editing
- Custom assertions library
- Performance metrics dashboard
- Export test results (JSON/XML)