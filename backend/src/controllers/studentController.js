import { Student } from '../models/Student.js';

export const studentController = {
  // GET all students
  getAll: async (req, res) => {
    try {
      const students = await Student.find().sort({ createdAt: -1 });
      res.json({
        success: true,
        data: students,
        message: 'Students retrieved successfully',
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error retrieving students',
        error: error.message,
      });
    }
  },

  // GET student by ID
  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const student = await Student.findById(id);

      if (!student) {
        return res.status(404).json({
          success: false,
          message: 'Student not found',
        });
      }

      res.json({
        success: true,
        data: student,
        message: 'Student retrieved successfully',
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error retrieving student',
        error: error.message,
      });
    }
  },

  // CREATE new student
  create: async (req, res) => {
    try {
      const { name, class: className, rollNo, email, phone } = req.body;

      // Validation
      if (!name || !className || !rollNo) {
        return res.status(400).json({
          success: false,
          message: 'Name, class, and roll number are required',
        });
      }

      const student = new Student({
        name,
        class: className,
        rollNo,
        email,
        phone,
      });

      const savedStudent = await student.save();

      res.status(201).json({
        success: true,
        data: savedStudent,
        message: 'Student created successfully',
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error creating student',
        error: error.message,
      });
    }
  },

  // UPDATE student
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, class: className, rollNo, email, phone, status } = req.body;

      const student = await Student.findById(id);
      if (!student) {
        return res.status(404).json({
          success: false,
          message: 'Student not found',
        });
      }

      // Update fields
      if (name) student.name = name;
      if (className) student.class = className;
      if (rollNo) student.rollNo = rollNo;
      if (email) student.email = email;
      if (phone) student.phone = phone;
      if (status) student.status = status;

      const updated = await student.save();

      res.json({
        success: true,
        data: updated,
        message: 'Student updated successfully',
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error updating student',
        error: error.message,
      });
    }
  },

  // DELETE student
  delete: async (req, res) => {
    try {
      const { id } = req.params;

      const student = await Student.findByIdAndDelete(id);
      if (!student) {
        return res.status(404).json({
          success: false,
          message: 'Student not found',
        });
      }

      res.json({
        success: true,
        message: 'Student deleted successfully',
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error deleting student',
        error: error.message,
      });
    }
  },
};
