@echo off
REM ============================================
REM Start Backend Server
REM ============================================

cls
echo.
echo ========================================
echo  🚀 Starting Backend Server
echo ========================================
echo.
echo Location: http://localhost:5000
echo API Base: http://localhost:5000/api
echo.
echo Expected output:
echo   - [dotenv] injecting env
echo   - ✅ MongoDB connected successfully
echo   - 📍 Server running on http://localhost:5000
echo.
echo Press Ctrl+C to stop the server
echo.
echo ========================================
echo.

cd /d "%~dp0server"

REM Check if node_modules exists
if not exist "node_modules" (
    echo Installing dependencies...
    call npm install
)

REM Start the server
call npm start

pause
