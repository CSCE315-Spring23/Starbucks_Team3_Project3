function CustomerFooter({ orderList, totalPrice, setSection }) {
  const finalizeOrder = () => {
    setSection(4)
  }

  return (
    <div className="banner">
      <button className='button'> High Constrast </button>

      <div className="info-box"> Total Items: {orderList.length} </div>

      <div className="info-box"> Total Price: ${totalPrice} </div>

      <button className='button' onClick={() => finalizeOrder()}> To Checkout </button>
    </div>
  )
}

export default CustomerFooter