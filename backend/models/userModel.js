import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  // Traditional auth fields
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String }, // Optional for Firebase users
  
  // Firebase-specific fields
  firebaseUid: { type: String, unique: true, sparse: true }, // Firebase UID
  avatar: { type: String }, // Profile picture URL
  authProvider: { 
    type: String, 
    enum: ["email", "google", "facebook", "twitter"], 
    default: "email" 
  },
  emailVerified: { type: Boolean, default: false },
  
  // Common fields
  role: { type: String, enum: ["user", "admin"], default: "user" },
  favoriteRestaurant: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant" },
  
  // Activity tracking
  lastLogin: { type: Date },
  isActive: { type: Boolean, default: true }
}, { 
  timestamps: true,
  // Add index for better performance
  index: { firebaseUid: 1, email: 1 }
});

// Pre-save middleware to ensure at least one auth method exists
userSchema.pre('save', function(next) {
  if (!this.password && !this.firebaseUid) {
    return next(new Error('User must have either password or Firebase UID'));
  }
  next();
});

// Method to check if user is Firebase user
userSchema.methods.isFirebaseUser = function() {
  return !!this.firebaseUid;
};

// Method to get safe user data (excluding sensitive info)
userSchema.methods.toSafeObject = function() {
  const userObject = this.toObject();
  delete userObject.password;
  return userObject;
};

const User = mongoose.model('User', userSchema);
export default User;

