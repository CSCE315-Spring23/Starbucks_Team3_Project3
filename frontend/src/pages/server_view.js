import "../App.css"
import { useEffect, useState } from 'react';

function Server() {
  const [orderList, setOrderList] = useState([])
  const [menuItems, setMenuItems] = useState([])
  const [employee, setEmployee] = useState('')

  useEffect(() => {
    fetch("http://localhost:5000/menu-items")
      .then(response => response.json())
      .then(result => setMenuItems(result));
  }, []);

  const addItemToOrder = async(item) =>{
    let newItem = {
      'name' : item,
      'addons' : []
    }
    setOrderList([...orderList, newItem]);
    console.log("Added new item")
  }

  const processOrder = () => {
    let finalOrder = {
      'items' : orderList,
      'discounts' : [],
      'employee' : employee
    }
    console.log(finalOrder)
    fetch("http://localhost:5000/orderlist", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
      body: JSON.stringify(finalOrder)
    })
    setOrderList([])
  }

  return (
    <div className="App">
      {menuItems.map((item, key) =>
        <button key={key} className="menu-item-button" onClick={() => addItemToOrder(item.name)}>Item: {item.name} ({item.category})</button>
      )}

      <div className="server-input-employee">
        Employee ----
        <input
        type="text"
        onChange={(e) => setEmployee(e.target.value)}
        />
      </div>

      <div className="server-buttons">
        <button>Add Item</button>
        <button className="server-submit-button" onClick={() => processOrder()}>Submit Order</button>
      </div>
    </div>
  );
}

export default Server;
