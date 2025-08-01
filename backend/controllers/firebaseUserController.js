import { setUserClaims, getFirebaseUser } from '../config/firebase-admin.js';
import User from '../models/userModel.js';

// Sync Firebase user with MongoDB
export const syncFirebaseUser = async (req, res) => {
  try {
    const { uid, email, name, picture, provider } = req.user;
    
    // Check if user exists in MongoDB
    let user = await User.findOne({ firebaseUid: uid });
    
    if (!user) {
      // Create new user in MongoDB
      user = await User.create({
        firebaseUid: uid,
        name: name || email.split('@')[0],
        email: email,
        avatar: picture,
        authProvider: provider,
        role: 'user'
      });
      
      console.log('New Firebase user synced to MongoDB:', user._id);
    } else {
      // Update existing user
      user.name = name || user.name;
      user.avatar = picture || user.avatar;
      user.lastLogin = new Date();
      await user.save();
    }
    
    res.json({
      success: true,
      user: {
        _id: user._id,
        firebaseUid: user.firebaseUid,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        role: user.role,
        authProvider: user.authProvider
      }
    });
  } catch (error) {
    console.error('Error syncing Firebase user:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error syncing user data',
      error: error.message 
    });
  }
};

// Get current user profile
export const getCurrentUser = async (req, res) => {
  try {
    const { uid } = req.user;
    
    const user = await User.findOne({ firebaseUid: uid }).select('-password');
    
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }
    
    res.json({
      success: true,
      user: {
        _id: user._id,
        firebaseUid: user.firebaseUid,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        role: user.role,
        authProvider: user.authProvider,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    console.error('Error getting current user:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching user data',
      error: error.message 
    });
  }
};

// Update user profile
export const updateUserProfile = async (req, res) => {
  try {
    const { uid } = req.user;
    const { name, avatar } = req.body;
    
    const user = await User.findOne({ firebaseUid: uid });
    
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }
    
    // Update allowed fields
    if (name) user.name = name;
    if (avatar) user.avatar = avatar;
    
    await user.save();
    
    res.json({
      success: true,
      message: 'Profile updated successfully',
      user: {
        _id: user._id,
        firebaseUid: user.firebaseUid,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        role: user.role,
        authProvider: user.authProvider
      }
    });
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error updating profile',
      error: error.message 
    });
  }
};

// Set user role (admin only)
export const setUserRole = async (req, res) => {
  try {
    const { userId, role } = req.body;
    
    if (!['user', 'admin'].includes(role)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid role. Must be either "user" or "admin"' 
      });
    }
    
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }
    
    // Update role in MongoDB
    user.role = role;
    await user.save();
    
    // Update custom claims in Firebase
    await setUserClaims(user.firebaseUid, { role: role });
    
    res.json({
      success: true,
      message: `User role updated to ${role}`,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Error setting user role:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error updating user role',
      error: error.message 
    });
  }
};

// Get all users (admin only)
export const getAllUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    const users = await User.find()
      .select('-password')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    
    const total = await User.countDocuments();
    
    res.json({
      success: true,
      users,
      pagination: {
        current: page,
        total: Math.ceil(total / limit),
        count: users.length,
        totalUsers: total
      }
    });
  } catch (error) {
    console.error('Error getting all users:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching users',
      error: error.message 
    });
  }
};

// Delete user (admin only)
export const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }
    
    // Delete from MongoDB
    await User.findByIdAndDelete(userId);
    
    // Note: We don't delete from Firebase Auth as user might want to continue using other services
    
    res.json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error deleting user',
      error: error.message 
    });
  }
};
