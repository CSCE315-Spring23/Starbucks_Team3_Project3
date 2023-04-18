import React, { useState, useEffect } from 'react'

import "../../../css/choose_category.css"

function ChooseCategory({ order, setSection }) {
  const [categoryList, setCategoryList] = useState([{"name": "hot-coffee", "display": "Hot Coffee"}, {"name": "iced-coffee", "display": "Iced Coffee"}]);

  // useEffect(() => {
  //   fetch("http://localhost:5000/all-categories")
  //     .then(response => response.json())
  //     .then(result => setCategoryList(result));
  // }, []);

  const setCategory = (category) => {
    order.category = category.name;
    setSection(1)
  }

  return (
    <>
    {categoryList.map((category, key) =>
      <button key={key} className="category-button" onClick={() => setCategory(category)}>{category.display}</button>
    )}
    </>
  )
}

export default ChooseCategory