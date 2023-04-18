import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

import Login from "./pages/login_view"

import Customer from "./pages/customer_view"
import MenuBoard from "./pages/menu_board_view"
import Server from "./pages/server_view"
import Manager from "./pages/manager_view"



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login/>} />

        <Route path="/" element={<Customer/>} />
        <Route path="/menu-board" element={<MenuBoard/>}/>
        <Route path="/server" element={<Server/>}/>
        <Route path="/manager" element={<Manager/>}/>
      </Routes>
    </Router>
  );
}

export default App;
