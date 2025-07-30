import { useState, useEffect, useRef } from 'react';
import './FirebaseLoginPopup.css';
import { assets } from '../../assets/frontend_assets/assets';
import toast, { Toaster } from 'react-hot-toast';
import { useAuth } from '../../hooks/useAuth';
import { 
  Mail, 
  Lock, 
  User, 
  Eye, 
  EyeOff, 
  Chrome,
  Facebook,
  Twitter,
  ArrowRight,
  Shield
} from 'lucide-react';
import PropTypes from 'prop-types';

const FirebaseLoginPopup = ({ setShowLogin }) => {
  const [currState, setCurrState] = useState("Login");
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');

  const popupRef = useRef();
  const { 
    register, 
    login, 
    loginWithGoogle, 
    loginWithFacebook, 
    loginWithTwitter,
    forgotPassword: resetPassword,
    loading 
  } = useAuth();

  // Handle click outside to close popup
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowLogin(false);
      }
    };

    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        setShowLogin(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscapeKey);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [setShowLogin]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return;

    // Validation
    if (!formData.email || !formData.password) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (currState === 'Sign Up' && !formData.name) {
      toast.error('Please enter your name');
      return;
    }

    setIsLoading(true);

    try {
      if (currState === 'Sign Up') {
        await register(formData.email, formData.password, formData.name);
      } else {
        await login(formData.email, formData.password);
      }
      setShowLogin(false);
    } catch (error) {
      console.error('Authentication error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider) => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      switch (provider) {
        case 'google':
          await loginWithGoogle();
          break;
        case 'facebook':
          await loginWithFacebook();
          break;
        case 'twitter':
          await loginWithTwitter();
          break;
        default:
          throw new Error('Invalid provider');
      }
      setShowLogin(false);
    } catch (error) {
      console.error('Social login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (!resetEmail) {
      toast.error('Please enter your email address');
      return;
    }

    try {
      await resetPassword(resetEmail);
      setForgotPassword(false);
      setResetEmail('');
    } catch (error) {
      console.error('Password reset error:', error);
    }
  };

  if (forgotPassword) {
    return (
      <div className='firebase-login-popup'>
        <Toaster />
        <form ref={popupRef} className="firebase-login-container" onSubmit={handleForgotPassword}>
          <div className="firebase-login-header">
            <div className="header-content">
              <Shield className="shield-icon" size={24} />
              <h2>Reset Password</h2>
            </div>
            <img 
              onClick={() => setShowLogin(false)} 
              src={assets.cross_icon} 
              alt="close" 
              className="close-btn"
            />
          </div>

          <p className="reset-description">
            Enter your email address and we&apos;ll send you a link to reset your password.
          </p>

          <div className="firebase-form-group">
            <div className="input-wrapper">
              <Mail className="input-icon" size={18} />
              <input
                type="email"
                placeholder="Enter your email"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="firebase-submit-btn"
            disabled={isLoading}
          >
            {isLoading ? 'Sending...' : 'Send Reset Link'}
            <ArrowRight size={18} />
          </button>

          <button 
            type="button" 
            className="back-to-login-btn"
            onClick={() => setForgotPassword(false)}
          >
            Back to Login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className='firebase-login-popup'>
      <Toaster />
      <form ref={popupRef} className="firebase-login-container" onSubmit={handleSubmit}>
        <div className="firebase-login-header">
          <div className="header-content">
            <User className="user-icon" size={24} />
            <h2>{currState}</h2>
          </div>
          <img 
            onClick={() => setShowLogin(false)} 
            src={assets.cross_icon} 
            alt="close" 
            className="close-btn"
          />
        </div>

        <div className="social-login-section">
          <button 
            type="button" 
            className="social-btn google-btn"
            onClick={() => handleSocialLogin('google')}
            disabled={isLoading}
          >
            <Chrome size={18} />
            Continue with Google
          </button>
          
          <button 
            type="button" 
            className="social-btn facebook-btn"
            onClick={() => handleSocialLogin('facebook')}
            disabled={isLoading}
          >
            <Facebook size={18} />
            Continue with Facebook
          </button>
          
          <button 
            type="button" 
            className="social-btn twitter-btn"
            onClick={() => handleSocialLogin('twitter')}
            disabled={isLoading}
          >
            <Twitter size={18} />
            Continue with Twitter
          </button>
        </div>

        <div className="divider">
          <span>or</span>
        </div>

        <div className="firebase-form-inputs">
          {currState === "Sign Up" && (
            <div className="firebase-form-group">
              <div className="input-wrapper">
                <User className="input-icon" size={18} />
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          )}

          <div className="firebase-form-group">
            <div className="input-wrapper">
              <Mail className="input-icon" size={18} />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="firebase-form-group">
            <div className="input-wrapper">
              <Lock className="input-icon" size={18} />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button 
            type="submit" 
            className="firebase-submit-btn"
            disabled={isLoading || loading}
          >
            {isLoading || loading ? 'Please wait...' : 
             currState === 'Sign Up' ? 'Create Account' : 'Sign In'}
            <ArrowRight size={18} />
          </button>

          {currState === "Login" && (
            <button 
              type="button" 
              className="forgot-password-btn"
              onClick={() => setForgotPassword(true)}
            >
              Forgot Password?
            </button>
          )}
        </div>

        <div className="firebase-terms">
          <input type="checkbox" id="terms" required />
          <label htmlFor="terms">
            I agree to the <span>Terms of Service</span> and <span>Privacy Policy</span>
          </label>
        </div>

        <div className="firebase-switch-mode">
          {currState === "Login" ? (
            <p>Don&apos;t have an account? 
              <span onClick={() => setCurrState("Sign Up")}> Sign Up</span>
            </p>
          ) : (
            <p>Already have an account? 
              <span onClick={() => setCurrState("Login")}> Sign In</span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

FirebaseLoginPopup.propTypes = {
  setShowLogin: PropTypes.func.isRequired
};

export default FirebaseLoginPopup;
