import React, { useState } from "react";

import "../../css/customer.css"

function CustomerFooter({ orderList, totalPrice, setSection }) {
  const finalizeOrder = () => {
    setSection(4)
  }

  const [highContrastMode, toggle] = useState(false);
  const toggleStyle = () => {
    toggle(!highContrastMode);
  }

  return (
        <div className="banner">
          <button className='banner-button' onClick={toggleStyle}> High Constrast </button>

          <div className="banner-info-box"> Total Items: {orderList.length} </div>

          <div className="banner-info-box"> Total Price: ${totalPrice} </div>

          <button className='banner-button' onClick={() => finalizeOrder()}> To Checkout </button>
        </div>
        )
}

        export default CustomerFooter