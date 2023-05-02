import "../css/server.css"
import React, { useEffect, useState } from 'react';

import image from "../pictures/starbucks-logo-png-25.png"

function Server() {
  const [orderList, setOrderList] = useState([])
  const [categories, setCategories] = useState([])
  const [addons, setAddons] = useState([])
  const [allMenuItems, setAllMenuItems] = useState([])
  const [menuItems, setMenuItems] = useState([])
  const [currentCategory, setCurrentCategory] = useState([])
  const [employee, setEmployee] = useState('')

  useEffect(() => {
    fetch("https://ancient-headland-07012.herokuapp.com/menu-items")
      .then(response => response.json())
      .then(result => setAllMenuItems(result));
    fetch("https://ancient-headland-07012.herokuapp.com/menu-items/all-categories")
      .then(response => response.json())
      .then(result => setCategories(result));
    setAddons(allMenuItems.filter(item => item.category === 'add-on'))
  }, []);

  useEffect(() => {
    setMenuItems(allMenuItems.filter(item => item.category === currentCategory))
  }, [currentCategory])

  const addItemToOrder = async (item) => {
    let newItem = {
      'name' : item.name,
      'addons' : [],
      'category' : item.category,
      'price' : item.price
    }
    setOrderList([...orderList, newItem]);
    console.log("Added new item")
  }

  function changeCategory(category) {
    setCurrentCategory(category.name)
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
                    <button onClick={() => removeItem(item)}>Remove</button>
                  </td>

                </tr>)

                : 'No Item in Cart'}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div>
        Employee ----
        <input
        type="text"
        onChange={(e) => setEmployee(e.target.value)}
        />
        <button onClick={() => processOrder()}>Submit Order</button>
      </div>


      <div>
        Category:
        {categories.map((cat, key) =>
          <button key={key} onClick={() => changeCategory(cat)}>{cat.name}</button>
        )}
      </div>
      
      <div>
        Items:
        {menuItems.map((item, key) =>
          <button key={key} onClick={() => addItemToOrder(item)}>{item.name}</button>
        )}
      </div>

      
      <div>
        Addons:
        {addons.map((item, key) =>
          <button key={key} onClick={() => addItemToOrder(item)}>{item.name}</button>
        )}
      </div>


    </div>
  );
}

export default Server;