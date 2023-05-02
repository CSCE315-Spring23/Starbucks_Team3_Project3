import React, { useState, useEffect } from 'react'

function TransactionsManage(){
    const [menuTable, setMenuTable] = useState([])
    const [sortConfig, setSortConfig] = useState({ column: 'transaction_id', direction: 'desc' });

    const handleSort = (column) => {
        if (column === 'items') return;

        let direction = 'asc';
        if (sortConfig.column === column && sortConfig.direction === 'asc') {
            direction = 'desc';
        }

        setSortConfig({ column, direction });
    };

    const sortedMenuTable = React.useMemo(() => {
        const sortableColumns = ['id', 'count', 'employee', 'game_day', 'total'];
        const dateColumns = ['date'];

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
        fetch("http://localhost:5000/management/transactions")
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
                Transactions
            </div>

            <div className='manager-table'>
                <table className='menu-table' border='1'>
                    <thead>
                    <tr>
                        <td className='sortable' onClick={() => handleSort('id')}>ID</td>
                        <td className='sortable' onClick={() => handleSort('date')}>Date</td>
                        <td className='sortable' onClick={() => handleSort('count')}>Order Size</td>
                        <td className='non-sortable'>Order List</td>
                        <td className='sortable' onClick={() => handleSort('employee')}>Employee</td>
                        <td className='sortable' onClick={() => handleSort('game_day')}>Game Day</td>
                        <td className='sortable' onClick={() => handleSort('total')}>Total</td>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        sortedMenuTable.map((item, key) =>
                            <tr key={key}>
                                <td>{item.id}</td>
                                <td>{new Date(item.date).toLocaleDateString("en-US")}</td>
                                <td>{item.count}</td>
                                <td>{item.items}</td>
                                <td>{item.employee}</td>
                                <td>{item.game_day ? "True" : "False"}</td>
                                <td>{item.total}</td>
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

export default TransactionsManage