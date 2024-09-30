import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema({
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
    message: {
      type: String,
      required: true
    },
    grade: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Grade',
      required: true
    }
  }, { timestamps: true });
  
  const Feedback = mongoose.model('Feedback', feedbackSchema);
export default Feedback;
  