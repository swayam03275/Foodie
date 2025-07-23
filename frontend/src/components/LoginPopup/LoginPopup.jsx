import React, { useState, useEffect, useRef } from 'react';
import './LoginPopup.css';
import { assets } from '../../assets/frontend_assets/assets';

const LoginPopup = ({ setShowLogin }) => {
  const [currState, setCurrState] = useState("Sign Up");
  const popupRef = useRef();

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

  return (
    <div className='LoginPopup'>
      <form ref={popupRef} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="close" />
        </div>
        <div className="login-popup-inputs">
          {currState === "Login" ? null : <input type="text" placeholder='Your Name' required />}
          <input type="email" placeholder='Your Email' required />
          <input type="password" placeholder='Your Password' required />
        </div>
        <button type="submit">{currState === 'Sign Up' ? "Create Account" : "Login"}</button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
        {currState === "Login" ? (
          <p>Create a new account? <span onClick={() => setCurrState("Sign Up")}>Click Here</span></p>
        ) : (
          <p>Already have an account? <span onClick={() => setCurrState("Login")}>Login Here</span></p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
