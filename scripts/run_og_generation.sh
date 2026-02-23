#!/usr/bin/env bash
set -euo pipefail

PYTHON_BIN="python3"
if [[ -x ".venv/bin/python" ]]; then
  PYTHON_BIN=".venv/bin/python"
fi

if ! command -v "$PYTHON_BIN" >/dev/null 2>&1; then
  echo "[og] python runtime not found; skipping OG generation."
  exit 0
fi

if ! "$PYTHON_BIN" -c "import PIL" >/dev/null 2>&1; then
  echo "[og] Pillow not installed for $PYTHON_BIN; skipping OG generation. Install with: python3 -m venv .venv && .venv/bin/pip install -r requirements-editorial.txt"
  exit 0
fi

"$PYTHON_BIN" scripts/generate_og_images.py
