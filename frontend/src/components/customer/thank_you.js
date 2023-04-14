import React from 'react'

function ThankYou({ customerName, transactionID, setSection }) {
  return (
    <div>
      Thank You {customerName}, your orderID is {transactionID}
      <div className='customer-view-button' onClick={() => setSection(0)}>Back to Menu</div>
    </div>
  )
}

export default ThankYou