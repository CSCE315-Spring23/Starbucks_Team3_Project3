import React from 'react'
import { useLocation, useNavigate} from 'react-router-dom'

import CustomerBanner from '../components/customer/customer_banner';

function ThankYou() {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <div>
      <CustomerBanner/>
      Thank You {location.state.name}, your orderID is {location.state.id}
      <div className='customer-view-button' onClick={() => navigate("/")}>Back to Menu</div>
    </div>
  )
}

export default ThankYou