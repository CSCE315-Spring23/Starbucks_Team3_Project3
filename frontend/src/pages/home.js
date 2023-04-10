import "../App.css"
import "../css/home.css"
import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();
    return (
        <div className="App">
            <h2>Welcome to Starbucks!</h2>
            <button className="nav-button" onClick={() => navigate("/server")}>Server Page</button>
        </div>
    );
}

export default Home;
