import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import image from "../../pictures/starbucks-logo-png-25.png"

import "../../css/customer.css"

function CustomerBanner({ setSection }) {
  const navigate = useNavigate();
  const [showTranslate, setShowTranslate] = useState(false);

  {/* Code below will toggle the google translate widget on click*/ }
  const HandleTranslateClick = () => {
    const wrapper = document.getElementById('google_translate_wrapper');
    if (wrapper) {
      wrapper.style.display = wrapper.style.display === 'none' ? 'block' : 'none';
    }
  };

    // const [value, setValue] = useState([]);
    // useEffect(() => {
    //   apiValues()
    // }, [])
    // const apiValues = async () => {
    //   const resp = await fetch('http://localhost:5000/weather/77840')
    //   setValue(await resp.json())
    // }
  
  return (
    <div className='banner'>
      <div className="starbucks-logo" style={{ backgroundImage: `url(${image}` }}></div>
      <div className='weather-time'> Weather and Time 
      {/* {value.map((data) => {
        return(
          <li className="weather-time" key={data.name}> {data.temp}</li>
        )
      })} */}
      </div>
      <button className='banner-button' onClick={HandleTranslateClick}> Change Language </button>
      <button className='banner-button'> Show Menu Board </button>
      <button className='banner-button' onClick={() => navigate("/login")}> Login Button </button>
      {/* Code below makes the translation widget visible when Change Language button is clicked */}
      {showTranslate && (
        <div className="google-translate" id="google_translate_wrapper">
          <div className="google-translate" id="google_translate_element"></div>
        </div>
      )}
    </div>
  )
}

export default CustomerBanner