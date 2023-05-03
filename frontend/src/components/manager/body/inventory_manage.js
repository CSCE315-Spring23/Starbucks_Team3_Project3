import React, { useState, useEffect } from 'react'

function InventoryManage(){
    const [menuTable, setMenuTable] = useState([])
    const [selectedItem, setSelectedItem] = useState("None")
    const [sortConfig, setSortConfig] = useState({ column: 'inventory_name', direction: 'asc' });
    const [showAddForm, setShowAddForm] = useState(false);
    const [showModifyForm, setShowModifyForm] = useState(false);
    const [restockAmount, setRestockAmount] = useState(0);



    const handleAddInvItemClick = () => {
        setShowAddForm(true);
        setShowModifyForm(false);
    };
    const handleModifyInvItemClick = () => {
        setShowAddForm(false);
        setShowModifyForm(true);
    };

    const handleFormCancel = () => {
        setShowAddForm(false);
        setShowModifyForm(false);
    }

    const handleRemoveInvItemClick = (item) => {
        // useEffect(() => {
        fetch("http://localhost:5000/management/inventory", {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ item_name: item.item_name })
        }).then(response => response.json())
        fetch("http://localhost:5000/management/inventory")
            .then(response => response.json())
            .then(result => setMenuTable(result));
        // }, []);
    };
    const handleSort = (column) => {
        // if (column === 'size' || column === 'ingredients') return;

        let direction = 'asc';
        if (sortConfig.column === column && sortConfig.direction === 'asc') {
            direction = 'desc';
        }

        setSortConfig({ column, direction });
    };

    const sortedMenuTable = React.useMemo(() => {
        const sortableColumns = ['inventory_id', 'inventory_name', 'quantity', 'costs', 'minimum_quantity', 'last_restocked'];

        if (sortConfig.column && sortableColumns.includes(sortConfig.column)) {
            return [...menuTable].sort((a, b) => {
                const aValue = a[sortConfig.column];
                const bValue = b[sortConfig.column];

                if (aValue < bValue) {
                    return sortConfig.direction === 'asc' ? -1 : 1;
                }
                if (aValue > bValue) {
                    return sortConfig.direction === 'asc' ? 1 : -1;
                }
                return 0;
            });
        }

        return menuTable;
    }, [menuTable, sortConfig]);

    const handleLowStock = () => {
        fetch("http://localhost:5000/management/lowstock")
            .then(response => response.json())
            .then(result => setMenuTable(result));
    }
    const handleDelivery = () => {
        fetch("http://localhost:5000/management/restock", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "name": selectedItem.item_name, "amount": restockAmount })
        }).then(response => response.json())
    }
    const handleVoid = () => {
        fetch("http://localhost:5000/management/voiditem", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "name": selectedItem.item_name, "amount": restockAmount })
        }).then(response => response.json())
    }
    const AddForm = () => {
        const [name, setName] = useState('');
        const [amount, setAmount] = useState(0);
        const [cost, setCost] = useState(0);
        const [threshold, setThreshold] = useState(0);
        const handleSubmit = (e) => {
            e.preventDefault();
            // useEffect(() => {
            fetch("http://localhost:5000/management/inventory", {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ "name": name, "amount": amount, "cost": cost, "threshold": threshold})
            }).then(response => response.json())
            fetch("http://localhost:5000/management/inventory")
                .then(response => response.json())
                .then(result => setMenuTable(result));
            // }, []);
            setShowAddForm(false)

        };

        return (
            <form onSubmit={handleSubmit}>
                <label>
                    Internal Name:
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    Display Name:
                    <input
                        type="number"
                        step='0.01'
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    Price:
                    <input
                        type="number"
                        step="0.01"
                        value={cost}
                        onChange={(e) => setCost(parseFloat(e.target.value))}
                    />
                </label>
                <br />
                <button type="submit">Submit</button>
                <button type='button' onClick={handleFormCancel}>Cancel</button>
            </form>
        );
    };
    const ModifyForm = ({ item }) => {
        const [price, setPrice] = useState('');
        const [threshold, setThreshold] = useState('');


        const fetchItemData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/management/getinvitem`,{
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({'name': item.inventory_name})
                });
                const data = await response.json();
                setThreshold(data.threshold);
                setPrice(data.cost);
            } catch (error) {
                console.error('Error fetching item data:', error);
            }
        };

        useEffect(() => {
            fetchItemData();
        }, []);

        const handleSubmit = async (e) => {
            e.preventDefault();
            fetch("http://localhost:5000/management/inventory", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "name": item.inventory_name,
                    "threshold": threshold,
                    "price": price
                })
            });
            // const data = await response.json();
            // Handle the response data as needed
            setShowModifyForm(false);
        };

        return (
            <form onSubmit={handleSubmit}>
                <label>
                    Price:
                    <input
                        type="number"
                        step="0.01"
                        value={price}
                        onChange={(e) => setPrice(parseFloat(e.target.value))}
                    />
                </label>
                <br />
                <label>
                    Low Stock Threshold:
                    <input
                        type="number"
                        step="0.01"
                        value={threshold}
                        onChange={(e) => setThreshold(parseFloat(e.target.value))}
                    />
                </label>
                <br />
                <button type="submit">Submit</button>
                <button type="button" onClick={handleFormCancel}>Cancel</button>
            </form>
        );
    }

    useEffect(() => {
        fetch("http://localhost:5000/management/inventory")
            .then(response => response.json())
            .then(result => setMenuTable(result));
    }, []);

    return (
        <div>

            <div className='manager-action-bar'>
                <div className='managing-buttons'>
                    <button className='manage-button' onClick={() => handleAddInvItemClick()}>Add Inventory Item</button>
                    <button className='manage-button' onClick={() => handleRemoveInvItemClick()}>Remove Inventory Item</button>
                    <button className='manage-button' onClick={() => handleModifyInvItemClick()}>Modify Inventory Item</button>
                    <button className='manage-button' onClick={() => handleLowStock()}>Get Low Stock</button>
                    <input
                        type="number"
                        value={restockAmount}
                        onChange={(e) => setRestockAmount(parseInt(e.target.value))}
                        placeholder="Amount"
                    />
                    <button className='manage-button' onClick={() => handleDelivery()}>Input Delivery</button>
                    <button className='manage-button' onClick={() => handleVoid()}>Void Item</button>

                </div>
                <div className='show-selected'>{selectedItem !== "None" ? selectedItem.inventory_name : "No item selected"}</div>
            </div>
            {showAddForm && <AddForm/>}
            {showModifyForm && <ModifyForm item={selectedItem}/> }
            <div className='manager-table'>
                <table className='menu-table' border='1'>
                    <thead>
                    <tr>
                        <td className='sortable' onClick={() => handleSort('inventory_id')}>ID</td>
                        <td className='sortable' onClick={() => handleSort('inventory_name')}>Name</td>
                        <td className='sortable' onClick={() => handleSort('quantity')}>Amount</td>
                        <td className='sortable' onClick={() => handleSort('cost')}>Cost</td>
                        <td className='sortable' onClick={() => handleSort('threshold')}>Low Stock Threshold</td>
                        <td className='sortable' onClick={() => handleSort('restockedOn')}>Last Restocked</td>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        sortedMenuTable.map((item, key) =>
                            <tr key={key}>
                                <td>{item.inventory_id}</td>
                                <td>{item.inventory_name}</td>
                                <td>{item.quantity}</td>
                                <td>{item.cost}</td>
                                <td>{item.threshold}</td>
                                <td>{item.restockedOn}</td>

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

export default InventoryManage