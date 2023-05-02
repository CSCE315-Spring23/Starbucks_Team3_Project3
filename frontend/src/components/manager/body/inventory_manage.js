import React, { useState, useEffect } from 'react'

function InventoryManage(){
    const [menuTable, setMenuTable] = useState([])
    const [selectedItem, setSelectedItem] = useState("None")
    const [sortConfig, setSortConfig] = useState({ column: 'inventory_name', direction: 'asc' });

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

    useEffect(() => {
        fetch("http://localhost:5000/management/inventory")
            .then(response => response.json())
            .then(result => setMenuTable(result));
    }, []);

    return (
        <div>

            <div className='manager-action-bar'>
                <div className='managing-buttons'>
                    <button className='manage-button'>Add Inventory Item</button>
                    <button className='manage-button'>Remove Inventory Item</button>
                    <button className='manage-button'>Modify Inventory Item</button>
                    <button className='manage-button'>Get Low Stock</button>
                    <button className='manage-button'>Input Delivery</button>
                    <button className='manage-button'>Void Item</button>

                </div>
                <div className='show-selected'>{selectedItem !== "None" ? selectedItem.inventory_name : "No item selected"}</div>
            </div>

            <div className='manager-table'>
                <table className='menu-table' border='1'>
                    <thead>
                    <tr>
                        <td className='sortable' onClick={() => handleSort('inventory_id')}>ID</td>
                        <td className='sortable' onClick={() => handleSort('inventory_name')}>Name</td>
                        <td className='sortable' onClick={() => handleSort('quantity')}>Amount</td>
                        <td className='sortable' onClick={() => handleSort('costs')}>Cost</td>
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
                                <td>{item.costs}</td>
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