import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import image from "../../pictures/starbucks-logo-png-25.png"

import "../../css/customer.css"

function CustomerBanner({ setSection }) {
  const navigate = useNavigate();
  const [showTranslate, setShowTranslate] = useState(false);
  const [weather, setWeather] = useState({'main': 'cloudy', 'temp': 97})

  {/* Code below will toggle the google translate widget on click*/ }
  const HandleTranslateClick = () => {
    const wrapper = document.getElementById('google_translate_wrapper');
    if (wrapper) {
      wrapper.style.display = wrapper.style.display === 'none' ? 'block' : 'none';
    }
  };

    // const [value, setValue] = useState([]);
    // useEffect(() => {
    //   fetch("http://localhost:5000/weather/77840")
    //   .then(response => response.json())
    //   .then(result => setWeather(result))
    // }, [])


  
  return (
    <div className='banner'>
      <div className="starbucks-logo" style={{ backgroundImage: `url(${image}` }}></div>
      <div className='weather-time'> {weather.main} | Temperature: {weather.temp}
      </div>
      <button className='banner-button' onClick={HandleTranslateClick}> Change Language </button>
      {showTranslate && (
          <div className="google-translate" id="google_translate_element"></div>
      )}
      <button className='banner-button'> Show Menu Board </button>
      <button className='banner-button' onClick={() => navigate("/login")}> Login Button </button>
      {/* Code below makes the translation widget visible when Change Language button is clicked */}

    </div>
  )
}

export default CustomerBanner