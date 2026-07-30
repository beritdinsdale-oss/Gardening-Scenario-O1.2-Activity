@echo off
cd /d "%~dp0"
echo Starting local preview at http://localhost:8000
echo Press Ctrl+C in this window to stop the preview.
start "" http://localhost:8000
py -m http.server 8000 2>nul || python -m http.server 8000
