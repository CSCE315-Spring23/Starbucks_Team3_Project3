import React from 'react'
import { useNavigate } from "react-router-dom";
import image from "../../pictures/starbucks-logo-png-25.png"

import "../../css/customer.css"

function CustomerBanner({ setSection }) {
  const navigate = useNavigate();

  

  return (
  <div className='banner'>
    <div className="starbucks-logo" style={{backgroundImage:`url(${image}`}}></div>
    <div className='weather-time'> Weather and Time </div>
    <button className='banner-button'> Change Language </button>
    <button className='banner-button'> Show Menu Board </button>
    <button className='banner-button' onClick={() => navigate("/login")}> Login Button </button>
  </div>
  )
}

export default CustomerBanner