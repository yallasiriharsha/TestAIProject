# Student Management Portal - Full Stack

A complete student management system with a React frontend and Node.js/Express backend API.

## Project Structure

```
TestProject/
├── TestProject/          # Frontend (React + Vite)
│   ├── src/
│   │   ├── pages/
│   │   │   └── StudentManagement/
│   │   │       └── StudentManagementPage.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   └── ...
│   ├── package.json
│   └── vite.config.js
│
└── backend/              # Backend API (Node.js/Express)
    ├── src/
    │   ├── server.js
    │   ├── routes/
    │   │   ├── studentRoutes.js
    │   │   └── classRoutes.js
    │   ├── controllers/
    │   │   ├── studentController.js
    │   │   └── classController.js
    │   └── models/
    │       └── index.js
    ├── .env
    ├── package.json
    └── .gitignore
```

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

#### Backend Setup
```bash
cd backend
npm install
npm start
```
The API will run on `http://localhost:5000`

#### Frontend Setup
```bash
cd TestProject
npm install
npm run dev
```
The frontend will run on `http://localhost:5173`

## API Endpoints

### Students
- `GET /api/students` - Get all students
- `GET /api/students/:id` - Get student by ID
- `POST /api/students` - Create new student
- `PUT /api/students/:id` - Update student
- `DELETE /api/students/:id` - Delete student

### Classes
- `GET /api/classes` - Get all classes
- `GET /api/classes/:id` - Get class by ID
- `POST /api/classes` - Create new class
- `PUT /api/classes/:id` - Update class
- `DELETE /api/classes/:id` - Delete class

## API Request/Response Format

### Create Student
**Request:**
```json
POST /api/students
{
  "name": "John Doe",
  "class": "10-A",
  "rollNo": "001",
  "email": "john@example.com",
  "phone": "9876543210"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "John Doe",
    "class": "10-A",
    "rollNo": "001",
    "email": "john@example.com",
    "phone": "9876543210",
    "status": "Active",
    "createdAt": "2026-01-19T20:30:00.000Z",
    "updatedAt": "2026-01-19T20:30:00.000Z"
  },
  "message": "Student created successfully"
}
```

## Features

✅ **Student Management**
- View all students with pagination
- Add new students
- Edit student information
- Delete students
- Search students by name, roll number, or email

✅ **Class Management**
- Manage classes and sections
- Track class capacity

✅ **Data Persistence**
- In-memory database (can be replaced with MongoDB, PostgreSQL, etc.)

✅ **Error Handling**
- Comprehensive error messages
- CORS support for frontend-backend communication

## Development

### Running Both Servers
```bash
# Terminal 1: Start Backend
cd backend
npm start

# Terminal 2: Start Frontend
cd TestProject
npm run dev
```

### Environment Variables
Edit `.env` files in both folders to customize:

**Backend (.env)**
```
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

## Next Steps

To enhance this system, consider:
1. Replace in-memory database with MongoDB or PostgreSQL
2. Add authentication and authorization
3. Add more validation rules
4. Implement pagination on the backend
5. Add file upload capabilities
6. Create admin dashboard
7. Add reporting features
8. Implement student attendance tracking
9. Add grade management system
10. Deploy to cloud (Heroku, AWS, etc.)

## Technologies Used

**Frontend:**
- React 19
- Material-UI (MUI)
- React Router DOM
- Vite

**Backend:**
- Node.js
- Express.js
- CORS middleware
- UUID for ID generation

## License
MIT License
