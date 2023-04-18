import "../../css/customer_footer.css"

function CustomerFooter({ orderList, totalPrice, setSection }) {
  const finalizeOrder = () => {
    setSection(4)
  }

  return (
    <div className="footer">
      <div className="footer-total-items">
        Total Items: {orderList.length}
      </div>

      <div className="footer-total-price">
        Total Price: ${totalPrice}
      </div>

      <div className="customer-name-input">
        Input Customer Name
      </div>

      <div className='finalize-order-button' onClick={() => finalizeOrder()}>
        Finalize Order
      </div>
    </div>
  )
}

export default CustomerFooter