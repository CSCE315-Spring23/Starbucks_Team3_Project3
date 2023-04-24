import React from 'react'
import { useNavigate } from "react-router-dom";

import "../../css/customer_banner.css"

function CustomerBanner({ setSection }) {
  const navigate = useNavigate();

  

  return (
  <div className='banner'>
    <div className='starbucks-logo'>Starbucks Logo</div>
    <div className='weather-time'>Weather and Time</div>
    <div className='change-language'>Change Language</div>
    <div className='login-button' onClick={() => navigate("/login")}>Login Button</div>
  </div>
  )
}

export default CustomerBanner