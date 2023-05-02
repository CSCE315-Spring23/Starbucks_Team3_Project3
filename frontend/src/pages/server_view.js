import "../css/server.css"
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

import image from "../pictures/starbucks-logo-png-25.png"

function Server() {
  const [orderList, setOrderList] = useState([])
  const [menuItems, setMenuItems] = useState([])
  const [employee, setEmployee] = useState('')

  useEffect(() => {
    fetch("http://localhost:5000/menu-items")
      .then(response => response.json())
      .then(result => setMenuItems(result));
  }, []);

  const addItemToOrder = async(item) => {
    let newItem = {
      'name' : item.name,
      'addons' : [],
      'category' : item.category,
      'price' : item.price
    }
    setOrderList([...orderList, newItem]);
    console.log("Added new item")
  }

  const removeItem = async (item) => {
    const newOL = orderList.filter(order => order.name !== item.name && order.addons !== item.addons);
    setOrderList(newOL)
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

  const navigate = useNavigate();

  return (
    <div>

      <div className='server-banner'>
        <div className="starbucks-logo" style={{ backgroundImage: `url(${image}` }}></div>
        <div className='server-weather-time'>
          add weather api here
        </div>
        <button className='button-5'>
          go to manager page
        </button>
        <div className="server-input-employee">
          Employee ----
          <input
            type="text"
            onChange={(e) => setEmployee(e.target.value)}
          />
          <button className="button-5" onClick={() => processOrder()}>Submit Order</button>
        </div>
      </div>

      <div className='server-body-container'>

        <div className='server-body-container-left'>
          <div className="current-order-list">
            <h2 className='rainbow_text_animated'>Current Order List</h2>
            <table className='order-list-table'>
              <thead>
              <tr>
                <td>Name</td>
                <td>Price</td>
              </tr>
              </thead>
              <tbody>
              { orderList ? orderList.map((item, key) => <tr key={key}>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <td>
                    <button className='button-5' onClick={() => removeItem(item)}>Remove</button>
                  </td>

                </tr>)

                : 'No Item in Cart'}
              </tbody>
            </table>
          </div>
        </div>

        <div className='server-body-container-right'>
          <div className='server-category-bar'>
            <button className='button-5'>Coffee</button>
            <button className='button-5'>Espresso</button>
            <button className='button-5'>Blended</button>
            <button className='button-5'>Teas</button>
            <button className='button-5'>Coffee Alternatives</button>
            <button className='button-5'>Food</button>
          </div>

          <div className='server-container-below-categories'>
            <div className="menu-item-buttons">
              {menuItems.map((item, key) =>
                <button key={key} className="button-6" onClick={() => addItemToOrder(item)}>{item.name}</button>
              )}
            </div>
          </div>

        </div>

        <div className='server-addons'>
          <h3 className='rainbow_text_animated'>Add-Ons</h3>
        </div>

      </div>




    </div>
  );
}

export default Server;