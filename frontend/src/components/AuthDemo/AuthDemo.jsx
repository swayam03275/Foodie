import { useAuth } from '../../hooks/useAuth';
import './AuthDemo.css';
import { User, Shield, Mail, Calendar, Globe } from 'lucide-react';

const AuthDemo = () => {
  const { currentUser, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="auth-demo">
        <div className="demo-card">
          <div className="demo-header">
            <Shield className="demo-icon" />
            <h3>Firebase Authentication</h3>
          </div>
          <p>Sign in to see your authentication details and Firebase integration features.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-demo">
      <div className="demo-card">
        <div className="demo-header">
          <User className="demo-icon" />
          <h3>Welcome, {currentUser?.displayName || 'User'}!</h3>
        </div>
        
        <div className="user-info">
          <div className="info-item">
            <Mail size={16} />
            <span>Email: {currentUser?.email}</span>
          </div>
          
          <div className="info-item">
            <Globe size={16} />
            <span>UID: {currentUser?.uid?.substring(0, 20)}...</span>
          </div>
          
          <div className="info-item">
            <Shield size={16} />
            <span>Email Verified: {currentUser?.emailVerified ? '✅' : '❌'}</span>
          </div>
          
          <div className="info-item">
            <Calendar size={16} />
            <span>Created: {new Date(currentUser?.metadata?.creationTime).toLocaleDateString()}</span>
          </div>
        </div>

        <div className="provider-info">
          <h4>Authentication Provider</h4>
          <div className="provider-badge">
            {currentUser?.providerData?.[0]?.providerId || 'email'}
          </div>
        </div>

        {currentUser?.photoURL && (
          <div className="user-avatar-section">
            <img 
              src={currentUser.photoURL} 
              alt="User Avatar" 
              className="demo-avatar"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthDemo;
