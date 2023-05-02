import React, { useState, useEffect } from 'react'

function SalesManage(){
    const [menuTable, setMenuTable] = useState([])
    const [sortConfig, setSortConfig] = useState({ column: 'date', direction: 'desc' });

    const handleSort = (column) => {
        // if (column === 'size' || column === 'ingredients') return;

        let direction = 'asc';
        if (sortConfig.column === column && sortConfig.direction === 'asc') {
            direction = 'desc';
        }

        setSortConfig({ column, direction });
    };

    const sortedMenuTable = React.useMemo(() => {
        const sortableColumns = ['game_day', 'total_orders', 'total_sales'];
        const dateColumns = ['date']

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
        else if(sortConfig.column && dateColumns.includes(sortConfig.column)){
            return [...menuTable].sort((a, b) => {

                const aValue = new Date(a[sortConfig.column]);
                const bValue = new Date(b[sortConfig.column]);

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
        fetch("http://localhost:5000/management/sales")
            .then(response => response.json())
            .then(result => setMenuTable(result));
    }, []);

    return (
        <div>

            <div className='manager-action-bar'>
                {/*<div className='managing-buttons'>*/}
                {/*    <button className='manage-button'>Add Menu Item</button>*/}
                {/*    <button className='manage-button'>Remove Menu Item</button>*/}
                {/*    <button className='manage-button'>Modify Menu Item</button>*/}
                {/*</div>*/}
                {/*<div className='show-selected'>{selectedItem !== "None" ? selectedItem.item_name : "No item selected"}</div>*/}
                Sales
            </div>

            <div className='manager-table'>
                <table className='menu-table' border='1'>
                    <thead>
                    <tr>
                        <td className='sortable' onClick={() => handleSort('date')}>Date</td>
                        <td className='sortable' onClick={() => handleSort('total_orders')}>Total Orders</td>
                        <td className='sortable' onClick={() => handleSort('total_sales')}>Total Sales</td>
                        <td className='sortable' onClick={() => handleSort('game_day')}>Game Day</td>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        sortedMenuTable.map((item, key) =>
                            <tr key={key}>
                                <td>{new Date(item.date).toLocaleDateString("en-US")}</td>
                                <td>{item.total_orders}</td>
                                <td>{item.total_sales}</td>
                                <td>{item.game_day ? "True" : "False"}</td>
                                {/*<td><button className='button-5' onClick={() => setSelectedItem(item)}>Select</button></td>*/}
                            </tr>
                        )
                    }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default SalesManage