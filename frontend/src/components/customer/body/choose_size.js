import React from 'react'

import "../../../css/customer.css"

function ChooseSize({ order, setSection }) {
  const sizes = ["tall", "grande", "venti"]

  const setSize = async (size) => {
    order.size = size
    setSection(3)
  }

  return (
    <>
    <div className="body-info-box">ChooseSize</div>
    {sizes.map((size, key) =>
      <button key={key} className='body-button' onClick={() => setSize(size)}>{size}</button>
    )}
    </>
  )
}

export default ChooseSize