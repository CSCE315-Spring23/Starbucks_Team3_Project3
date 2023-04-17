import React, { useState } from 'react'

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

  return (
    <>
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
      <button onClick={() => addItem()}>Add Item</button>
    ) : null}
    <button onClick={() => setSection(currSection - 1)}>Back</button>
    <button onClick={() => refresh()}>Start Over</button>
    </>
  )
}

export default CustomerBody