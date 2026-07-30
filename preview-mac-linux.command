#!/bin/bash
cd "$(dirname "$0")"
echo "Starting local preview at http://localhost:8000"
echo "Press Control+C to stop the preview."
(sleep 1; open http://localhost:8000 2>/dev/null || xdg-open http://localhost:8000 2>/dev/null) &
python3 -m http.server 8000
