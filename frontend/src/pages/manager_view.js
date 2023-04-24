import "../App.css";
import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";


function Button(props) {
    return (
        <button onClick={props.onClick}>
            {props.label}
        </button>
    );
}

function Column(props) {
    return (
        <div style={{float: 'left'}}>
            {props.buttons.map(button => (
                <Button
                    key={button.id}
                    onClick={button.onClick}
                    label={button.label}
                />
            ))}
        </div>
    );
}

function Managerv() {
    function handleClick() {
        alert('button has been clicked.')
    }

    const buttonCol = [
        {
            id: "server-view",
            onClick: () => handleClick(),
            label: "Switch to Server View"
        },
        {
            id: "inventory-view",
            onClick: () => handleClick(),
            label: "Show Inventory"
        },
        {
            id: "low-stock-view",
            onClick: () => handleClick(),
            label: "Show Low Stock Inventory"
        },
        {
            id: "menu-item-view",
            onClick: () => handleClick(),
            label: "Show Menu Item List"
        },
        {
            id: "sales-view",
            onClick: () => handleClick(),
            label: "Show Sales"
        },
        {
            id: "transactions-view",
            onClick: () => handleClick(),
            label: "Show Transactions"
        },
        {
            id: "employee-list-view",
            onClick: () => handleClick(),
            label: "Show Employee List"
        },
        {
            id: "reports-view",
            onClick: () => handleClick(),
            label: "Show X/Z Reports"
        }
    ]

    return (
        <div>
            <Column buttonColumn={buttonCol} />
        </div>
    );
}

function Manager() {
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
    <div className="App">
      <div className="current-order-list">
        <button className="button-5" onClick={() => navigate("/")}>Back Home</button>
        <h2>Current Order List</h2>
            <table className='order-list-table'>
              <thead>
                <tr>
                  <td>Name</td>
                  <td>Category</td>
                  <td>Price</td>
                </tr>
              </thead>
              <tbody>
                { orderList ? orderList.map((item, key) => <tr key={key}>
                  <td>{item.name}</td>
                  <td>{item.category}</td>
                  <td>{item.price}</td>
                  <td>
                    <button className='button-5' onClick={() => removeItem(item)}>Remove</button>
                  </td>

                </tr>)

                : 'No Item in Cart'}
              </tbody>
            </table>
      </div>

      <div className="server-input-employee">
        Employee ----
        <input
        type="text"
        onChange={(e) => setEmployee(e.target.value)}
        />
        <button className="button-5" onClick={() => processOrder()}>Submit Order</button>
      </div>

      <div className="menu-item-buttons">
        {menuItems.map((item, key) =>
          <button key={key} className="button-6" onClick={() => addItemToOrder(item)}>{item.name}</button>
        )}
      </div>


    </div>
  );
}



export default Manager;