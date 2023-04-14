import "../App.css";
import "../css/customer_view.css";
import { useNavigate } from "react-router-dom";

function Customer() {
    const navigate = useNavigate();
    return (
        <div className="View">
            <div className="Main-body">
                <h1>Welcome valued customer!</h1>
                <button className="nav-button" onClick={() => navigate("/")}>Back Home</button>
            </div>
        </div>
    );
}

export default Customer;