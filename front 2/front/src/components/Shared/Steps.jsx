import React, { useState } from 'react';
import { useUser } from '@clerk/clerk-react'; // Use useUser instead of useAuth
import axios from 'axios';
import Modal from '../Shared/Modal';
import "./Pricing.css";

const Steps = () => {
  const { isLoaded, isSignedIn, user } = useUser(); // Correctly use useUser
  const [showModal, setShowModal] = useState(false);

  const handlePurchase = async (plan) => {
    if (!isLoaded) {
      console.error('User state is not loaded yet.');
      return;
    }

    if (!isSignedIn) {
      setShowModal(true);
      return;
    }

    if (!user) {
      console.error('User object is not defined:', user);
      return;
    }

    const userData = {
      userId: user.id,
      email: user.emailAddresses[0]?.emailAddress,
      fullName: `${user.firstName} ${user.lastName}`,
    };

    try {
      const response = await axios.post('http://localhost:5000/api/initiate-payment', {
        user: userData,
        plan,
      });

      if (response.data.success) {
        window.location.href = response.data.checkoutUrl;
      } else {
        alert('Failed to initiate payment.');
      }
    } catch (error) {
      console.error('Error initiating payment:', error);
      alert('An error occurred while initiating payment.');
    }
  };

  const closeModal = () => setShowModal(false);

  return (
    <div className="pricing">
      <h3><span id='pricing-heading'>Pricing</span></h3>
      <h2>Simple, transparent pricing</h2>
      <div className='pricing-main'>
        <div className="pricing-container">
          <div className="pricing-card" onClick={() => handlePurchase('basic')}>
            <h3>BASIC PLAN</h3>
            <h2>Rs 99.00/-</h2>
            <p>Yearly access to our basic plans</p>
            <button className="pricing-button">Get Started</button>
          </div>
          <div className="pricing-card" onClick={() => handlePurchase('premium')}>
            <h3>PREMIUM PLAN</h3>
            <h2>Rs 499.00/-</h2>
            <p>Lifetime access to our premium plans</p>
            <button className="pricing-button">Get Started</button>
          </div>
        </div>
      </div>
      {showModal && (
        <Modal onClose={closeModal}>
          <h2>Please Log In</h2>
          <p>You need to be logged in to make a purchase.</p>
          <button onClick={closeModal}>Close</button>
        </Modal>
      )}
    </div>
  );
};

export default Steps;
