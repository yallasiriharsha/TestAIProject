@echo off
REM ============================================
REM Start Both Backend and Frontend
REM ============================================

cls
echo.
echo ========================================
echo  🚀 Starting Full Application
echo ========================================
echo.
echo This will open both backend and frontend
echo Make sure MongoDB is running first!
echo.
echo.
echo MONGODB SETUP:
echo If you haven't set up MongoDB yet, do this first:
echo.
echo Option A: MongoDB Atlas (Cloud)
echo   1. Go to: https://www.mongodb.com/cloud/atlas
echo   2. Create free account ^& cluster
echo   3. Get connection string
echo   4. Update: server\.env
echo.
echo Option B: Local MongoDB
echo   1. Download: https://www.mongodb.com/try/download/community
echo   2. Run installer (check "Install as Service")
echo   3. Use default: mongodb://localhost:27017
echo.
echo After setup, come back here and run again.
echo.
pause

REM Check if .env is configured
if not exist "server\.env" (
    echo ERROR: server\.env file not found!
    pause
    exit /b 1
)

REM Check if MONGODB_URI is set
findstr /M "MONGODB_URI=mongodb" server\.env >nul
if errorlevel 1 (
    echo.
    echo ERROR: MONGODB_URI not configured in server\.env!
    echo.
    echo Please:
    echo 1. Edit: server\.env
    echo 2. Set MONGODB_URI to your connection string
    echo 3. Run this script again
    echo.
    pause
    exit /b 1
)

echo ✅ Configuration looks good!
echo.
echo Starting backend in separate window...
echo.
pause

REM Open backend terminal
start "Backend Server - Press Ctrl+C to stop" cmd /k "cd /d "%~dp0server" && npm start"

echo Waiting for backend to start...
timeout /t 3 /nobreak

echo.
echo Starting frontend in separate window...
echo.
pause

REM Open frontend terminal
start "Frontend Server - Press q to stop" cmd /k "cd /d "%~dp0" && npm run dev"

echo.
echo ========================================
echo ✅ Both servers started!
echo ========================================
echo.
echo Backend:  http://localhost:5000
echo Frontend: http://localhost:5174
echo.
echo Opening browser...
timeout /t 2 /nobreak

REM Open browser
start http://localhost:5174

echo.
echo ========================================
echo Application is running!
echo ========================================
echo.
pause
