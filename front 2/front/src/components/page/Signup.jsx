import React from 'react'
import Navbar from '../Shared/Navbar'
import Footer from '../Shared/Footer'
import { SignUp } from '@clerk/clerk-react'
import authimg from "../../../public/images/authimg.png"
import "./Auth.css"
function Signup() {
  return (
    <>
    <Navbar />
    <div className='login-main'>
    <div className="auth-container">
    <div className="auth-form">
        <SignUp path="/signup" routing="path" />
        </div>        

<div className="auth-image">
  <img src={authimg} alt="" srcset="" />
</div>
</div>
</div>
    <Footer />
    </>
  )
}

export default Signup