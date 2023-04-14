import React, { useState } from 'react'

import ChooseCategory from './body/choose_category'
import ChooseItem from './body/choose_item'
import ChooseSize from './body/choose_size'
import ChooseAddons from './body/choose_addons'


function CustomerBody({ orderList, setOrderList }) {
  // Sections: Category -> Item -> size -> addons
  const [order, setOrder] = useState({"category": "", "name": "", "size": "", "addons": []})
  const [currSection, switchSection] = useState(0);

  const refresh = () => {
    setOrder({"category": "", "name": "", "size": "", "addons": []})
    switchSection(0);
    console.log(JSON.stringify(order));
  };

  const addItem = async () => {
    setOrderList([...orderList, order]);
    refresh();
    console.log(JSON.stringify(order));
  }

  return (
    <>
    {currSection === 0 ? (
      <ChooseCategory order={order}/>
    ) : currSection === 1 ? (
      <ChooseItem order={order}/>
    ) : currSection === 2 ? (
      <ChooseSize order={order}/>
    ) : currSection === 3 ? (
      <ChooseAddons order={order}/>
    ) : null}

    {currSection === 3 ? (
      <button onClick={() => addItem()}>Add Item</button>
    ) : (
      <button onClick={() => switchSection(currSection + 1)}>Next</button>
    )}
    
    <button onClick={() => refresh()}>Start Over</button>
    </>
  )
}

export default CustomerBody