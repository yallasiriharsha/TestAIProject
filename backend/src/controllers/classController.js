import { Class } from '../models/Class.js';

export const classController = {
  // GET all classes
  getAll: async (req, res) => {
    try {
      const classes = await Class.find().sort({ createdAt: -1 });
      res.json({
        success: true,
        data: classes,
        message: 'Classes retrieved successfully',
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error retrieving classes',
        error: error.message,
      });
    }
  },

  // GET class by ID
  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const classData = await Class.findById(id);

      if (!classData) {
        return res.status(404).json({
          success: false,
          message: 'Class not found',
        });
      }

      res.json({
        success: true,
        data: classData,
        message: 'Class retrieved successfully',
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error retrieving class',
        error: error.message,
      });
    }
  },

  // CREATE new class
  create: async (req, res) => {
    try {
      const { name, grade, section, capacity } = req.body;

      // Validation
      if (!name || !grade || !section) {
        return res.status(400).json({
          success: false,
          message: 'Name, grade, and section are required',
        });
      }

      const newClass = new Class({
        name,
        grade,
        section,
        capacity: capacity || 30,
      });

      const savedClass = await newClass.save();

      res.status(201).json({
        success: true,
        data: savedClass,
        message: 'Class created successfully',
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error creating class',
        error: error.message,
      });
    }
  },

  // UPDATE class
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, grade, section, capacity } = req.body;

      const classData = await Class.findById(id);
      if (!classData) {
        return res.status(404).json({
          success: false,
          message: 'Class not found',
        });
      }

      // Update fields
      if (name) classData.name = name;
      if (grade) classData.grade = grade;
      if (section) classData.section = section;
      if (capacity) classData.capacity = capacity;

      const updated = await classData.save();

      res.json({
        success: true,
        data: updated,
        message: 'Class updated successfully',
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error updating class',
        error: error.message,
      });
    }
  },

  // DELETE class
  delete: async (req, res) => {
    try {
      const { id } = req.params;

      const classData = await Class.findByIdAndDelete(id);
      if (!classData) {
        return res.status(404).json({
          success: false,
          message: 'Class not found',
        });
      }

      res.json({
        success: true,
        message: 'Class deleted successfully',
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error deleting class',
        error: error.message,
      });
    }
  },
};
