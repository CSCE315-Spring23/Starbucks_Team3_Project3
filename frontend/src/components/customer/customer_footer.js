import React, { useState } from "react";

import "../../css/customer.css"

function CustomerFooter({ orderList, totalPrice, setSection }) {
  const finalizeOrder = () => {
    setSection(4)
  }

  const [isHighContrast, setStyle] = useState(false)

  function handleHCToggle() {
    if (!isHighContrast) {
      document.documentElement.style.setProperty('--banner-bg-color', '#012601')
      document.documentElement.style.setProperty('--box-button-bg-color', 'black')
      document.documentElement.style.setProperty('--text-color', 'cyan')
      document.documentElement.style.setProperty('--hover-box-button-bg-color', 'slategray')
      document.documentElement.style.setProperty('--hover-text-color', 'cyan')
      document.documentElement.style.setProperty('--body-bg-color', 'cornflowerblue')
      setStyle(true);

    } else {
      document.documentElement.style.setProperty('--banner-bg-color', '#00704A')
      document.documentElement.style.setProperty('--box-button-bg-color', 'white')
      document.documentElement.style.setProperty('--text-color', 'black')
      document.documentElement.style.setProperty('--hover-box-button-bg-color', 'grey')
      document.documentElement.style.setProperty('--hover-text-color', 'white')
      document.documentElement.style.setProperty('--body-bg-color', 'bisque')
      setStyle(false);
    }
  }

  return (
        <div className="banner">

          <button className="button" onClick={handleHCToggle}> Toggle High Contrast </button>

          <div className="banner-info-box"> Total Items: {orderList.length} </div>

          <div className="banner-info-box"> Total Price: ${totalPrice} </div>

          <button className='button' onClick={() => finalizeOrder()}> To Checkout </button>
        </div>
        )
}

export default CustomerFooter