import "../App.css"
import { useEffect, useState } from 'react';

function Server() {
    const [data, setData] = useState([]);
    useEffect(() => {
      fetch("http://localhost:5000/menu-items")
        .then(response => response.json())
        .then(result => setData(result));
    }, [])

    return (
        <ul>
        {data.map(item => (
          <li>{item.name}, {item.category}</li>
        ))}
        </ul>
    );
}

export default Server;
