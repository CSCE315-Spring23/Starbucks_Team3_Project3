import React, { useState, useEffect } from 'react'

function MenuManage({setSection}){
    const [menuTable, setMenuTable] = useState([])
    const [selectedItem, setSelectedItem] = useState("None")
    const [sortConfig, setSortConfig] = useState({ column: 'item_name', direction: 'asc' });

    const handleSort = (column) => {
        if (column === 'size' || column === 'ingredients') return;

        let direction = 'asc';
        if (sortConfig.column === column && sortConfig.direction === 'asc') {
            direction = 'desc';
        }

        setSortConfig({ column, direction });
    };

    const sortedMenuTable = React.useMemo(() => {
        const sortableColumns = ['item_id', 'item_name', 'display_name', 'category', 'price'];

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
        fetch("http://localhost:5000/management/menuitems")
            .then(response => response.json())
            .then(result => setMenuTable(result));
    }, []);

    return (
        <div>

            <div className='manager-action-bar'>
                <div className='managing-buttons'>
                    <button className='manage-button'>Add Menu Item</button>
                    <button className='manage-button'>Remove Menu Item</button>
                    <button className='manage-button'>Modify Menu Item</button>
                </div>
                <div className='show-selected'>{selectedItem !== "None" ? selectedItem.item_name : "No item selected"}</div>
            </div>

            <div className='manager-table'>
                <table className='menu-table' border='1'>
                    <thead>
                    <tr>
                        <td className='sortable' onClick={() => handleSort('item_id')}>ID</td>
                        <td className='sortable' onClick={() => handleSort('item_name')}>Name</td>
                        <td className='sortable' onClick={() => handleSort('display_name')}>Display Name</td>
                        <td className='sortable' onClick={() => handleSort('category')}>Category</td>
                        <td className='non-sortable'>Size</td>
                        <td className='non-sortable'>Ingredients</td>
                        <td className='sortable' onClick={() => handleSort('price')}>Price</td>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        sortedMenuTable.map((item, key) =>
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