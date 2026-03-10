#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

"$ROOT_DIR/scripts/compile.sh"

java -cp out test.StandardRulesTest
java -cp out test.GameTest
java -cp out test.RandomStrategyTest

echo "All tests: PASS"

