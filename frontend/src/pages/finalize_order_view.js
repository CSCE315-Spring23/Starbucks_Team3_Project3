import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import CustomerBanner from '../components/customer/customer_banner'

function FinalizeOrder() {
  const navigate = useNavigate()
  const [name, setName] = useState("Customer")

  return (
    <div>
      <CustomerBanner/>
      <div className='orderlist'>
        
      </div>

      <div className='name-input'>
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className='back-button' onClick={() => navigate("/")}>
        Back to Ordering
      </div>

      <div className='finalize-order-button' onClick={() => navigate("/thank-you", {state: {id:name}})}>
        Finalize Order
      </div>
    </div>
  )
}

export default FinalizeOrder