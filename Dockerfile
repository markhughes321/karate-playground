FROM openjdk:17-slim

# Install necessary packages
RUN apt-get update && apt-get install -y \
    curl \
    maven \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Download Karate standalone JAR
RUN curl -L -o karate.jar \
    https://github.com/karatelabs/karate/releases/download/v1.4.1/karate-1.4.1.jar

# Add test runner script
COPY run-test.sh /app/
RUN chmod +x /app/run-test.sh

ENTRYPOINT ["/app/run-test.sh"]
