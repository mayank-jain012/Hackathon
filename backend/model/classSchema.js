import mongoose from 'mongoose';
const classSchema = new mongoose.Schema({
    className: {
      type: String,
      required: true
    },
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    students: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }],
    subject: {
      type: String,
      required: true
    },
  }, { timestamps: true });
  
  const Class = mongoose.model('Class', classSchema);
  export default Class;
  