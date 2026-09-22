@echo off
title Quality Ironworks - Unified Field Operations Portal
cd /d "%~dp0"

echo Starting QIW Unified Field Operations Portal...
powershell -NoProfile -ExecutionPolicy Bypass -File "serve.ps1"
if %errorlevel% neq 0 (
    echo.
    echo Opening directly in default browser...
    start "" "index.html"
)
pause
