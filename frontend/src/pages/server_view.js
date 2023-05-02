import { useEffect, useState } from 'react';

function Server() {
  const [orderList, setOrderList] = useState([])
  const [categories, setCategories] = useState([])
  const [addons, setAddons] = useState([])
  const [allMenuItems, setAllMenuItems] = useState([])
  const [menuItems, setMenuItems] = useState([])
  const [currentCategory, setCurrentCategory] = useState([])
  const [employee, setEmployee] = useState('')

  useEffect(() => {
    fetch("http://ancient-headland-07012.herokuapp.com/menu-items")
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
      <div>
        <h2>Current Order List</h2>
            <table>
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
                    <button onClick={() => removeItem(item)}>Remove</button>
                  </td>

                </tr>)

                : 'No Item in Cart'}
              </tbody>
            </table>
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