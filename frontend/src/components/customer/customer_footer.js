import React, { useState } from 'react'
import { useNavigate} from 'react-router-dom'

function CustomerFooter({ orderList, totalItems, totalPrice }) {
  const navigate = useNavigate();
  const [customerName, setCustomerName] = useState("Customer")
  const [transactionID, setTransactionID] = useState(0)


  return (
    <div>
      <div className="footer-total-items">
        Total Items: {totalItems}
      </div>

      <div className="footer-total-price">
        Total Price: ${totalPrice}
      </div>

      <div className='name-input'>
        <input
          type="text"
          onChange={(e) => setCustomerName(e.target.value)}
        />
      </div>

      <div className='finalize-order-button' onClick={() => navigate("/thank-you", {state: {name:customerName, id:transactionID}})}>
        Finalize Order
      </div>
    </div>
  )
}

export default CustomerFooter