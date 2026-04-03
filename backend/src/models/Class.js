import mongoose from 'mongoose';

const classSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    grade: {
      type: String,
      required: true,
      trim: true,
    },
    section: {
      type: String,
      required: true,
      trim: true,
    },
    capacity: {
      type: Number,
      default: 30,
    },
  },
  { timestamps: true }
);

export const Class = mongoose.model('Class', classSchema);
