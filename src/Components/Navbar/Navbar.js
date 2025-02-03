import React, { useEffect, useState } from 'react'
import { FlimFlix, regularUser } from "../../assets/images";
import './Navbar.css';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState('');
    
    useEffect(() => {
        if(localStorage.getItem("loggedUser") != null){
            setUser(JSON.parse(localStorage.getItem("loggedUser")));
        }
    },[]);

  return (
    <div className="navBar">
      <div className="navBar__image">
        <img src={FlimFlix} alt="FlimFlix Logo" />
      </div>
      <ul>
        <li
          href="#"
          onClick={() => {
            navigate("/");
          }}
        >
          Home
        </li>
        <li
          href="#"
          onClick={() => {
            navigate("/movies");
          }}
        >
          Movies
        </li>
        <li
          href="#"
          onClick={() => {
            navigate("/series");
          }}
        >
          TV Series
        </li>
        <li
          href="#"
          onClick={() => {
            navigate("/docs");
          }}
        >
          Documentaries
        </li>
      </ul>
      <div
        className="navBar__user"
        onClick={() => {
          if (localStorage.getItem("loggedUser") === "null") {
            navigate("/login");
          } else {
            navigate("/logout");
          }
        }}
      >
        <div>
          <img src={regularUser} alt="Regular User" />
          <p>{user?.name || "Guest"}</p>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
