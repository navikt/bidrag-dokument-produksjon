#!/bin/bash

# Start script for bidrag-dokumentmal application and Spring Boot app
# This script runs the Spring Boot app and the Remix app (npm run dev and npm run tailwind_dev)

# Compile test classes
mvn test-compile

# Get classpath
CLASSPATH=$(mvn dependency:build-classpath -Dmdep.outputFile=/dev/stdout -q)

# Start AppLocal Spring Boot application in background with debugger
mvn exec:java -Dexec.mainClass="no.nav.bidrag.dokument.produksjon.AppLocalKt" -Dexec.classpathScope=test -Dexec.args="-Xdebug -Xrunjdwp:transport=dt_socket,server=y,suspend=n,address=5005" &

# Start Remix app
cd bidrag-dokumentmal

# Start tailwind_dev in background
npm run tailwind_dev &

# Start dev in foreground
npm run dev
