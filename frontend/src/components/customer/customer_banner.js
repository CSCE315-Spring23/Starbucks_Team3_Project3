import React from 'react'
import { useNavigate } from "react-router-dom";

function CustomerBanner({ setSection }) {
  const navigate = useNavigate();
  return (
  <div>
    <div className='starbucks-logo'>Starbucks Logo</div>
    <div className='weather-time'>Weather and Time</div>
    <div className='Home' onClick={() => setSection(0)}>Home</div>
    <div className='login-button' onClick={() => navigate("/login")}>Login Button</div>
  </div>
  )
}

export default CustomerBanner