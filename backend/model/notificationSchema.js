import mongoose from 'mongoose';
const notificationSchema = new mongoose.Schema({
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    message: {
      type: String,
      required: true
    },
    type: {
      type: String,
      enum: ['Assignment Due', 'Grade Update', 'Attendance Issue'],
      required: true
    },
    isRead: {
      type: Boolean,
      default: false
    }
  }, { timestamps: true });
  
  const Notification = mongoose.model('Notification', notificationSchema);
export default Notification;
  