@echo off
REM ============================================
REM Start Frontend Server
REM ============================================

cls
echo.
echo ========================================
echo  🎨 Starting Frontend Server
echo ========================================
echo.
echo Location: http://localhost:5174
echo.
echo Expected output:
echo   - Local:   http://localhost:5174
echo   - Press q to quit
echo.
echo Make sure backend is running on port 5000
echo Backend: npm start (in another terminal)
echo.
echo ========================================
echo.

cd /d "%~dp0"

REM Check if node_modules exists
if not exist "node_modules" (
    echo Installing dependencies...
    call npm install
)

REM Start the frontend
call npm run dev

pause
