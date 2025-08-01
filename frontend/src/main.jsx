import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {BrowserRouter} from 'react-router-dom'
import StoreContextProvider from './components/context/StoreContext.jsx'

// Import both versions
import App from './App.jsx' // Original App
import FirebaseApp from './FirebaseApp.jsx' // Firebase-enhanced App

// Configuration flag - set to true to use Firebase auth, false for original
const USE_FIREBASE_AUTH = true;

// Choose which app to render
const AppComponent = USE_FIREBASE_AUTH ? FirebaseApp : App;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <StoreContextProvider>
        <AppComponent />
      </StoreContextProvider>
    </BrowserRouter>
  </StrictMode>
)
