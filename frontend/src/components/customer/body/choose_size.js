import React from 'react'

function ChooseSize({ order, setSection }) {
  const sizes = ["tall", "grande", "venti"]

  const setSize = async (size) => {
    order.size = size
    setSection(3)
  }

  return (
    <>
    <div>ChooseSize</div>
    {sizes.map((size, key) =>
      <button key={key} className='size-button' onClick={() => setSize(size)}>{size}</button>
    )}
    </>
  )
}

export default ChooseSize