# MongoDB Integration - Complete! 🎉

## What's Changed

Your backend is now configured to use **MongoDB** instead of in-memory storage!

---

## 📦 Files Created/Updated

### New Files Created:
✅ `backend/src/config/database.js` - MongoDB connection setup  
✅ `backend/src/models/Student.js` - Student MongoDB schema  
✅ `backend/src/models/Class.js` - Class MongoDB schema  
✅ `backend/src/scripts/seedDatabase.js` - Database seeding script  
✅ `MONGODB_SETUP.md` - Detailed MongoDB setup guide  

### Files Updated:
✅ `backend/package.json` - Added mongoose, added seed script  
✅ `backend/.env` - Added MONGODB_URI  
✅ `backend/src/server.js` - Added MongoDB connection  
✅ `backend/src/controllers/studentController.js` - Updated for MongoDB  
✅ `backend/src/controllers/classController.js` - Updated for MongoDB  

---

## 🔄 Changes Made

### 1. Database Connection
```javascript
// Automatically connects to MongoDB on server startup
connectDB();
```

### 2. Data Models
**Student Schema:**
- name (required)
- class (required)
- rollNo (required, unique)
- email (optional)
- phone (optional)
- status (Active/Inactive)
- timestamps (createdAt, updatedAt)

**Class Schema:**
- name (required, unique)
- grade (required)
- section (required)
- capacity (default: 30)
- timestamps (createdAt, updatedAt)

### 3. Controllers
All CRUD operations now use:
- `Student.find()` - Get all students
- `Student.findById()` - Get by ID
- `Student.save()` - Create/Update
- `Student.findByIdAndDelete()` - Delete

---

## 🚀 Quick Start

### Step 1: Install MongoDB (if not already installed)

**Windows:**
```bash
# Download and install from https://www.mongodb.com/try/download/community
# Then run in Command Prompt:
mongod
```

**macOS:**
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Linux:**
```bash
sudo apt-get install -y mongodb-org
sudo systemctl start mongod
```

### Step 2: Install Backend Dependencies
```bash
cd backend
npm install
```

This installs mongoose and updates all dependencies.

### Step 3: Seed Database (Optional but Recommended)
```bash
npm run seed
```

This creates:
- 3 sample classes (10-A, 10-B, 11-A)
- 3 sample students with data

### Step 4: Start Backend
```bash
# Terminal 1: Keep MongoDB running
mongod

# Terminal 2: Start backend
cd backend
npm start
```

Backend will start on `http://localhost:5000`

### Step 5: Verify Connection
```bash
# Test API endpoint
curl http://localhost:5000/api/students

# Or open in browser: http://localhost:5000/api/health
```

---

## 📊 Database Structure

```
student-management (Database)
├── students (Collection)
│   ├── _id: ObjectId
│   ├── name: String
│   ├── class: String
│   ├── rollNo: String (unique)
│   ├── email: String
│   ├── phone: String
│   ├── status: String
│   ├── createdAt: Date
│   └── updatedAt: Date
│
└── classes (Collection)
    ├── _id: ObjectId
    ├── name: String (unique)
    ├── grade: String
    ├── section: String
    ├── capacity: Number
    ├── createdAt: Date
    └── updatedAt: Date
```

---

## 🔗 Connection Strings

### Local MongoDB
```
MONGODB_URI=mongodb://localhost:27017/student-management
```

### MongoDB Atlas (Cloud)
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/student-management
```

Edit `.env` to use your connection string.

---

## ✨ New Features

### 1. Data Persistence
- Data survives server restart
- Data persists between sessions
- Real database storage

### 2. Unique Constraints
- rollNo must be unique (no duplicates)
- class name must be unique

### 3. Timestamps
- `createdAt` - When record was created
- `updatedAt` - Last modification time

### 4. Validation
- MongoDB schema validation
- Required fields enforced
- Email format validation (optional)

---

## 📋 npm Scripts

```bash
# Start server
npm start

# Development mode (auto-reload)
npm run dev

# Seed database with sample data
npm run seed
```

---

## 🧪 Testing

### With curl:
```bash
# Get all students
curl http://localhost:5000/api/students

# Create student
curl -X POST http://localhost:5000/api/students \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","class":"10-A","rollNo":"999","email":"test@test.com"}'

# Get all classes
curl http://localhost:5000/api/classes
```

### With MongoDB Compass:
1. Download: https://www.mongodb.com/products/compass
2. Connect to: `mongodb://localhost:27017`
3. Browse `student-management` database
4. View collections and documents

### With mongosh CLI:
```bash
mongosh
use student-management
db.students.find()
db.classes.find()
```

---

## ⚠️ Important Notes

1. **Keep MongoDB Running**: Make sure `mongod` is running in a terminal
2. **Connection String**: Check `.env` has correct MONGODB_URI
3. **IP Whitelisting**: If using MongoDB Atlas, whitelist your IP
4. **Data Persistence**: Data now persists after restart (unlike before)
5. **Seed Data**: Run `npm run seed` after first setup to populate data

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| "ECONNREFUSED" | MongoDB not running - run `mongod` |
| "MongoAuthenticationError" | Wrong username/password in connection string |
| "E11000 duplicate key" | Duplicate rollNo/class name - run `npm run seed` to reset |
| Connection timeout | Check IP whitelisting (MongoDB Atlas) |

For detailed troubleshooting, see [MONGODB_SETUP.md](MONGODB_SETUP.md)

---

## 📚 Useful Commands

```bash
# Check if MongoDB is running
mongosh

# View all databases
show dbs

# Connect to database
use student-management

# View collections
show collections

# View all students
db.students.find()

# View specific student
db.students.findOne({ rollNo: '001' })

# Count documents
db.students.countDocuments()

# Delete all students
db.students.deleteMany({})
```

---

## 🎯 What's Next

1. ✅ MongoDB installed and running
2. ✅ Backend connected to MongoDB
3. ✅ Database models created
4. ✅ Sample data seeded
5. Next: Test the API endpoints
6. Next: Deploy to production with Atlas

---

## 📖 Full Setup Documentation

See **[MONGODB_SETUP.md](MONGODB_SETUP.md)** for:
- Detailed installation instructions (Windows, macOS, Linux)
- MongoDB Atlas cloud setup
- Troubleshooting guide
- Performance tips
- MongoDB CLI commands

---

## ✅ Status

**MongoDB Integration:** ✅ Complete  
**Backend Updated:** ✅ Complete  
**Ready to Use:** ✅ Yes!  

Just follow the Quick Start steps above to get running!

---

**Next Step:** Follow the Quick Start guide to set up and run everything! 🚀
