import React from "react";
import { Dropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./header.css";

export const Header = () => {
  const navigate = useNavigate();
    const logout=()=>{
        localStorage.clear()
        navigate("/login")
    }
  return (
    <div>
     <Dropdown id="header_btn">
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        <img className="profile_icon" src="https://img.icons8.com/color/48/000000/user.png" />
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {localStorage.getItem('email') ? <Dropdown.Item onClick={logout}>Logout</Dropdown.Item> : <Dropdown.Item><Link to='login'>login</Link></Dropdown.Item>}
        
      </Dropdown.Menu>
    </Dropdown>
    </div>
  );
};
