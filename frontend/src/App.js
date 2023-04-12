import { useEffect, useState } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import Server from './pages/server_view';
import Home from './pages/home';
import Customer from "./pages/customer_view"
import Manager from "./pages/manager_view"

function App() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/serve")
      .then(response => response.json())
      .then(result => setData(result));
  }, [])
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/server" element={<Server/>} />
        <Route path="/customer" element={<Customer/>} />
        <Route path="/manager" element={<Manager/>} />
      </Routes>
    </Router>
  );
}

export default App;
