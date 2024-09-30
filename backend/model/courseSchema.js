import mongoose from 'mongoose';

// Course Schema
const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // Refers to the Teacher in the User schema
    required: true
  },
  students: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // Refers to Students enrolled in the course
  }],
  schedule: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  }
}, { timestamps: true });

const Course = mongoose.model('Course', courseSchema);
export default Course;
