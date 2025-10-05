# Karate Playground

Browser-based Karate API testing playground with Monaco Editor and real-time streaming output.

## Prerequisites

- **Node.js** 16+
- **Docker** (must be running)

## Setup

```bash
# 1. Build the Karate Docker image (one-time)
docker build -t karate-java17:latest .

# 2. Install dependencies
npm install

# 3. Start the playground
npm start
```

Open **http://localhost:3000**

## Features

- ✅ Monaco Editor with Karate/Gherkin syntax highlighting
- ✅ Real-time streaming output as tests execute
- ✅ Real Karate Framework 1.4.1 with Java 17
- ✅ Edit and run any Karate test instantly
- ✅ Fast execution (~3 seconds per test)