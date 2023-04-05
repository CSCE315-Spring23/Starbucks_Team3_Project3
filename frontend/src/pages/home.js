import "../App.css"
import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();
    return (
        <div>
            <h2>Howdy! This is the home page!</h2>
            <button onClick={() => navigate("/server")}>Server Page</button>
            <button onClick={() => navigate("/manager")}>Manager Page</button>
        </div>
    );
}

export default Home;
