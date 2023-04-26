import React, { useState, useRef } from 'react'

import ChooseCategory from './body/choose_category'
import ChooseItem from './body/choose_item'
import ChooseSize from './body/choose_size'
import ChooseAddons from './body/choose_addons'
import FinalizeOrder from './finalize_order'


function CustomerBody({ orderList, setOrderList, totalPrice, setTotalPrice, currSection, setSection}) {
  // Sections: Category -> Item -> size -> addons
  const [order, setOrder] = useState({"category": "", "name": "", "size": "", "addons": []})

  const refresh = () => {
    setOrder({"category": "", "name": "", "size": "", "addons": []})
    setSection(0);
  };

  const addItem = async () => {
    setOrderList([...orderList, order])
    updatePrice()
    refresh()
  }

  const updatePrice = async () => {
    setTotalPrice(totalPrice + 1.5)
    console.log("updating price")
    console.log(order)
  }

  const blinkRef = useRef(null);

  function makeItBlink() {
    blinkRef.current.classList.add('blink');
    setTimeout(() => {
      blinkRef.current.classList.remove('blink');
    }, 1000);
  }

  return (
    <div className="body" ref={blinkRef}>
      {currSection === 0 ? (
        <ChooseCategory order={order} setSection={setSection}/>
      ) : currSection === 1 ? (
        <ChooseItem order={order} setSection={setSection}/>
      ) : currSection === 2 ? (
        <ChooseSize order={order} setSection={setSection}/>
      ) : currSection === 3 ? (
        <ChooseAddons order={order}/>
      ) : null}

      {currSection === 3 ? (
        <button className="body-button" onClick={() => { addItem(); makeItBlink() }}>Add Item</button>
      ) : null}
      <button className="body-button" onClick={() => setSection(currSection - 1)}>Back</button>
      <button className="body-button" onClick={() => refresh()}>Start Over</button>
    </div>
  )
}

export default CustomerBody