#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

mkdir -p out

# Compile all Java sources (including test mains) into out/
javac -d out $(find src -name "*.java")

echo "Compiled to: $ROOT_DIR/out"

