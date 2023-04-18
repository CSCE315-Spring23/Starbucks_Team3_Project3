import React, { useEffect, useState } from 'react'

function ChooseAddons({ order }) {
  const [addonList, setAddonList] = useState([])

  const [allAddons, setAllAddons] = useState([])

  useEffect(() => {
    fetch("http://localhost:5000/menu-items/addons")
      .then(response => response.json())
      .then(result => setAllAddons(result))
  }, [])

  function addToList(name) {
    setAddonList(...addonList, name)
  }

  function removeFromList(name) {
    setAddonList(...addonList, name)
  }

  return (
    <>
    <div>ChooseAddons</div>
    {allAddons.map(
      (name, key) =>
        <>
          <button key={key} onClick={() => {addToList(name)}}>Item: {name}</button>
          <button key={key} onClick={() => {removeFromList(name)}}>Remove: {name}</button>
        </>
      )
    }
    </>
  )
}

export default ChooseAddons