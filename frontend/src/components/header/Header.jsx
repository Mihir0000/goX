import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './header.css';

export const Header = () => {
    const navigate = useNavigate();
    const logout = () => {
        localStorage.clear();
        navigate('/login');
    };
    return (
        <div>
            <Dropdown id="header_btn">
                <Dropdown.Toggle variant="light" id="dropdown-basic">
                    <img
                        className="header_icon"
                        alt="shutdown"
                        src="https://img.icons8.com/pastel-glyph/64/000000/shutdown--v4.png"
                    />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
};
