import React, { useState, useEffect } from 'react'
// import {defaultMethod} from "react-router-dom/dist/dom";

function MenuManage({setSection}){
    const [menuTable, setMenuTable] = useState([])
    const [selectedItem, setSelectedItem] = useState("None")
    const [sortConfig, setSortConfig] = useState({ column: 'item_name', direction: 'asc' });
    const [showAddForm, setShowAddForm] = useState(false);
    const [showModifyForm, setShowModifyForm] = useState(false);
    const [inventoryItems, setInventoryItems] = useState([]);

    const fetchInventoryItems = async () => {
        try {
            const response = await fetch('http://localhost:5000/management/inventory');
            const data = await response.json();
            const ingredients = data.map((item) => item.inventory_name);
            setInventoryItems(ingredients);
        } catch (error) {
            console.error('Error fetching inventory items:', error);
        }
    };

    useEffect(() => {
        fetchInventoryItems(); //.then(r => null);
    }, []);
    const handleAddMenuItemClick = () => {
        setShowAddForm(true);
        setShowModifyForm(false);
    };
    const handleModifyMenuItemClick = () => {
        setShowAddForm(false);
        setShowModifyForm(true);
    };

    const handleFormCancel = () => {
        setShowAddForm(false);
        setShowModifyForm(false);
    }

    const handleRemoveMenuItemClick = (item) => {
        // useEffect(() => {
        fetch("http://localhost:5000/management/menuitems", {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ item_name: item.item_name })
        }).then(response => response.json())
        fetch("http://localhost:5000/management/menuitems")
            .then(response => response.json())
            .then(result => setMenuTable(result));
        // }, []);
    };

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

    const AddForm = ({ inventoryItems }) => {
        const [internalName, setInternalName] = useState('');
        const [displayName, setDisplayName] = useState('');
        const [category, setCategory] = useState('');
        const [sized, setSized] = useState(false);
        const [ingredients, setIngredients] = useState([{ name: '', amount: 1 }]);
        const [price, setPrice] = useState('');
        const ingredientsList = inventoryItems;

        const handleSubmit = (e) => {
            e.preventDefault();
            // useEffect(() => {
            fetch("http://localhost:5000/management/menuitems", {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ "category": category, "name": internalName, "display": displayName, "ingredients": ingredients, "sized": sized, "price": price})
            }).then(response => response.json())
            fetch("http://localhost:5000/management/menuitems")
                .then(response => response.json())
                .then(result => setMenuTable(result));
            // }, []);
            setShowAddForm(false)

        };

        const addIngredient = () => {
            setIngredients([...ingredients, { name: '', amount: 1 }]);
        };

        const removeIngredient = (index) => {
            setIngredients(ingredients.filter((_, i) => i !== index));
        };

        const updateIngredient = (index, field, value) => {
            setIngredients(
                ingredients.map((ingredient, i) =>
                    i === index ? { ...ingredient, [field]: value } : ingredient
                )
            );
        };

        const categories = ["espresso-drinks", "tea-hot-iced", "bakery-coremark", "coffee_hot_iced", "add-on", "frappuccino-and-blended"];
        return (
            <form onSubmit={handleSubmit}>
                <label>
                    Internal Name:
                    <input
                        type="text"
                        value={internalName}
                        onChange={(e) => setInternalName(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    Display Name:
                    <input
                        type="text"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    Category:
                    <select value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value="">Select a category</option>
                        {categories.map((cat) => (
                            <option key={cat} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </select>
                </label>
                <br />
                <label>
                    Sized:
                    <input
                        type="checkbox"
                        checked={sized}
                        onChange={(e) => setSized(e.target.checked)}
                    />
                </label>
                <br />
                <div>
                    <label>Ingredients:</label>
                    {ingredients.map((ingredient, index) => (
                        <div key={index}>
                            <select
                                value={ingredient.inventory_name}
                                onChange={(e) => updateIngredient(index, 'name', e.target.value)}
                            >
                                <option value="">{ingredient.inventory_name}</option>
                                {ingredientsList.map((item) => (
                                    <option key={item} value={item}>
                                        {item}
                                    </option>
                                ))}
                            </select>
                            <input
                                type="number"
                                min="0.01"
                                step="0.01"
                                value={ingredient.amount}
                                onChange={(e) =>
                                    updateIngredient(index, 'amount', parseInt(e.target.value, 10))
                                }
                            />
                            <button type="button" onClick={() => addIngredient()}>
                                +
                            </button>
                            {index > 0 && (
                                <button type="button" onClick={() => removeIngredient(index)}>
                                    -
                                </button>
                            )}
                        </div>
                    ))}
                </div>
                <br />
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
                <button type="submit">Submit</button>
            </form>
        );
    };

    const ModifyForm = ({ inventoryItems, item }) => {
        const [ingredients, setIngredients] = useState([]);
        const [price, setPrice] = useState('');

        const fetchItemData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/management/getitem`,{
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({'name': item.item_name})
                });
                const data = await response.json();
                setIngredients(data.ingredients);
                setPrice(data.price);
            } catch (error) {
                console.error('Error fetching item data:', error);
            }
        };

        useEffect(() => {
            fetchItemData();
        }, []);

        const handleSubmit = async (e) => {
            e.preventDefault();
            fetch("http://localhost:5000/management/menuitems", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "name": item.item_name,
                    "ingredients": ingredients,
                    "price": price
                })
            });
                // const data = await response.json();
                // Handle the response data as needed
            setShowModifyForm(false);
        };

        const updateIngredient = (index, field, value) => {
            setIngredients(
                ingredients.map((ingredient, i) =>
                    i === index ? { ...ingredient, [field]: value } : ingredient
                )
            );
        };

        return (
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Ingredients:</label>
                    {ingredients.map((ingredient, index) => (
                        <div key={index}>
                            <select
                                value={ingredient.inventory_name}
                                onChange={(e) => updateIngredient(index, 'name', e.target.value)}
                            >
                                <option value="">Select an ingredient</option>
                                {inventoryItems.map((item) => (
                                    <option key={item} value={item}>
                                        {item}
                                    </option>
                                ))}
                            </select>
                            <input
                                type="number"
                                min="0.01"
                                step="0.01"
                                value={ingredient.amount}
                                onChange={(e) =>
                                    updateIngredient(index, 'amount', parseFloat(e.target.value))
                                }
                            />
                        </div>
                    ))}
                </div>
                <br />
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
                <button type="submit">Submit</button>
                <button type="button" onClick={handleFormCancel}>Cancel</button>
            </form>
        );
    };

    return (
        <div>

            <div className='manager-action-bar'>
                <div className='managing-buttons'>
                    <button className='manage-button' onClick={() => handleAddMenuItemClick()}>Add Menu Item</button>
                    <button className='manage-button' onClick={() => handleRemoveMenuItemClick(selectedItem)}>Remove Menu Item</button>
                    <button className='manage-button' onClick={() => handleModifyMenuItemClick()}>Modify Menu Item</button>
                </div>
                <div className='show-selected'>{selectedItem !== "None" ? selectedItem.item_name : "No item selected"}</div>
            </div>
            {showAddForm && <AddForm inventoryItems={inventoryItems}/>}
            {showModifyForm && <ModifyForm inventoryItems={inventoryItems} item={selectedItem}/>}

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