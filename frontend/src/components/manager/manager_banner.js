import React from 'react'
import { useNavigate } from "react-router-dom";

// Uncomment below when implemented
// import "../../css/manager_banner.css"

function ManagerBanner({ setSection }) {
    const navigate = useNavigate();



    return (
        <div className='banner'>
            <div className='starbucks-logo'>Starbucks Logo</div>
            <div className='weather-time'>Weather and Time</div>
            <div className='button'>Change Language</div>
            <div className='button' onClick={() => navigate('/menu-board')}>Show menu board</div>
            <div className='button' onClick={() => navigate("/server")}>Server Page</div>
            <div className='button' onClick={() => navigate("/")}>Logout</div>
        </div>
    )
}

export default ManagerBanner