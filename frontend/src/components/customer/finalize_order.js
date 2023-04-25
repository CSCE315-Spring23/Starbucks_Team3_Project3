import "../../css/customer.css"

function FinalizeOrder({ orderList, totalPrice, setOrderList, setCustomerName, setTransactionID, setSection}) {
  const returnToCategory = () => {
    setSection(0)
  }

  const submitOrder = async () => {
    setTransactionID(19)
    setSection(5)
  }

  const removeItem = async (item) => {
    const newOL = orderList.filter(order => order.name !== item.name);
    setOrderList(newOL)
  }

  return (
    <div className="background">

      <div className="order-container">
        <div className="order">
          { orderList ? orderList.map((item, key) => <tr key={key}>
              <td>{item.name}</td>
              <td>{item.addons}</td>
              <td>{item.category}</td>
              <td>{item.price}</td>
              <td>
                <button onClick={() => removeItem(item)}>Remove</button>
              </td>
            </tr>)
            : 'No Item in Cart'}
        </div>

        <div className="final-info-box-container">
          <div className="final-info-box">Total Items: {orderList.length}</div>
          <div className="final-info-box">Total Price: ${totalPrice}</div>
        </div>
      </div>

      <div>
        <div>Enter name</div>
        <div className='name-input'>
          <input
            type="text"
            onChange={(e) => setCustomerName(e.target.value)}
          />
        </div>

        <div className="buffer"></div>

        <div className='back-button' onClick={() => returnToCategory()}>
          Back to Ordering
        </div>

        <div className="buffer"></div>

        <div className='confirm-order-button' onClick={() => submitOrder()}>
          Confirm Order
        </div>
      </div>
    </div>
  );
}

export default FinalizeOrder