import React from 'react'
import { useNavigate } from "react-router-dom";

// Uncomment below when implemented
// import "../../css/manager_banner.css"
import image from "../../pictures/starbucks-logo-png-25.png"

function ManagerBanner({ setSection }) {
    const navigate = useNavigate();

    return (
      <div className='manager-banner'>
        <div className='starbucks-logo' style={{ backgroundImage: `url(${image}` }}></div>
        <div className='weather-time'>Weather and Time</div>
        <button className='button'>Change Language</button>
        <button className='button' onClick={() => navigate('/menu-board')}>Show menu board</button>
        <button className='button' onClick={() => navigate("/server")}>Server Page</button>
        <button className='button' onClick={() => navigate("/")}>Logout</button>
      </div>
    )
}

export default ManagerBanner