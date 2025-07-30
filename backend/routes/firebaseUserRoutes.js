import express from 'express';
import { 
  syncFirebaseUser, 
  getCurrentUser, 
  updateUserProfile, 
  setUserRole, 
  getAllUsers, 
  deleteUser 
} from '../controllers/firebaseUserController.js';
import { 
  firebaseAuthMiddleware, 
  requireAdmin 
} from '../middlewares/firebaseAuthMiddleware.js';

const router = express.Router();

// Public routes (no authentication required)
// None for Firebase users as authentication is handled by Firebase

// Protected routes (require Firebase authentication)
router.use(firebaseAuthMiddleware); // Apply Firebase auth middleware to all routes below

// User profile routes
router.post('/sync', syncFirebaseUser); // Sync Firebase user with MongoDB
router.get('/profile', getCurrentUser); // Get current user profile
router.put('/profile', updateUserProfile); // Update user profile

// Admin routes
router.use(requireAdmin); // Apply admin middleware to routes below

router.get('/users', getAllUsers); // Get all users (admin only)
router.put('/users/role', setUserRole); // Set user role (admin only)
router.delete('/users/:userId', deleteUser); // Delete user (admin only)

export default router;
