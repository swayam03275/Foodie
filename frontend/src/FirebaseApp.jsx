import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Firebase Components
import { AuthProvider } from "./components/context/AuthContext";
import FirebaseNavbar from "./components/FirebaseAuth/FirebaseNavbar";
import FirebaseLoginPopup from "./components/FirebaseAuth/FirebaseLoginPopup";

// Existing Components
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Footer from "./components/Footer/Footer";
import AppDownload from "./components/AppDownlad/AppDownload";
import ThemeContextProvider from "./components/context/ThemeContext";
import FoodDetail from "./components/FoodDetail/FoodDetail";
import SearchBar from "./components/SearchBar/SearchBar";
import CartSummaryBar from "./components/CartSummaryBar/CartSummaryBar";
import ScrollToTopButton from "./components/ScrollToTopButton/ScrollToTopButton";
import Wishlist from "./pages/wishlist/wishlist";
import Restaurants from "./pages/Restaurants/Restaurants";
import Chatbot from "./components/Chatbot/Chatbot";
import FAQ from "./components/FAQ/FAQ";
import LoadingAnimation from './components/LoadingAnimation';

const FirebaseApp = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingAnimation />;
  }

  return (
    <AuthProvider>
      <ThemeContextProvider>
        <>
          <Toaster 
            position="top-right" 
            reverseOrder={false}
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
                borderRadius: '12px',
                padding: '16px',
                fontSize: '14px',
                boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)'
              },
              success: {
                iconTheme: {
                  primary: '#10B981',
                  secondary: '#fff',
                },
              },
              error: {
                iconTheme: {
                  primary: '#EF4444',
                  secondary: '#fff',
                },
              },
            }}
          />
          
          {showLogin && <FirebaseLoginPopup setShowLogin={setShowLogin} />}
          
          <div className="app">
            <FirebaseNavbar setShowLogin={setShowLogin} />
            <SearchBar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/order" element={<PlaceOrder />} />
              <Route path="/food/:id" element={<FoodDetail />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/restaurants" element={<Restaurants />} />
            </Routes>
             
            <ScrollToTopButton />
            <CartSummaryBar />
            <AppDownload />
            <FAQ />
            <Footer />
            <Chatbot />
          </div>
        </>
      </ThemeContextProvider>
    </AuthProvider>
  );
};

export default FirebaseApp;
