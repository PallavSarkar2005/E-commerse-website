const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Method to compare entered password with hashed password in DB
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// --- THE FIX ---
// Notice: We removed 'next' from the arguments list
userSchema.pre('save', async function () {
  // 1. If password is not modified, just return (ends the function)
  if (!this.isModified('password')) {
    return;
  }

  // 2. Hash the password (async/await handles the waiting)
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  
  // No need to call next() here. Finishing the async function tells Mongoose to proceed.
});

// Check if model exists before creating it
module.exports = mongoose.models.User || mongoose.model('User', userSchema);