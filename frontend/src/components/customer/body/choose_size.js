import React from 'react'

import "../../../css/choose_size.css"

function ChooseSize({ order, setSection }) {
  const sizes = ["tall", "grande", "venti"]

  const setSize = async (size) => {
    order.size = size
    setSection(3)
  }

  return (
    <>
    <div className="size-title">ChooseSize</div>
    {sizes.map((size, key) =>
      <button key={key} className='size-button' onClick={() => setSize(size)}>{size}</button>
    )}
    </>
  )
}

export default ChooseSize