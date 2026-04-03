#!/bin/bash
# Start both frontend and backend servers

echo "🚀 Starting Student Management System..."
echo ""

# Create two separate terminal windows/tabs
# Note: This script works on macOS/Linux. For Windows, use PowerShell or cmd.

# Start backend
echo "📚 Starting Backend Server on port 5000..."
cd server
npm install 2>/dev/null
npm start &
BACKEND_PID=$!

# Give backend time to start
sleep 2

# Start frontend
echo "⚛️  Starting Frontend Server on port 5174..."
cd ..
npm run dev &
FRONTEND_PID=$!

echo ""
echo "✅ Servers started!"
echo "  Backend:  http://localhost:5000"
echo "  Frontend: http://localhost:5174"
echo ""
echo "Press Ctrl+C to stop both servers"

# Wait for both processes
wait
