import React from 'react'

import "../../css/customer.css"

function ThankYou({ customerName, transactionID, setSection }) {
  return (
    <div className="thanks">
      <div className="text-box">Thank You {customerName}, your orderID is {transactionID}</div>
      <button className='customer-view-button' onClick={() => setSection(0)}>Back to Menu</button>
    </div>
  )
}

export default ThankYou