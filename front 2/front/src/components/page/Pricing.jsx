import React from 'react'
import Navbar from '../Shared/Navbar'
import Footer from '../Shared/Footer'
import Steps from '../Shared/Steps'
import "./Common.css"
function Pricing() {
  return (
    <>
    
     <Navbar /> 
    <div className="pricing-page pt-10">

    <Steps />
    </div>
     <Footer /> 
    </>
  )
}

export default Pricing