const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  profileComplete: { type: Boolean, default: false },

  // Personal details
  mobile: { type: String },
  address: { type: String },
  age: { type: Number },
  sex: { type: String, enum: ['Male', 'Female', 'Other'] },
  dob: { type: Date },
  city: { type: String },
  state: { type: String },

  // Academic details
  college: { type: String },
  branch: { type: String },
  degree: { type: String },
  cgpa: { type: Number },
  passingYear: { type: Number },
  rollNumber: { type: String },

  // Skills & Resume
  skills: [{ type: String }],
  resumeLink: { type: String },

  appliedJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Job' }],
}, { timestamps: true });

studentSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

studentSchema.methods.matchPassword = async function (entered) {
  return await bcrypt.compare(entered, this.password);
};

module.exports = mongoose.model('Student', studentSchema);