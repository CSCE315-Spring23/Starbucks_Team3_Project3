function FinalizeOrder({ orderList, setOrderList, setCustomerName, setTransactionID, setSection}) {
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
    <div>
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

      <div className='name-input'>
        <input
          type="text"
          onChange={(e) => setCustomerName(e.target.value)}
        />
      </div>

      <div className='back-button' onClick={() => returnToCategory()}>
        Back to Ordering
      </div>

      <div className='finalize-order-button' onClick={() => submitOrder()}>
        Confirm Order
      </div>
    </div>
  );
}

export default FinalizeOrder