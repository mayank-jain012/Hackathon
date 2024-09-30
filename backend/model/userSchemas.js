import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import crypto from 'crypto';

const userSchemas = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    teacherId: { type: String }, // Store as string (or use Number if preferred)
    studentId: { type: String }, // Store as string
    children: [{ type: String }],
    enrolledCourses: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course' // Refers to the courses the student is enrolled in
    }],
    passwordChangeAt: Date,
    passwordExpiresIn: String,
    passwordResetIn: String,
  },
  { timestamps: true }
);

// Indexing for unique constraints
userSchemas.index({ email: 1 }, { unique: true });
// Define mobileno if it's going to be used; otherwise, remove this
userSchemas.index({ mobileno: 1 }, { unique: true }); // Ensure `mobileno` is defined in the schema

// Pre-save hook for password hashing
userSchemas.pre("save", async function (next) {
  // Check if password is modified
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare passwords
userSchemas.methods.isPasswordMatched = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Method to create password reset token
userSchemas.methods.createPasswordResetToken = async function () {
  const resetToken = crypto.randomBytes(32).toString('hex');
  this.passwordResetIn = crypto.createHash('sha256').update(resetToken).digest("hex");
  this.passwordExpiresIn = Date.now() + 36 * 60 * 1000; // Token valid for 36 minutes
  return resetToken;
};

const User = mongoose.model('User', userSchemas);
export default User;
