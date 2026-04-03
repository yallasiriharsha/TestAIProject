# MongoDB Setup Guide

## Prerequisites
- MongoDB Community Edition installed on your system
- OR MongoDB Atlas (cloud) account

---

## Option 1: Local MongoDB Installation

### Windows

#### Step 1: Download MongoDB
Visit https://www.mongodb.com/try/download/community and download the latest MSI installer for Windows.

#### Step 2: Install MongoDB
1. Run the installer
2. Follow the installation wizard
3. Keep default settings or customize as needed
4. MongoDB will be installed to: `C:\Program Files\MongoDB`

#### Step 3: Add MongoDB to System PATH
1. Press `Win + R` and type `sysdm.cpl`
2. Click "Environment Variables"
3. Under "System variables", click "Path" → "Edit"
4. Add: `C:\Program Files\MongoDB\Server\7.0\bin` (adjust version number)
5. Click OK and restart your computer

#### Step 4: Start MongoDB Service
1. Open Command Prompt (cmd)
2. Run: `mongod`
3. MongoDB will start on port 27017

**Keep this terminal open while running your backend!**

### macOS

```bash
# Install using Homebrew
brew tap mongodb/brew
brew install mongodb-community

# Start MongoDB service
brew services start mongodb-community

# Stop MongoDB service
brew services stop mongodb-community
```

### Linux (Ubuntu/Debian)

```bash
# Import the public key
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -

# Add MongoDB repo
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list

# Install MongoDB
sudo apt-get update
sudo apt-get install -y mongodb-org

# Start MongoDB
sudo systemctl start mongod

# Enable on boot
sudo systemctl enable mongod
```

---

## Option 2: MongoDB Atlas (Cloud)

### Step 1: Create Account
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Verify your email

### Step 2: Create a Cluster
1. Click "Build a Database"
2. Choose the FREE tier
3. Select your preferred cloud provider and region
4. Click "Create"

### Step 3: Create Database User
1. Go to "Database Access"
2. Click "Add New Database User"
3. Create username and password
4. Click "Add User"

### Step 4: Whitelist IP Address
1. Go to "Network Access"
2. Click "Add IP Address"
3. Choose "Allow Access from Anywhere" (for development)
4. Click "Confirm"

### Step 5: Get Connection String
1. Click "Databases" → "Connect"
2. Choose "Connect your application"
3. Select "Node.js" driver
4. Copy the connection string
5. Replace `<password>` with your user password
6. Add to `.env`:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/student-management
```

---

## Configuration

### Update Backend .env

Edit `backend/.env`:

#### For Local MongoDB:
```
MONGODB_URI=mongodb://localhost:27017/student-management
```

#### For MongoDB Atlas:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/student-management
```

---

## Install Dependencies

```bash
cd backend
npm install
```

This will install:
- mongoose (MongoDB driver)
- express
- cors
- dotenv

---

## Seed the Database

```bash
# From backend directory
npm run seed
```

This will:
1. Connect to MongoDB
2. Clear any existing data
3. Create 3 sample classes (10-A, 10-B, 11-A)
4. Create 3 sample students

---

## Test the Connection

### Option 1: MongoDB Compass (GUI)

1. Download MongoDB Compass: https://www.mongodb.com/products/compass
2. Connect to your MongoDB instance
3. You should see:
   - Database: `student-management`
   - Collections: `classes`, `students`
   - Documents: Sample data

### Option 2: mongosh CLI

```bash
# Connect to MongoDB
mongosh

# List databases
show dbs

# Use the database
use student-management

# List collections
show collections

# View students
db.students.find()

# View classes
db.classes.find()
```

### Option 3: API Testing

Start the backend:
```bash
npm start
```

Test with curl:
```bash
# Get all students
curl http://localhost:5000/api/students

# Get all classes
curl http://localhost:5000/api/classes
```

---

## Troubleshooting

### Error: "connect ECONNREFUSED"
- MongoDB is not running
- Make sure `mongod` is running in a terminal
- Check MONGODB_URI in .env

### Error: "MongoServerSelectionError"
- Wrong connection string
- MongoDB Atlas IP not whitelisted
- Firewall blocking connection

### Error: "MongoAuthenticationError"
- Wrong username/password
- User not created in MongoDB Atlas

### Error: "E11000 duplicate key error"
- Duplicate rollNo or class name
- Run `npm run seed` to reset database

---

## MongoDB Commands

```bash
# Connect to local MongoDB
mongosh

# List all databases
show dbs

# Switch to a database
use student-management

# List collections
show collections

# Find all documents
db.students.find()
db.classes.find()

# Find specific student
db.students.findOne({ rollNo: '001' })

# Count documents
db.students.countDocuments()

# Delete all documents
db.students.deleteMany({})

# Create index (for performance)
db.students.createIndex({ rollNo: 1 })
```

---

## Quick Start

### For Beginners (Local MongoDB):

```bash
# 1. Open Command Prompt
mongod

# 2. In another terminal, navigate to backend
cd d:\Work\TestAIProject\backend

# 3. Install dependencies
npm install

# 4. Seed database
npm run seed

# 5. Start server
npm start
```

Server will be running on http://localhost:5000

---

## Performance Tips

1. **Create Indexes**: Add indexes for frequently queried fields
2. **Connection Pooling**: Mongoose handles this automatically
3. **Data Validation**: Use MongoDB schema validation
4. **Pagination**: Add limit and skip for large datasets

---

## Next Steps

1. Verify MongoDB is running
2. Run `npm install` in backend folder
3. Run `npm run seed` to populate data
4. Run `npm start` to start the server
5. Test API endpoints

**Your backend is now connected to MongoDB!** 🎉
