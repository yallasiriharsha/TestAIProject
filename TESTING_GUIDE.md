# Testing & Verification Guide

## ✅ System Status Check

### Backend Status
```bash
curl http://localhost:5000/api/health
```
Expected response:
```json
{
  "status": "API is running",
  "timestamp": "2026-01-19T20:30:00.000Z"
}
```

### Frontend Status
Access http://localhost:5173 in your browser and check:
- [ ] Page loads without errors
- [ ] Student Management page displays
- [ ] Loading spinner appears briefly
- [ ] List of students loads from API
- [ ] No console errors in browser dev tools

---

## Testing the Student Management Features

### 1. View Students
**Action:** Navigate to Student Management page
**Expected:** Should display 3 pre-loaded students from the API

### 2. Search Students
**Action:** Type a student name in search box
**Expected:** Table filters to show matching students

### 3. Add New Student
**Steps:**
1. Click "Add New Student" button
2. Fill in:
   - Name: "Test Student"
   - Class: "10-C"
   - Roll No: "100"
   - Email: "test@example.com"
   - Phone: "9999999999"
3. Click "Save Student"

**Expected:**
- Alert shows "Student added successfully!"
- Form closes
- New student appears in table
- Student count increases

### 4. Edit Student
**Steps:**
1. Click Edit button on any student
2. Modify any field (e.g., change class to "11-A")
3. Click "Update Student"

**Expected:**
- Alert shows "Student updated successfully!"
- Form closes
- Student record updated in table

### 5. Delete Student
**Steps:**
1. Click Delete button on any student
2. Confirm deletion in popup

**Expected:**
- Alert shows "Student deleted successfully!"
- Student removed from table
- Student count decreases

---

## API Testing with cURL

### Get All Students
```bash
curl http://localhost:5000/api/students
```

### Create a Student
```bash
curl -X POST http://localhost:5000/api/students \
  -H "Content-Type: application/json" \
  -d '{
    "name": "API Test Student",
    "class": "10-C",
    "rollNo": "999",
    "email": "api@test.com",
    "phone": "9999999999"
  }'
```

### Get a Specific Student
```bash
curl http://localhost:5000/api/students/1
```

### Update a Student
```bash
curl -X PUT http://localhost:5000/api/students/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Name",
    "status": "Inactive"
  }'
```

### Delete a Student
```bash
curl -X DELETE http://localhost:5000/api/students/1
```

---

## Browser Console Testing

Open browser DevTools (F12) and check:

### 1. Check Network Requests
1. Open Network tab
2. Perform any student action
3. Should see API requests to `localhost:5000/api/students`
4. All requests should return 200-201 status codes

### 2. Check for Errors
1. Open Console tab
2. Perform student operations
3. Should see no errors (warnings are OK)
4. May see API logs like "Student created: ..."

### 3. Check CORS Headers
1. Open Network tab
2. Click on any `/api/students` request
3. Check Response Headers contain:
   - `access-control-allow-origin: http://localhost:5173`

---

## Postman Testing Setup

### Import Collection
1. Open Postman
2. Create new collection: "Student Management API"
3. Add requests:

**Get All Students**
- Method: GET
- URL: `http://localhost:5000/api/students`

**Create Student**
- Method: POST
- URL: `http://localhost:5000/api/students`
- Body (JSON):
```json
{
  "name": "Postman Test",
  "class": "10-A",
  "rollNo": "500",
  "email": "postman@test.com",
  "phone": "9876543210"
}
```

**Update Student**
- Method: PUT
- URL: `http://localhost:5000/api/students/{{STUDENT_ID}}`
- Body (JSON):
```json
{
  "name": "Updated via Postman",
  "status": "Inactive"
}
```

**Delete Student**
- Method: DELETE
- URL: `http://localhost:5000/api/students/{{STUDENT_ID}}`

---

## Common Issues & Solutions

### Issue: "Failed to load students. Please try again."
**Cause:** Backend not running or API unreachable
**Solution:**
```bash
# Check if backend is running
netstat -ano | findstr :5000

# Restart backend
cd backend
node src/server.js
```

### Issue: "CORS error in console"
**Cause:** Frontend URL doesn't match backend CORS config
**Solution:**
1. Check `.env` in backend has: `FRONTEND_URL=http://localhost:5173`
2. Restart backend server
3. Clear browser cache (Ctrl+Shift+Del)

### Issue: "Port 5000 already in use"
**Solution:**
```bash
# Find process using port 5000
netstat -ano | findstr :5000

# Kill the process (Windows)
taskkill /PID <PID> /F

# Or use different port in .env
PORT=5001
```

### Issue: "Cannot find module 'express'"
**Solution:**
```bash
cd backend
npm install
```

### Issue: Data not persisting after restart
**Note:** This is expected! Data is stored in memory. To persist data:
1. Replace in-memory DB with MongoDB/PostgreSQL
2. Or implement file-based storage

---

## Performance Testing

### Load Testing
```bash
# Install Apache Bench (if not already installed)
# Then test API performance
ab -n 100 -c 10 http://localhost:5000/api/students
```

### Memory Usage
Monitor terminal where servers are running for memory/CPU usage.

---

## Database Inspection

### View Current In-Memory Data
The backend stores all data in `/backend/src/models/index.js` in the `db` object.

To inspect:
1. Add console.log in server before starting
2. Or make a GET request and check response

### Reset Data
Restart the backend server (all data will reset to defaults).

---

## Debugging Tips

### Enable Verbose Logging
Edit `/backend/src/server.js` and add:
```javascript
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});
```

### Check Response Timing
Open Network tab in DevTools and monitor:
- Response time for API calls
- Payload size
- Should be < 100ms for local calls

### Frontend State Inspection
Add to component:
```javascript
console.log('Students:', students);
console.log('Loading:', loading);
console.log('Error:', error);
```

---

## Verification Checklist

- [ ] Backend server running on port 5000
- [ ] Frontend server running on port 5173
- [ ] Student list loads on page load
- [ ] Can add new student via frontend
- [ ] Can edit student details
- [ ] Can delete student with confirmation
- [ ] Can search students by name/roll no/email
- [ ] Error messages display properly
- [ ] Loading spinner shows during API calls
- [ ] Student count updates correctly
- [ ] No CORS errors in console
- [ ] No console errors

---

## Success Indicators

✅ All tests passing  
✅ No console errors  
✅ API responses < 200ms  
✅ Data persists during session  
✅ CRUD operations work smoothly  

**System Status:** Ready for Production Setup! 🚀

---

## Next: Connect to Real Database

When ready to move from in-memory storage:

1. **Setup MongoDB/PostgreSQL**
2. **Install database driver**
3. **Update models in `/backend/src/models/index.js`**
4. **Test all endpoints again**

See project README for detailed instructions.
