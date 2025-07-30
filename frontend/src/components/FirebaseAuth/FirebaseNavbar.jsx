import { useContext, useState } from "react";
import "./FirebaseNavbar.css";
import { Link } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";
import { assets } from "../../assets/frontend_assets/assets";
import { ThemeContext } from "../context/ThemeContext";
import { useAuth } from "../../hooks/useAuth";
import {
  Home,
  Menu,
  Smartphone,
  Heart,
  Phone,
  ShoppingCart,
  User,
  Sun,
  Moon,
  X,
  AlignJustify,
  Utensils,
  HelpCircle,
  LogOut,
  Settings,
  Bell
} from "lucide-react";
import PropTypes from 'prop-types';

const FirebaseNavbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const { getTotalCartAmount } = useContext(StoreContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { currentUser, logout, isAuthenticated } = useAuth();

  const toggleMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  const toggleUserMenu = () => {
    setUserMenuOpen((prev) => !prev);
  };

  const toggleNotifications = () => {
    setNotificationOpen((prev) => !prev);
  };

  const handleLogout = async () => {
    try {
      await logout();
      setUserMenuOpen(false);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const getUserDisplayName = () => {
    if (currentUser) {
      return currentUser.displayName || currentUser.email?.split('@')[0] || 'User';
    }
    return 'Guest';
  };

  const getUserAvatar = () => {
    if (currentUser?.photoURL) {
      return currentUser.photoURL;
    }
    
    // Generate a nice default avatar based on user name
    const name = getUserDisplayName();
    const colors = [
      '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57',
      '#ff9ff3', '#54a0ff', '#5f27cd', '#00d2d3', '#ff6348',
      '#2ed573', '#3742fa', '#f368e0', '#ff5722', '#795548'
    ];
    
    // Simple hash function to pick consistent color based on name
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const colorIndex = Math.abs(hash) % colors.length;
    const backgroundColor = colors[colorIndex];
    
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=${backgroundColor.slice(1)}&color=fff&rounded=true&bold=true&size=128`;
  };

  return (
    <div className={`firebase-navbar ${theme === "dark" ? "navbar-dark" : ""}`}>
      {/* Logo Section */}
      <Link to="/" className="navbar-logo">
        <img src={assets.logo} alt="Foodie" className="logo" />
      </Link>

      {/* Desktop Menu */}
      <ul className={`navbar-menu ${mobileMenuOpen ? "open" : ""}`}>
        <li className="mobile-menu-header">
          <span>Navigation</span>
          <X size={24} onClick={toggleMenu} />
        </li>
        <a
          href="#header"
          onClick={() => setMenu("home")}
          className={`nav-item ${menu === "home" ? "active" : ""}`}
        >
          <Home size={18} />
          <span>Home</span>
        </a>
        <a
          href="#explore-menu"
          onClick={() => setMenu("menu")}
          className={`nav-item ${menu === "menu" ? "active" : ""}`}
        >
          <Menu size={18} />
          <span>Menu</span>
        </a>
        <a
          href="#appdownload"
          onClick={() => setMenu("mobile-app")}
          className={`nav-item ${menu === "mobile-app" ? "active" : ""}`}
        >
          <Smartphone size={18} />
          <span>Mobile App</span>
        </a>
        <Link to="/wishlist" className="nav-item">
          <Heart size={18} />
          <span>Wishlist</span>
        </Link>
        <a
          href="#footer"
          onClick={() => setMenu("contact-us")}
          className={`nav-item ${menu === "contact-us" ? "active" : ""}`}
        >
          <Phone size={18} />
          <span>Contact</span>
        </a>
        <a
          href="#faq"
          onClick={() => setMenu("faq")}
          className={`nav-item ${menu === "faq" ? "active" : ""}`}
        >
          <HelpCircle size={18} />
          <span>FAQ</span>
        </a>
      </ul>

      {/* Right Section */}
      <div className="navbar-right">
        {/* Theme Toggle */}
        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* Notifications (for authenticated users) */}
        {isAuthenticated && (
          <div className="notification-wrapper">
            <button className="notification-btn" onClick={toggleNotifications}>
              <Bell size={18} />
              <span className="notification-badge">3</span>
            </button>

            {notificationOpen && (
              <div className="notification-dropdown">
                <div className="notification-header">
                  <h4>Notifications</h4>
                  <button className="mark-all-read">Mark all as read</button>
                </div>
                
                <div className="notification-list">
                  <div className="notification-item unread">
                    <div className="notification-icon">🍕</div>
                    <div className="notification-content">
                      <p className="notification-title">Order Delivered!</p>
                      <p className="notification-text">Your pizza order has been delivered successfully.</p>
                      <span className="notification-time">2 minutes ago</span>
                    </div>
                  </div>
                  
                  <div className="notification-item unread">
                    <div className="notification-icon">🎉</div>
                    <div className="notification-content">
                      <p className="notification-title">Welcome to Foodie!</p>
                      <p className="notification-text">Thanks for joining us. Explore our delicious menu.</p>
                      <span className="notification-time">1 hour ago</span>
                    </div>
                  </div>
                  
                  <div className="notification-item">
                    <div className="notification-icon">💰</div>
                    <div className="notification-content">
                      <p className="notification-title">Special Offer</p>
                      <p className="notification-text">Get 20% off on your next order. Limited time!</p>
                      <span className="notification-time">3 hours ago</span>
                    </div>
                  </div>
                </div>
                
                <div className="notification-footer">
                  <button className="view-all-btn">View All Notifications</button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Cart */}
        <div className="navbar-cart">
          <Link to="/cart" className="icon-button">
            <ShoppingCart size={18} />
            <div className={getTotalCartAmount() === 0 ? "" : "cart-dot"}></div>
          </Link>
        </div>

        {/* User Section */}
        {isAuthenticated ? (
          <div className="user-menu-wrapper">
            <button className="user-avatar-btn" onClick={toggleUserMenu}>
              <img 
                src={getUserAvatar()} 
                alt={getUserDisplayName()}
                className="user-avatar"
              />
              <span className="user-name">{getUserDisplayName()}</span>
            </button>

            {userMenuOpen && (
              <div className="user-dropdown">
                <div className="user-info">
                  <img 
                    src={getUserAvatar()} 
                    alt={getUserDisplayName()}
                    className="dropdown-avatar"
                  />
                  <div className="user-details">
                    <span className="user-name-full">{getUserDisplayName()}</span>
                    <span className="user-email">{currentUser?.email}</span>
                  </div>
                </div>
                
                <div className="dropdown-divider"></div>
                
                <button className="dropdown-item">
                  <User size={16} />
                  <span>Profile</span>
                </button>
                
                <button className="dropdown-item">
                  <Settings size={16} />
                  <span>Settings</span>
                </button>
                
                <Link to="/orders" className="dropdown-item">
                  <Utensils size={16} />
                  <span>My Orders</span>
                </Link>
                
                <div className="dropdown-divider"></div>
                
                <button className="dropdown-item logout-item" onClick={handleLogout}>
                  <LogOut size={16} />
                  <span>Sign Out</span>
                </button>
              </div>
            )}
          </div>
        ) : (
          <button className="signin-button" onClick={() => setShowLogin(true)}>
            <User size={16} />
            <span>Sign In</span>
          </button>
        )}

        {/* Mobile Menu Toggle */}
        <div className="hamburger" onClick={toggleMenu}>
          <AlignJustify size={24} />
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && <div className="mobile-overlay" onClick={toggleMenu}></div>}
      
      {/* User Menu Overlay */}
      {userMenuOpen && <div className="user-menu-overlay" onClick={toggleUserMenu}></div>}
      
      {/* Notification Overlay */}
      {notificationOpen && <div className="notification-overlay" onClick={toggleNotifications}></div>}
    </div>
  );
};

FirebaseNavbar.propTypes = {
  setShowLogin: PropTypes.func.isRequired
};

export default FirebaseNavbar;
