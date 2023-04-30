import "../../css/customer_banner.css"

function CustomerFooter({ orderList, totalPrice, setSection }) {
  const finalizeOrder = () => {
    setSection(4)
  }

  return (
    <div className="banner">
      <div className="info-box">
        Total Items: {orderList.length}
      </div>

      <div className="info-box">
        Total Price: ${totalPrice}
      </div>

      <div className='button' onClick={() => finalizeOrder()}>
        To Checkout
      </div>
    </div>
  )
}

export default CustomerFooter