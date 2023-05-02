import React from 'react'
import { useNavigate } from "react-router-dom";

// Uncomment below when implemented
// import "../../css/manager_navbar.css"

function ManagerNavbar({ setSection }) {
    const navigate = useNavigate();

    /*maybe unused*/
    /*<div className='button'>Inventory History</div>*/
    return (
        <div className='banner'>
            <div className='navbarTitle'>Manager Functions</div>
            <div className='button'>Menu Management</div>
            <div className='button'>Show menu board</div>
            <div className='button'>Inventory</div>
            <div className='button'>Sales</div>
            <div className='button'>Reports</div>
            <div className='button'>Transaction</div>
            <div className='button'>Deliveries</div>
            <div className='button'>Employees</div>


        </div>
    )
}

export default ManagerNavbar