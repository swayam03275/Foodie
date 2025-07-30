# Firebase Authentication Setup for Foodie App 🔥

This document provides step-by-step instructions to set up Firebase Authentication in your Foodie application.

## 🚀 Features Added

- **Multiple Authentication Methods**:
  - Email/Password authentication
  - Google Sign-In
  - Facebook Login
  - Twitter Authentication
  
- **Beautiful UI Components**:
  - Modern Firebase login popup with gradient design
  - Enhanced navbar with user dropdown
  - Responsive design for all devices
  - Dark theme support

- **Backend Integration**:
  - Firebase Admin SDK integration
  - User data synchronization with MongoDB
  - Protected routes with Firebase middleware
  - Role-based access control

## 📋 Prerequisites

1. Node.js and npm installed
2. A Firebase project
3. MongoDB database
4. Google, Facebook, Twitter developer accounts (for social login)

## 🔧 Setup Instructions

### Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or "Add project"
3. Enter your project name (e.g., "foodie-app")
4. Enable Google Analytics (optional)
5. Click "Create project"

### Step 2: Enable Authentication Methods

1. In Firebase Console, go to **Authentication** > **Sign-in method**
2. Enable the following providers:
   - **Email/Password**: Click to enable
   - **Google**: Enable and add your domain
   - **Facebook**: Enable and add App ID & App Secret
   - **Twitter**: Enable and add API Key & API Secret

### Step 3: Get Firebase Configuration

1. Go to **Project Settings** (gear icon)
2. Scroll down to "Your apps"
3. Click "Web" icon to add a web app
4. Register your app with a nickname
5. Copy the Firebase config object

### Step 4: Configure Frontend Environment

1. Open `frontend/.env` file
2. Replace the placeholder values with your Firebase config:

```env
VITE_FIREBASE_API_KEY=your-actual-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abcdef123456789
```

### Step 5: Generate Firebase Admin Service Account

1. In Firebase Console, go to **Project Settings** > **Service accounts**
2. Click "Generate new private key"
3. Download the JSON file
4. Choose one of these options:

**Option A: Using Service Account File (Recommended)**
```env
GOOGLE_APPLICATION_CREDENTIALS=path/to/your/serviceAccountKey.json
```

**Option B: Using Environment Variables**
```env
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project-id.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour-Private-Key-Here\n-----END PRIVATE KEY-----\n"
```

### Step 6: Configure Social Authentication

#### Google Sign-In
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your Firebase project
3. Enable Google+ API
4. Configure OAuth consent screen
5. Add authorized domains

#### Facebook Login
1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Create a new app
3. Add Facebook Login product
4. Configure Valid OAuth Redirect URIs
5. Copy App ID and App Secret to Firebase

#### Twitter Authentication
1. Go to [Twitter Developer Portal](https://developer.twitter.com/)
2. Create a new app
3. Generate API Key and API Secret
4. Configure callback URLs
5. Copy credentials to Firebase

### Step 7: Update Backend Environment

1. Open `backend/.env` file
2. Add Firebase Admin configuration:

```env
# Firebase Admin Configuration
FIREBASE_PROJECT_ID=your-firebase-project-id
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project-id.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour-Firebase-Private-Key-Here\n-----END PRIVATE KEY-----\n"
```

## 🏃‍♂️ Running the Application

### Start Backend Server
```bash
cd backend
npm install firebase-admin  # If not already installed
npm start
```

### Start Frontend Development Server
```bash
cd frontend
npm install firebase  # If not already installed
npm run dev
```

## 🎯 Using Firebase Authentication

### Switching Between Auth Systems

In `frontend/src/main.jsx`, you can switch between the original auth and Firebase auth:

```javascript
// Set to true for Firebase auth, false for original auth
const USE_FIREBASE_AUTH = true;
```

### Testing the Implementation

1. **Sign Up**: Create a new account with email/password
2. **Social Login**: Test Google, Facebook, and Twitter login
3. **Password Reset**: Use the "Forgot Password" feature
4. **User Profile**: Check the user dropdown in navbar
5. **Admin Features**: Test role-based access control

## 🔒 Security Features

- **Token Verification**: All API requests are verified with Firebase ID tokens
- **Role-Based Access**: Admin and user roles with different permissions
- **Email Verification**: Optional email verification requirement
- **Secure Headers**: Proper CORS and security headers
- **Data Validation**: Input validation on both frontend and backend

## 🎨 UI Features

- **Modern Design**: Beautiful gradients and animations
- **Responsive**: Works on desktop, tablet, and mobile
- **Dark Theme**: Automatic dark mode support
- **Loading States**: Proper loading indicators
- **Error Handling**: User-friendly error messages
- **Toast Notifications**: Real-time feedback

## 🐛 Troubleshooting

### Common Issues

1. **Firebase Config Error**
   - Ensure all environment variables are set correctly
   - Check that Firebase project is active

2. **Social Login Not Working**
   - Verify OAuth redirect URIs are configured
   - Check that social apps are published (not in development mode)

3. **Backend Authentication Errors**
   - Verify Firebase Admin SDK credentials
   - Check that Firebase project ID matches

4. **CORS Issues**
   - Add your domain to Firebase authorized domains
   - Check CORS configuration in backend

### Getting Help

If you encounter any issues:
1. Check the browser console for errors
2. Verify environment variables are loaded
3. Test with a simple email/password signup first
4. Check Firebase Console for authentication logs

## 📚 Additional Resources

- [Firebase Authentication Documentation](https://firebase.google.com/docs/auth)
- [Firebase Admin SDK Documentation](https://firebase.google.com/docs/admin/setup)
- [React Firebase Hooks](https://github.com/CSFrequency/react-firebase-hooks)

## 🎉 Congratulations!

You now have a fully functional Firebase authentication system integrated with your Foodie app! Users can sign up with multiple providers and enjoy a seamless authentication experience.

---

**Note**: Remember to keep your Firebase credentials secure and never commit them to version control. Use environment variables for all sensitive data.
