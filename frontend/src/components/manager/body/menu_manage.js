import React, { useState, useEffect } from 'react'

import "../../../css/customer_body.css"

function MenuManage({setSection}){
    const [menuTable, setMenuTable] = useState([])
    const [selectedItem, setSelectedItem] = useState()

    useEffect(() => {
        fetch("http://localhost:5000/management/menuitems")
            .then(response => response.json())
            .then(result => setMenuTable(result));
    }, []);
    // TODO: Add functionality to buttons such that they use the selected table item
    return (
        <div className='body'>
            <div className='managing-buttons'>
                <button className='manage-button'>Add Menu Item</button>
                <button className='manage-button'>Remove Menu Item</button>
                <button className='manage-button'>Modify Menu Item</button>
                <div className='show-selected'>{selectedItem.item_name}</div>
            </div>
            <div className='table'>
                <table className='menu-table'>
                    <thead>
                        <tr>
                            <td>ID</td>
                            <td>Name</td>
                            <td>Display Name</td>
                            <td>Category</td>
                            <td>Size</td>
                            <td>Ingredients</td>
                            <td>Price</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            menuTable.map((item, key) =>
                                <tr key={key}>
                                    <td>{item.item_id}</td>
                                    <td>{item.item_name}</td>
                                    <td>{item.display_name}</td>
                                    <td>{item.category}</td>
                                    <td>{item.size}</td>
                                    <td>{item.ingredients.map(entry => `${entry.inventory_name}: ${entry.amount}`).join(', ')}</td>
                                    <td>{item.price}</td>
                                    <td><button className='button-5' onClick={() => setSelectedItem(item)}>Select</button></td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default MenuManage