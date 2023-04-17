function CustomerFooter({ orderList, totalPrice, setSection }) {
  const finalizeOrder = () => {
    setSection(4)
  }

  return (
    <div>
      <div className="footer-total-items">
        Total Items: {orderList.length}
      </div>

      <div className="footer-total-price">
        Total Price: ${totalPrice}
      </div>

      <button className='finalize-order-button' onClick={() => finalizeOrder()}>
        Finalize Order
      </button>
    </div>
  )
}

export default CustomerFooter