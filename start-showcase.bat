@echo off
title img2threejs Showcase Server
echo ========================================================
echo   img2threejs - Image to Procedural Three.js 3D Models
echo ========================================================
echo.
echo Dang khoi dong Web Viewer tai: http://127.0.0.1:5173/
echo.
cd /d "%~dp0showcase"
start http://127.0.0.1:5173/
call npx.cmd vite --host 127.0.0.1 --port 5173
pause
