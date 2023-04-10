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
