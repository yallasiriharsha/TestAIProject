# API Documentation

## Base URL
```
http://localhost:5000/api
```

## Health Check
```
GET /health
```
**Response:** `{ "status": "API is running", "timestamp": "2026-01-19T20:30:00.000Z" }`

---

## Students Endpoints

### Get All Students
```
GET /students
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "name": "John Doe",
      "class": "10-A",
      "rollNo": "001",
      "email": "john@example.com",
      "phone": "9876543210",
      "status": "Active",
      "createdAt": "2026-01-19T20:30:00.000Z",
      "updatedAt": "2026-01-19T20:30:00.000Z"
    },
    ...
  ],
  "message": "Students retrieved successfully"
}
```

---

### Get Student by ID
```
GET /students/:id
```

**Parameters:**
- `id` (string) - Student ID (UUID)

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "John Doe",
    "class": "10-A",
    "rollNo": "001",
    "email": "john@example.com",
    "phone": "9876543210",
    "status": "Active",
    "createdAt": "2026-01-19T20:30:00.000Z",
    "updatedAt": "2026-01-19T20:30:00.000Z"
  },
  "message": "Student retrieved successfully"
}
```

**Response (404 Not Found):**
```json
{
  "success": false,
  "message": "Student not found"
}
```

---

### Create New Student
```
POST /students
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "Jane Smith",
  "class": "10-B",
  "rollNo": "002",
  "email": "jane@example.com",
  "phone": "9876543211"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440001",
    "name": "Jane Smith",
    "class": "10-B",
    "rollNo": "002",
    "email": "jane@example.com",
    "phone": "9876543211",
    "status": "Active",
    "createdAt": "2026-01-19T20:30:00.000Z",
    "updatedAt": "2026-01-19T20:30:00.000Z"
  },
  "message": "Student created successfully"
}
```

**Response (400 Bad Request):**
```json
{
  "success": false,
  "message": "Name, class, and roll number are required"
}
```

---

### Update Student
```
PUT /students/:id
Content-Type: application/json
```

**Parameters:**
- `id` (string) - Student ID (UUID)

**Request Body:**
```json
{
  "name": "Jane Smith Updated",
  "class": "10-A",
  "rollNo": "002",
  "email": "jane.updated@example.com",
  "phone": "9876543211",
  "status": "Active"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440001",
    "name": "Jane Smith Updated",
    "class": "10-A",
    "rollNo": "002",
    "email": "jane.updated@example.com",
    "phone": "9876543211",
    "status": "Active",
    "createdAt": "2026-01-19T20:30:00.000Z",
    "updatedAt": "2026-01-19T20:30:05.000Z"
  },
  "message": "Student updated successfully"
}
```

---

### Delete Student
```
DELETE /students/:id
```

**Parameters:**
- `id` (string) - Student ID (UUID)

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Student deleted successfully"
}
```

**Response (404 Not Found):**
```json
{
  "success": false,
  "message": "Student not found"
}
```

---

## Classes Endpoints

### Get All Classes
```
GET /classes
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440100",
      "name": "10-A",
      "grade": "10",
      "section": "A",
      "capacity": 30,
      "createdAt": "2026-01-19T20:30:00.000Z",
      "updatedAt": "2026-01-19T20:30:00.000Z"
    },
    ...
  ],
  "message": "Classes retrieved successfully"
}
```

---

### Get Class by ID
```
GET /classes/:id
```

**Parameters:**
- `id` (string) - Class ID (UUID)

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440100",
    "name": "10-A",
    "grade": "10",
    "section": "A",
    "capacity": 30,
    "createdAt": "2026-01-19T20:30:00.000Z",
    "updatedAt": "2026-01-19T20:30:00.000Z"
  },
  "message": "Class retrieved successfully"
}
```

---

### Create New Class
```
POST /classes
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "11-A",
  "grade": "11",
  "section": "A",
  "capacity": 35
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440101",
    "name": "11-A",
    "grade": "11",
    "section": "A",
    "capacity": 35,
    "createdAt": "2026-01-19T20:30:00.000Z",
    "updatedAt": "2026-01-19T20:30:00.000Z"
  },
  "message": "Class created successfully"
}
```

---

### Update Class
```
PUT /classes/:id
Content-Type: application/json
```

**Parameters:**
- `id` (string) - Class ID (UUID)

**Request Body:**
```json
{
  "name": "11-A",
  "grade": "11",
  "section": "A",
  "capacity": 40
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440101",
    "name": "11-A",
    "grade": "11",
    "section": "A",
    "capacity": 40,
    "createdAt": "2026-01-19T20:30:00.000Z",
    "updatedAt": "2026-01-19T20:30:05.000Z"
  },
  "message": "Class updated successfully"
}
```

---

### Delete Class
```
DELETE /classes/:id
```

**Parameters:**
- `id` (string) - Class ID (UUID)

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Class deleted successfully"
}
```

---

## Error Handling

All endpoints return appropriate HTTP status codes:

- **200 OK** - Successful GET/PUT/DELETE request
- **201 Created** - Successful POST request
- **400 Bad Request** - Invalid or missing required fields
- **404 Not Found** - Resource not found
- **500 Internal Server Error** - Server error

Error Response Format:
```json
{
  "success": false,
  "message": "Error description",
  "error": "Error details (development only)"
}
```

---

## CORS

The API supports Cross-Origin Resource Sharing (CORS) with the following configuration:

- **Origin:** http://localhost:5173 (frontend)
- **Methods:** GET, POST, PUT, DELETE, PATCH
- **Headers:** Content-Type, Authorization
- **Credentials:** Allowed

---

## Testing the API

You can test the API using:
- cURL
- Postman
- Thunder Client
- VS Code REST Client

### Example cURL Requests

**Get all students:**
```bash
curl http://localhost:5000/api/students
```

**Create a student:**
```bash
curl -X POST http://localhost:5000/api/students \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "class": "10-A",
    "rollNo": "001",
    "email": "john@example.com",
    "phone": "9876543210"
  }'
```

**Update a student:**
```bash
curl -X PUT http://localhost:5000/api/students/550e8400-e29b-41d4-a716-446655440000 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe Updated",
    "status": "Inactive"
  }'
```

**Delete a student:**
```bash
curl -X DELETE http://localhost:5000/api/students/550e8400-e29b-41d4-a716-446655440000
```

---

## Frontend Integration

The frontend uses the `studentAPI` and `classAPI` functions from `src/services/api.js`:

```javascript
import { studentAPI, classAPI } from '../../services/api'

// Get all students
const students = await studentAPI.getAll()

// Get student by ID
const student = await studentAPI.getById('550e8400-e29b-41d4-a716-446655440000')

// Create student
const newStudent = await studentAPI.create({
  name: 'Jane Smith',
  class: '10-B',
  rollNo: '002',
  email: 'jane@example.com',
  phone: '9876543211'
})

// Update student
const updated = await studentAPI.update('550e8400-e29b-41d4-a716-446655440000', {
  name: 'Jane Smith Updated',
  status: 'Inactive'
})

// Delete student
await studentAPI.delete('550e8400-e29b-41d4-a716-446655440000')
```
