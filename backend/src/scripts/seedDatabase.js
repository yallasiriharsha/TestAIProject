import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Student } from '../models/Student.js';
import { Class } from '../models/Class.js';

dotenv.config();

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/student-management', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('📦 Connected to MongoDB');

    // Clear existing data
    await Student.deleteMany({});
    await Class.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Seed Classes
    const classes = await Class.insertMany([
      {
        name: '10-A',
        grade: '10',
        section: 'A',
        capacity: 30,
      },
      {
        name: '10-B',
        grade: '10',
        section: 'B',
        capacity: 30,
      },
      {
        name: '11-A',
        grade: '11',
        section: 'A',
        capacity: 35,
      },
    ]);
    console.log(`✅ Seeded ${classes.length} classes`);

    // Seed Students
    const students = await Student.insertMany([
      {
        name: 'John Doe',
        class: '10-A',
        rollNo: '001',
        email: 'john@example.com',
        phone: '9876543210',
        status: 'Active',
      },
      {
        name: 'Jane Smith',
        class: '10-B',
        rollNo: '002',
        email: 'jane@example.com',
        phone: '9876543211',
        status: 'Active',
      },
      {
        name: 'Michael Johnson',
        class: '10-A',
        rollNo: '003',
        email: 'michael@example.com',
        phone: '9876543212',
        status: 'Inactive',
      },
    ]);
    console.log(`✅ Seeded ${students.length} students`);

    console.log('\n✅ Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error.message);
    process.exit(1);
  }
};

seedDatabase();
