import React, { useState } from "react";
function CustomerFooter({ orderList, totalPrice, setSection }) {
  const finalizeOrder = () => {
    setSection(4)
  }

  const [highConstrastMode, toggle] = useState(false);
  const toggleStyle = () => {
    toggle(!highConstrastMode);
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