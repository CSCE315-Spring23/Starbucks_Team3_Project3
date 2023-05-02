import React from 'react'
// import { useNavigate } from "react-router-dom";

// Uncomment below when implemented
// import "../../css/manager_navbar.css"

function ManagerNavbar({ setSection }) {
    // const navigate = useNavigate();

    /*maybe unused*/
    /*<div className='button'>Inventory History</div>*/
    return (
        <div className='manager-navbar-container'>
            <h3 className='rainbow_text_animated'>Manager Functions</h3>
            <button className='manager-navbar-button' onClick={() => setSection(1)}>Menu</button>
            <button className='manager-navbar-button' onClick={() => setSection(2)}>Inventory</button>
            <button className='manager-navbar-button' onClick={() => setSection(3)}>Sales</button>
            <button className='manager-navbar-button' onClick={() => setSection(4)}>Reports</button>
            <button className='manager-navbar-button' onClick={() => setSection(5)}>Transaction</button>
            <button className='manager-navbar-button' onClick={() => setSection(6)}>Employees</button>


        </div>
    )
}

export default ManagerNavbar