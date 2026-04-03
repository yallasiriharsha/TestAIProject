@echo off
REM Start Backend API
echo Starting Student Management Portal...
echo.
echo [1/2] Starting Backend API on port 5000...
start cmd /k "cd /d D:\Work\TestAIProject\backend && node src/server.js"

REM Wait a moment for backend to start
timeout /t 2 /nobreak

REM Start Frontend
echo [2/2] Starting Frontend on port 5173...
start cmd /k "cd /d D:\Work\TestAIProject\TestProject && npm run dev"

echo.
echo ✅ Both servers are starting!
echo.
echo Frontend: http://localhost:5173
echo Backend API: http://localhost:5000
echo.
pause
