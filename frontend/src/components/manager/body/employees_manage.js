import React, { useState, useEffect } from 'react'

function EmployeeManage(){
    const [menuTable, setMenuTable] = useState([])
    const [selectedItem, setSelectedItem] = useState("None")
    const [sortConfig, setSortConfig] = useState({ column: 'employee_name', direction: 'asc' });

    const handleSort = (column) => {
        // if (column === 'size' || column === 'ingredients') return;

        let direction = 'asc';
        if (sortConfig.column === column && sortConfig.direction === 'asc') {
            direction = 'desc';
        }

        setSortConfig({ column, direction });
    };

    const sortedMenuTable = React.useMemo(() => {
        const sortableColumns = ['employee_id', 'employee_name', 'employee_role', 'email'];

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
        fetch("http://localhost:5000/management/employees")
            .then(response => response.json())
            .then(result => setMenuTable(result));
    }, []);

    return (
        <div>

            <div className='manager-action-bar'>
                <div className='managing-buttons'>
                    <button className='manage-button'>Add Employee</button>
                    <button className='manage-button'>Remove Employee</button>
                </div>
                <div className='show-selected'>{selectedItem !== "None" ? selectedItem.employee_name : "No employee selected"}</div>
            </div>

            <div className='manager-table'>
                <table className='menu-table' border='1'>
                    <thead>
                    <tr>
                        <td className='sortable' onClick={() => handleSort('employee_id')}>ID</td>
                        <td className='sortable' onClick={() => handleSort('employee_name')}>Name</td>
                        <td className='sortable' onClick={() => handleSort('employee_role')}>Display Name</td>
                        <td className='sortable' onClick={() => handleSort('email')}>Price</td>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        sortedMenuTable.map((item, key) =>
                            <tr key={key}>
                                <td>{item.employee_id}</td>
                                <td>{item.employee_name}</td>
                                <td>{item.employee_role}</td>
                                <td>{item.email}</td>
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

export default EmployeeManage