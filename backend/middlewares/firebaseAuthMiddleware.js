import { verifyFirebaseToken, getFirebaseUser } from '../config/firebase-admin.js';

// Firebase authentication middleware
export const firebaseAuthMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ 
        message: 'Access denied. No token provided or invalid format.' 
      });
    }
    
    const idToken = authHeader.substring(7); // Remove 'Bearer ' prefix
    
    // Verify the Firebase ID token
    const decodedToken = await verifyFirebaseToken(idToken);
    
    // Get user information from Firebase
    const userRecord = await getFirebaseUser(decodedToken.uid);
    
    // Attach user information to the request object
    req.user = {
      uid: decodedToken.uid,
      email: decodedToken.email,
      emailVerified: decodedToken.email_verified,
      name: decodedToken.name || userRecord.displayName,
      picture: decodedToken.picture || userRecord.photoURL,
      provider: decodedToken.firebase.sign_in_provider,
      customClaims: decodedToken.customClaims || {},
      role: decodedToken.customClaims?.role || 'user'
    };
    
    next();
  } catch (error) {
    console.error('Firebase auth middleware error:', error);
    return res.status(401).json({ 
      message: 'Access denied. Invalid token.',
      error: error.message 
    });
  }
};

// Optional: Middleware to check if user is admin
export const requireAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Authentication required.' });
  }
  
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access required.' });
  }
  
  next();
};

// Optional: Middleware to check if email is verified
export const requireEmailVerified = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Authentication required.' });
  }
  
  if (!req.user.emailVerified) {
    return res.status(403).json({ 
      message: 'Email verification required. Please verify your email address.' 
    });
  }
  
  next();
};

export default firebaseAuthMiddleware;
