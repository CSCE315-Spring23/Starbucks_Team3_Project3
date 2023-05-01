import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import image from "../../pictures/starbucks-logo-png-25.png"

function CustomerBanner({ setSection }) {
  const navigate = useNavigate();
  const [showTranslate, setShowTranslate] = useState(false);
  const [weather, setWeather] = useState({'name': 'College Station', 'main': 'cloudy', 'temp': 83})

  {/* Code below will toggle the Google Translate widget on click*/ }
  const HandleTranslateClick = () => {
    const wrapper = document.getElementById('google_translate_wrapper');
    if (wrapper) {
      wrapper.style.display = wrapper.style.display === 'none' ? 'block' : 'none';
    }
  };

  const loginWithGoogle = () => {
    console.log("login with google")
    window.location.replace("http://localhost:5000/login");
  }

    // const [value, setValue] = useState([]);
    // useEffect(() => {
    //   fetch("http://localhost:5000/weather/77840")
    //   .then(response => response.json())
    //   .then(result => setWeather(result))
    // }, [])
  
  return (
    <div className='banner'>
      <div className="starbucks-logo" style={{ backgroundImage: `url(${image}` }}></div>
      <div className='weather-time'> {weather.name} | {weather.main} | Temperature: {weather.temp}
      </div>

      <button className='button'> Show Full Menu </button>

      <button className='button' onClick={() => loginWithGoogle()}> Login Button </button>

      <button className='button' onClick={HandleTranslateClick}> Change Language </button>
      {showTranslate && (
        <div className="google-translate" id="google_translate_element"></div>
      )}

    </div>
  )
}

export default CustomerBanner