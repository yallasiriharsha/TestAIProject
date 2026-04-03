@echo off
REM ============================================
REM MongoDB Integration - Windows Setup Script
REM ============================================

cls
echo.
echo ========================================
echo  MongoDB Integration Setup
echo ========================================
echo.
echo This script will:
echo 1. Verify Node.js installation
echo 2. Check npm packages
echo 3. Show setup instructions
echo.
pause

REM Check Node.js
echo Checking Node.js installation...
node --version >nul 2>&1
if errorlevel 1 (
    echo.
    echo ERROR: Node.js is not installed!
    echo Download from: https://nodejs.org/
    pause
    exit /b 1
)
echo ✅ Node.js is installed: 
node --version

REM Check npm
echo.
echo Checking npm installation...
npm --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: npm is not installed!
    pause
    exit /b 1
)
echo ✅ npm is installed: 
npm --version

REM Check if in correct directory
echo.
echo Checking directory...
if not exist "server\package.json" (
    echo ERROR: server\package.json not found!
    echo Please run this script from the project root directory.
    pause
    exit /b 1
)
echo ✅ Project structure looks good

REM Show next steps
echo.
echo ========================================
echo  NEXT STEPS:
echo ========================================
echo.
echo 1. CHOOSE YOUR DATABASE:
echo    Option A: MongoDB Atlas (Cloud)
echo       - Go to: https://www.mongodb.com/cloud/atlas
echo       - Create free account
echo       - Create cluster (M0 Free)
echo       - Get connection string
echo       - Update: server\.env
echo.
echo    Option B: Local MongoDB
echo       - Download: https://www.mongodb.com/try/download/community
echo       - Run .msi installer
echo       - Check "Install as Windows Service"
echo       - Keep default: mongodb://localhost:27017
echo.
echo 2. UPDATE .env FILE:
echo    Edit: server\.env
echo    Set: MONGODB_URI=your_connection_string
echo.
echo 3. START BACKEND:
echo    Run: start-backend.bat
echo    Or: cd server && npm start
echo.
echo 4. START FRONTEND:
echo    Run: start-frontend.bat
echo    Or: npm run dev
echo.
echo 5. TEST:
echo    Browser: http://localhost:5174
echo    Or: curl http://localhost:5000/api/health
echo.
echo ========================================
pause
