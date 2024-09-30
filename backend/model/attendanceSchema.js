import mongoose from 'mongoose';
const attendanceSchema = new mongoose.Schema({
    class: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Class',
      required: true
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    date: {
      type: Date,
      required: true
    },
    status: {
      type: String,
      enum: ['Present', 'Absent'],
      required: true
    }
  }, { timestamps: true });
  
  const Attendance = mongoose.model('Attendance', attendanceSchema);
export default Attendance;
  