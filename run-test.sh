#!/bin/bash

# Default test file location
TEST_FILE="${1:-/app/test.feature}"

# If test content is provided via stdin, write it to test.feature
if [ ! -t 0 ]; then
    cat > /app/test.feature
    TEST_FILE="/app/test.feature"
fi

# Run Karate test
java -jar /app/karate.jar "$TEST_FILE"
