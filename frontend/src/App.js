import './App.css';
import './fonts/TTF/Atkinson-Hyperlegible-Bold-102.ttf'
import './fonts/TTF/Atkinson-Hyperlegible-BoldItalic-102.ttf'
import './fonts/TTF/Atkinson-Hyperlegible-Italic-102.ttf'
import './fonts/TTF/Atkinson-Hyperlegible-Regular-102.ttf'

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

import Customer from "./pages/customer_view"
import MenuBoard from "./pages/menu_board_view"
import Server from "./pages/server_view"
import Manager from "./pages/manager_view"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Customer/>} />
        <Route path="/menu-board" element={<MenuBoard/>}/>
        <Route path="/server" element={<Server/>}/>
        <Route path="/manager" element={<Manager/>}/>
      </Routes>
    </Router>
  );
}

export default App;
