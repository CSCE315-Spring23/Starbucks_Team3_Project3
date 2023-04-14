import React, { useState, useEffect } from 'react'

function ChooseCategory({ order }) {
  const [categoryList, setCategoryList] = useState([{"name": "hot-coffee", "display": "Hot Coffee"}, {"name": "iced-coffee", "display": "Iced Coffee"}]);

  // useEffect(() => {
  //   fetch("http://localhost:5000/all-categories")
  //     .then(response => response.json())
  //     .then(result => setCategoryList(result));
  // }, []);

  const setCategory = (category) => {
    order.category = category.name;
  };

  return (
    <>
    {categoryList.map((category, key) =>
      <button key={key} className="category-button" onClick={() => setCategory(category)}>{category.display}</button>
    )}
    </>
  )
}

export default ChooseCategory