import React from "react";
import './logout.css';
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.setItem("accountLogged", false);
        localStorage.setItem("loggedUser", null);
        localStorage.setItem("userEmail", null);
        navigate("/");
    }
    return (
        <div className="wrapper__logout">
            <input className="logoutBtn" type="button" value="Logout" onClick={logout}></input>
        </div>
    );
}

export default Logout;