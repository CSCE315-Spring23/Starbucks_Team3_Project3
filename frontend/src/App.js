import { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/serve")
      .then(response => response.json())
      .then(result => setData(result));
  }, [])
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <ul>
        {data.map(item => (
          <li>{item.name}</li>
        ))}
        </ul>
      </header>
    </div>
  );
}

export default App;
