// components/page/Login.jsx
import React from 'react';
import { SignIn, useAuth } from '@clerk/clerk-react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../Shared/Navbar';
import Footer from '../Shared/Footer';
import authimg from "../../../public/images/authimg.png"
import "./Auth.css"

function Login() {
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  if (isSignedIn) {
    // Redirect if already signed in
    navigate(from, { replace: true });
    return null;
  }

  return (
    <>
      <Navbar />
      <div className="login-main">
        <div className="auth-container">
          <div className="auth-form">
        <SignIn 
        className="auth-form"
          path="/login" 
          routing="path" 
          afterSignInUrl={from} // Redirect to the original path after sign-in
          redirectUrl={from} // Ensure the redirect URL is preserved
        />
            </div>        

        <div className="auth-image">
          <img src={authimg} alt="" srcset="" />
        </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Login;
