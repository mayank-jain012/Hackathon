import mongoose from "mongoose";

const gradeSchema = new mongoose.Schema({
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    class: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Class',
      required: true
    },
    assignmentName: {
      type: String,
      required: true
    },
    grade: {
      type: Number,
      required: true
    },
    gradeType: {
      type: String,
      enum: ['Assignment', 'Quiz', 'Exam'],
      required: true
    },
    weight: {
      type: Number,
      default: 1 // Allow customizable grade weights
    }
  }, { timestamps: true });
  
  const Grade = mongoose.model('Grade', gradeSchema);
  export default Grade;
  