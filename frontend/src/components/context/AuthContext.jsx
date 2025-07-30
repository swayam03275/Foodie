import { createContext, useEffect, useState } from 'react';
import { 
  auth, 
  createUserAccount, 
  signInUser, 
  signInWithGoogle, 
  signInWithFacebook,
  signInWithTwitter,
  logoutUser, 
  resetPassword 
} from '../../config/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import toast from 'react-hot-toast';
import PropTypes from 'prop-types';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  // Auth state observer
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // Register user with email and password
  const register = async (email, password, displayName) => {
    try {
      setAuthError(null);
      setLoading(true);
      const user = await createUserAccount(email, password, displayName);
      toast.success('Account created successfully!');
      return user;
    } catch (error) {
      const errorMessage = getErrorMessage(error.code);
      setAuthError(errorMessage);
      toast.error(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Sign in user with email and password
  const login = async (email, password) => {
    try {
      setAuthError(null);
      setLoading(true);
      const user = await signInUser(email, password);
      toast.success('Logged in successfully!');
      return user;
    } catch (error) {
      const errorMessage = getErrorMessage(error.code);
      setAuthError(errorMessage);
      toast.error(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Sign in with Google
  const loginWithGoogle = async () => {
    try {
      setAuthError(null);
      setLoading(true);
      const user = await signInWithGoogle();
      toast.success('Logged in with Google successfully!');
      return user;
    } catch (error) {
      const errorMessage = getErrorMessage(error.code);
      setAuthError(errorMessage);
      toast.error(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Sign in with Facebook
  const loginWithFacebook = async () => {
    try {
      setAuthError(null);
      setLoading(true);
      const user = await signInWithFacebook();
      toast.success('Logged in with Facebook successfully!');
      return user;
    } catch (error) {
      const errorMessage = getErrorMessage(error.code);
      setAuthError(errorMessage);
      toast.error(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Sign in with Twitter
  const loginWithTwitter = async () => {
    try {
      setAuthError(null);
      setLoading(true);
      const user = await signInWithTwitter();
      toast.success('Logged in with Twitter successfully!');
      return user;
    } catch (error) {
      const errorMessage = getErrorMessage(error.code);
      setAuthError(errorMessage);
      toast.error(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Logout user
  const logout = async () => {
    try {
      setAuthError(null);
      await logoutUser();
      toast.success('Logged out successfully!');
    } catch (error) {
      const errorMessage = getErrorMessage(error.code);
      setAuthError(errorMessage);
      toast.error(errorMessage);
      throw error;
    }
  };

  // Reset password
  const forgotPassword = async (email) => {
    try {
      setAuthError(null);
      await resetPassword(email);
      toast.success('Password reset email sent!');
    } catch (error) {
      const errorMessage = getErrorMessage(error.code);
      setAuthError(errorMessage);
      toast.error(errorMessage);
      throw error;
    }
  };

  // Helper function to get user-friendly error messages
  const getErrorMessage = (errorCode) => {
    switch (errorCode) {
      case 'auth/user-not-found':
        return 'No account found with this email address.';
      case 'auth/wrong-password':
        return 'Incorrect password. Please try again.';
      case 'auth/email-already-in-use':
        return 'An account with this email already exists.';
      case 'auth/weak-password':
        return 'Password should be at least 6 characters long.';
      case 'auth/invalid-email':
        return 'Please enter a valid email address.';
      case 'auth/user-disabled':
        return 'This account has been disabled.';
      case 'auth/too-many-requests':
        return 'Too many failed attempts. Please try again later.';
      case 'auth/network-request-failed':
        return 'Network error. Please check your connection.';
      case 'auth/popup-closed-by-user':
        return 'Sign-in popup was closed. Please try again.';
      case 'auth/cancelled-popup-request':
        return 'Another popup is already open. Please close it and try again.';
      case 'auth/popup-blocked':
        return 'Pop-up blocked by browser. Please allow pop-ups and try again.';
      default:
        return 'An error occurred. Please try again.';
    }
  };

  const value = {
    currentUser,
    loading,
    authError,
    register,
    login,
    loginWithGoogle,
    loginWithFacebook,
    loginWithTwitter,
    logout,
    forgotPassword,
    isAuthenticated: !!currentUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default AuthContext;
