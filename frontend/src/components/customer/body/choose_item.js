import React, { useState } from 'react'

function ChooseItem({ order, setSection }) {
  const [menuItems, setMenuItems] = useState([{"name": "Coffee", "sized": true}, {"name": "Latte", "sized": false}])

  // useEffect(() => {
  //   const category = orderList.slice(-1)
  //   fetch("http://localhost:5000/menu-items/" + category)
  //     .then(response => response.json())
  //     .then(result => setMenuItems(result));
  // }, []);

  const setItem = async (item) => {
    order.name = item.name
    if (item.sized) {
      setSection(2)
    } else {
      order.size = "NA"
      setSection(3)
    }
  }

  return (
    <>
      <div className="body-info-box">Choose Item</div>
      {menuItems.map((item, key) =>
        <button key={key} className='body-button' onClick={() => setItem(item)}>{item.name}</button>
      )}
    </>
  )
}

export default ChooseItem