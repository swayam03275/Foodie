# 🍴 Foodie — Full-Stack Restaurant App

A full-stack web application for browsing, ordering, and managing food items. Built with React (Frontend), Express.js (Backend), MongoDB, and Firebase Authentication, featuring complete Docker support for seamless development and deployment.

![Foodie Homepage](images/foodie-home-light.png)
<sup>Homepage – Light Mode</sup>

---

## 📑 Table of Contents

- [🔧 Tech Stack](#-tech-stack)
- [✨ Key Features](#-key-features)
- [🚀 Quick Start](#-quick-start)
- [📦 Installation](#-installation)
- [⚙️ Environment Setup](#-environment-setup)
- [🔥 Firebase Setup](#-firebase-setup)
- [🐳 Docker Setup](#-docker-setup)
- [📁 Project Structure](#-project-structure)
- [🧪 Development](#-development)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## 🔧 Tech Stack

### 🖥️ Frontend
- **React 18.3** with **Vite**
- **React Router DOM** (routing)
- **Firebase Authentication** (Google, Facebook, Twitter)
- **React Hot Toast** (notifications)
- **Lucide React** (icons)
- **GSAP** (animations)

### 🌐 Backend
- **Node.js + Express**
- **MongoDB** with **Mongoose**
- **Firebase Admin SDK**
- **Razorpay** (payment gateway)
- **Multer** (file uploads)
- **JWT** (authentication)

### 🗄️ Database
- **MongoDB** (primary database)
- **Firebase Firestore** (user profiles)

### 🐳 DevOps
- **Docker & Docker Compose**
- **Multi-stage builds**
- **Environment-based configuration**

---

## ✨ Key Features

- 🔐 **Multi-provider Authentication** (Google, Facebook, Twitter, Email)
- 🥗 **Browse and explore food items**
- 🛒 **Shopping cart and checkout**
- 💳 **Secure payments with Razorpay**
- 👤 **User profiles and order history**
- 🎨 **Responsive design**
- 🏪 **Admin panel for food management**
- 📱 **Mobile-friendly interface**

---

## 🚀 Quick Start

### Prerequisites
- **Docker Desktop** (recommended)
- **Node.js 16+** (for manual setup)
- **MongoDB** (local or cloud)
- **Firebase Project** (for authentication)

### One-Command Setup (Docker)
```bash
git clone https://github.com/Stranger1298/Foodie.git
cd Foodie
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
cp admin/.env.example admin/.env
# Edit .env files with your configurations
docker-compose up --build
```

**Access Points:**
- 🌐 **Frontend**: http://localhost:3000
- 🛠️ **Admin Panel**: http://localhost:5173
- 🔌 **Backend API**: http://localhost:4000

---
## 📦 Installation

### 1. Clone Repository
```bash
git clone https://github.com/Stranger1298/Foodie.git
cd Foodie
```

### 2. Install Dependencies

**Backend:**
```bash
cd backend
npm install
```

**Frontend:**
```bash
cd frontend
npm install
```

**Admin:**
```bash
cd admin
npm install
```

---

## ⚙️ Environment Setup

### 1. Copy Environment Files
```bash
# Backend environment
cp backend/.env.example backend/.env

# Frontend environment
cp frontend/.env.example frontend/.env

# Admin environment
cp admin/.env.example admin/.env
```

### 2. Backend Configuration (`backend/.env`)
```env
# Database
MONGODB_URI=mongodb://localhost:27017/foodie

# Payment Gateway
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_secret

# Authentication
JWT_SECRET=your_super_secret_jwt_key

# Firebase Admin
FIREBASE_PROJECT_ID=your_firebase_project_id
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@project.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYourKey\n-----END PRIVATE KEY-----\n"

# Server
PORT=4000
```

### 3. Frontend Configuration (`frontend/.env`)
```env
# Firebase Web Config
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=sender_id
VITE_FIREBASE_APP_ID=app_id

# API Endpoint
VITE_API_URL=http://localhost:4000
```

### 4. Admin Configuration (`admin/.env`)
```env
# Backend API
VITE_API_URL=http://localhost:4000
NODE_ENV=development
```

---

## 🔥 Firebase Setup

### 1. Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Follow setup wizard

### 2. Enable Authentication
1. Navigate to **Authentication** → **Sign-in method**
2. Enable **Google**, **Facebook**, **Twitter**
3. Add authorized domains: `localhost`, `127.0.0.1`

### 3. Create Web App
1. Go to **Project Settings** → **General**
2. Click "Add app" → **Web**
3. Copy configuration to `frontend/.env`

### 4. Generate Service Account
1. Go to **Project Settings** → **Service accounts**
2. Click "Generate new private key"
3. Download JSON file
4. Extract values for `backend/.env`:
   - `project_id` → `FIREBASE_PROJECT_ID`
   - `client_email` → `FIREBASE_CLIENT_EMAIL`  
   - `private_key` → `FIREBASE_PRIVATE_KEY`

### 5. Setup Firestore
1. Go to **Firestore Database**
2. Create database in test mode
3. Update security rules:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

---

## 🐳 Docker Setup

### Production Setup
```bash
# Start all services
docker-compose up --build

# Run in background
docker-compose up -d

# Stop services
docker-compose down
```

### Development with Docker
```bash
# View logs
docker-compose logs -f backend

# Execute commands in container
docker-compose exec backend npm install new-package

# Restart specific service
docker-compose restart frontend
```

---

## 📁 Project Structure

```
Foodie/
├── frontend/                    # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── FirebaseAuth/   # Authentication components
│   │   │   ├── context/        # React contexts
│   │   │   └── ...
│   │   ├── config/
│   │   │   └── firebase.js     # Firebase configuration
│   │   ├── hooks/              # Custom hooks
│   │   └── pages/              # Page components
│   ├── .env.example
│   └── package.json
├── backend/                     # Express API
│   ├── config/
│   │   ├── db.js              # MongoDB connection
│   │   └── firebase-admin.js   # Firebase Admin
│   ├── controllers/            # Route controllers
│   ├── models/                 # Database models
│   ├── routes/                 # API routes
│   ├── uploads/               # File uploads
│   ├── .env.example
│   └── server.js
├── admin/                      # Admin panel
│   ├── src/
│   ├── .env.example
│   └── package.json
├── docker-compose.yml          # Multi-service setup
└── README.md
```

---

## 🧪 Development

### Manual Development

**Start Backend:**
```bash
cd backend
npm run server    # Development with nodemon
npm start         # Production
```

**Start Frontend:**
```bash
cd frontend
npm run dev       # Development server
npm run build     # Production build
npm run preview   # Preview build
```

**Start Admin:**
```bash
cd admin
npm run dev       # Development server
npm run build     # Production build
```

### Available Scripts

| Service  | Command | Description |
|----------|---------|-------------|
| Backend  | `npm run server` | Start development server |
| Backend  | `npm start` | Start production server |
| Frontend | `npm run dev` | Start Vite dev server |
| Frontend | `npm run build` | Build for production |
| Frontend | `npm run lint` | Run ESLint |
| Admin    | `npm run dev` | Start Vite dev server |
| Admin    | `npm run build` | Build for production |

### Environment Variables Summary

| File | Variables | Purpose |
|------|-----------|---------|
| `backend/.env` | MongoDB, JWT, Firebase Admin, Razorpay | Server configuration |
| `frontend/.env` | Firebase Web Config, API URL | Client configuration |
| `admin/.env` | API URL | Admin panel configuration |

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **⭐ Star this repository** to show support
2. **🐛 Report bugs** via GitHub Issues
3. **💡 Suggest features** through discussions
4. **🔧 Submit pull requests** for improvements

### Development Workflow
1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Make changes and test with Docker: `docker-compose up --build`
4. Commit changes: `git commit -m 'Add amazing feature'`
5. Push to branch: `git push origin feature/amazing-feature`
6. Open a Pull Request

### Code Style
- Use ESLint configuration provided
- Follow existing code patterns
- Add comments for complex logic
- Update documentation as needed

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## � Acknowledgements

- [React](https://reactjs.org/) - Frontend framework
- [Express.js](https://expressjs.com/) - Backend framework
- [MongoDB](https://www.mongodb.com/) - Database
- [Firebase](https://firebase.google.com/) - Authentication & Firestore
- [Vite](https://vitejs.dev/) - Build tool
- [Docker](https://www.docker.com/) - Containerization
- [Razorpay](https://razorpay.com/) - Payment gateway

---

**⚡ Quick Links:**
- 📚 [Firebase Setup Guide](FIREBASE_SETUP.md)
- 🤝 [Contributing Guidelines](CONTRIBUTING.md)
- 🛡️ [Security Policy](SECURITY.md)
- 📝 [Code of Conduct](CODE_OF_CONDUCT.md)

---

<div align="center">
  <h3>Built with ❤️ by the Foodie Team</h3>
  <p>⭐ Star this repo if you found it helpful!</p>
</div>

