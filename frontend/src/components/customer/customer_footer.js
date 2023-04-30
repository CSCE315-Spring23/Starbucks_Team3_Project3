import React, { useState } from "react";

import "../../css/customer.css"
// import "../../css/hc_customer.css"

function CustomerFooter({ orderList, totalPrice, setSection }) {
  const finalizeOrder = () => {
    setSection(4)
  }

  return (
        <div className="banner">
          <button className="button"> Toggle High Contrast </button>

          <div className="banner-info-box"> Total Items: {orderList.length} </div>

          <div className="banner-info-box"> Total Price: ${totalPrice} </div>

          <button className='button' onClick={() => finalizeOrder()}> To Checkout </button>
        </div>
        )
}

export default CustomerFooter