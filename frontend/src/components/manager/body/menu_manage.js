import React, { useState, useEffect } from 'react'

// import "../../../css/customer_body.css"
// import BootstrapTable from 'react-bootstrap-table-next';
// import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';


function MenuManage({setSection}){
    const [menuTable, setMenuTable] = useState([])
    const [selectedItem, setSelectedItem] = useState("None")


        // ID    // const columns = [
    //     //     { dataField: 'item_id', text: 'ID'},
    //     //     { dataField: 'item_name', text: 'Name'},
    //     //     { dataField: 'display_name', text: 'Display Name'},
    //     //     { dataField: 'category', text: 'Category'},
    //     //     { dataField: 'size', text: 'Size'},
    //     //     { dataField: 'ingredients', text: 'Ingredients'},
    //     //     { dataField: 'price', text: 'Price'},
    //     // ]
        //             <td>Name</td>
        //             <td>Display Name</td>
        //             <td>Category</td>
        //             <td>Size</td>
        //             <td>Ingredients</td>
        // <td>Price</td>

    useEffect(() => {
        fetch("http://localhost:5000/management/menuitems")
            .then(response => response.json())
            .then(result => setMenuTable(result));
    }, []);

    // const data = menuTable.map(item => ({
    //     item_id: item.item_id,
    //     item_name: item.item_name,
    //     display_name: item.display_name,
    //     category: item.category,
    //     size: item.size,
    //     ingredients: item.ingredients.map(entry => `${entry.amount} ${entry.inventory_name}`).join(', '),
    //     price: item.price
    // }));
    // TODO: Add functionality to buttons such that they use the selected table item
    return (
        <div className='body'>
            <div className='managing-buttons'>
                <button className='manage-button'>Add Menu Item</button>
                <button className='manage-button'>Remove Menu Item</button>
                <button className='manage-button'>Modify Menu Item</button>
                <div className='show-selected'>{selectedItem !== "None" ? selectedItem.item_name : "No item selected"}</div>
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
                {/*<BootstrapTable keyField='item_id' data={data} columns={columns} />*/}
            </div>
        </div>
    )
}

export default MenuManage