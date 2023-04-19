import "../App.css"
import "../css/home.css"
import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();
    return (
        <div className="App">
            <div className="home-page-frame">
                <h2>Welcome to Starbucks!</h2>
                <button className="nav-button" onClick={() => navigate("/server")}>Server Page</button>
                <button className="nav-button" onClick={() => navigate("/customer")}>Customer Page</button>
                <button className="nav-button" onClick={() => navigate("/manager")}>Manager Page</button>
            </div>
        <div>
            <h2>Howdy! This is the home page!</h2>
            <button onClick={() => navigate("/server_view.js")}>Server Page</button>
            <button onClick={() => navigate("/manager_view.js")}>Manager Page</button>
        </div>
    );
}

export default Home;
