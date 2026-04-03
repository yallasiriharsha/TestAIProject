import { v4 as uuidv4 } from 'uuid';

// In-memory database
export const db = {
  students: [
    {
      id: '1',
      name: 'John Doe',
      class: '10-A',
      rollNo: '001',
      email: 'john@example.com',
      phone: '9876543210',
      status: 'Active',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '2',
      name: 'Jane Smith',
      class: '10-B',
      rollNo: '002',
      email: 'jane@example.com',
      phone: '9876543211',
      status: 'Active',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '3',
      name: 'Michael Johnson',
      class: '10-A',
      rollNo: '003',
      email: 'michael@example.com',
      phone: '9876543212',
      status: 'Inactive',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
  classes: [
    {
      id: '1',
      name: '10-A',
      grade: '10',
      section: 'A',
      capacity: 30,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '2',
      name: '10-B',
      grade: '10',
      section: 'B',
      capacity: 30,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '3',
      name: '11-A',
      grade: '11',
      section: 'A',
      capacity: 35,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
};

// Student Model
export const Student = {
  findAll: () => db.students,
  
  findById: (id) => db.students.find(s => s.id === id),
  
  create: (data) => {
    const student = {
      id: uuidv4(),
      ...data,
      status: data.status || 'Active',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    db.students.push(student);
    return student;
  },
  
  update: (id, data) => {
    const index = db.students.findIndex(s => s.id === id);
    if (index === -1) return null;
    
    const updated = {
      ...db.students[index],
      ...data,
      updatedAt: new Date(),
    };
    db.students[index] = updated;
    return updated;
  },
  
  delete: (id) => {
    const index = db.students.findIndex(s => s.id === id);
    if (index === -1) return false;
    
    db.students.splice(index, 1);
    return true;
  },
};

// Class Model
export const Class = {
  findAll: () => db.classes,
  
  findById: (id) => db.classes.find(c => c.id === id),
  
  create: (data) => {
    const newClass = {
      id: uuidv4(),
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    db.classes.push(newClass);
    return newClass;
  },
  
  update: (id, data) => {
    const index = db.classes.findIndex(c => c.id === id);
    if (index === -1) return null;
    
    const updated = {
      ...db.classes[index],
      ...data,
      updatedAt: new Date(),
    };
    db.classes[index] = updated;
    return updated;
  },
  
  delete: (id) => {
    const index = db.classes.findIndex(c => c.id === id);
    if (index === -1) return false;
    
    db.classes.splice(index, 1);
    return true;
  },
};
