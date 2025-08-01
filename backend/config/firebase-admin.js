// Firebase Admin SDK configuration
import admin from 'firebase-admin';

// Initialize Firebase Admin SDK
const initializeFirebaseAdmin = () => {
  try {
    // Check if Firebase Admin is already initialized
    if (admin.apps.length === 0) {
      // For production, use service account key
      // For development, you can use the environment variables
      
      if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
        // Using service account key file
        admin.initializeApp({
          credential: admin.credential.applicationDefault(),
          projectId: process.env.FIREBASE_PROJECT_ID
        });
      } else if (process.env.FIREBASE_PRIVATE_KEY) {
        // Using environment variables
        admin.initializeApp({
          credential: admin.credential.cert({
            projectId: process.env.FIREBASE_PROJECT_ID,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
          }),
          projectId: process.env.FIREBASE_PROJECT_ID
        });
      } else {
        console.warn('Firebase Admin not initialized: Missing credentials');
        return null;
      }
      
      console.log('Firebase Admin initialized successfully');
    }
    
    return admin;
  } catch (error) {
    console.error('Error initializing Firebase Admin:', error);
    return null;
  }
};

// Verify Firebase ID token
export const verifyFirebaseToken = async (idToken) => {
  try {
    const firebaseAdmin = initializeFirebaseAdmin();
    if (!firebaseAdmin) {
      throw new Error('Firebase Admin not initialized');
    }
    
    const decodedToken = await firebaseAdmin.auth().verifyIdToken(idToken);
    return decodedToken;
  } catch (error) {
    throw new Error('Invalid token: ' + error.message);
  }
};

// Get user by UID
export const getFirebaseUser = async (uid) => {
  try {
    const firebaseAdmin = initializeFirebaseAdmin();
    if (!firebaseAdmin) {
      throw new Error('Firebase Admin not initialized');
    }
    
    const userRecord = await firebaseAdmin.auth().getUser(uid);
    return userRecord;
  } catch (error) {
    throw new Error('User not found: ' + error.message);
  }
};

// Create custom token
export const createCustomToken = async (uid, additionalClaims = {}) => {
  try {
    const firebaseAdmin = initializeFirebaseAdmin();
    if (!firebaseAdmin) {
      throw new Error('Firebase Admin not initialized');
    }
    
    const customToken = await firebaseAdmin.auth().createCustomToken(uid, additionalClaims);
    return customToken;
  } catch (error) {
    throw new Error('Error creating custom token: ' + error.message);
  }
};

// Update user claims
export const setUserClaims = async (uid, customClaims) => {
  try {
    const firebaseAdmin = initializeFirebaseAdmin();
    if (!firebaseAdmin) {
      throw new Error('Firebase Admin not initialized');
    }
    
    await firebaseAdmin.auth().setCustomUserClaims(uid, customClaims);
    return true;
  } catch (error) {
    throw new Error('Error setting user claims: ' + error.message);
  }
};

export default initializeFirebaseAdmin;
