import "../App.css"
import { useEffect, useState } from 'react';

function Server() {
    const [data, setData] = useState([]);
    useEffect(() => {
      fetch("http://localhost:5000/menu-items")
        .then(response => response.json())
        .then(result => setData(result));
    }, []);

    const [transactionID, setTransactionID] = useState([]);
    useEffect(() => {
      fetch("http://localhost:5000/orderlist")
        .then(response => response.json())
        .then(result => setTransactionID(result));
    }, []);

    const [checked, setChecked] = useState(false);


    const handleChange = () => {
        setChecked(!checked);
    };

    return (
        <div>
            <h2>Menu Items</h2>
            <h3>Transaction ID: {transactionID.transaction_id}</h3>

            <form action="/">
                {data.map(item => (
                    <label>
                        <input type="checkbox" id={item.name} onChange={handleChange} />
                        Name: {item.name} | Catetory: {item.category}<br></br>
                    </label>
                ))}
            </form>
            <button>Add Item</button>
            <button>Submit Transaction</button>
        </div>
    );
}

export default Server;
