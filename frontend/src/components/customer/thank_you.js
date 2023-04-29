import React from 'react'

import "../../css/thank_you.css"

function ThankYou({ customerName, transactionID, setSection }) {
  return (
    <div className="thanks">
      <div className="text-box">Thank You {customerName}, your orderID is {transactionID}</div>
      <div className='customer-view-button' onClick={() => setSection(0)}>Back to Menu</div>
    </div>
  )
}

export default ThankYou