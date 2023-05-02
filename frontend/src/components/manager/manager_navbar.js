import React from 'react'
// import { useNavigate } from "react-router-dom";

// Uncomment below when implemented
// import "../../css/manager_navbar.css"

function ManagerNavbar({ setSection }) {
    // const navigate = useNavigate();

    /*maybe unused*/
    /*<div className='button'>Inventory History</div>*/
    return (
        <div className='banner'>
            <div className='navbarTitle'>Manager Functions</div>
            <div className='button' onClick={() => setSection(1)}>Menu</div>
            <div className='button' onClick={() => setSection(2)}>Inventory</div>
            <div className='button' onClick={() => setSection(3)}>Sales</div>
            <div className='button' onClick={() => setSection(4)}>Reports</div>
            <div className='button' onClick={() => setSection(5)}>Transaction</div>
            <div className='button' onClick={() => setSection(6)}>Employees</div>


        </div>
    )
}

export default ManagerNavbar