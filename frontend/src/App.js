import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import Customer from "./pages/customer_view"
import Login from "./pages/login_view"
import MenuBoard from "./pages/menu_board_view.js"


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Customer/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/menu-board" element={<MenuBoard/>}/>
      </Routes>
    </Router>
  );
}

export default App;
