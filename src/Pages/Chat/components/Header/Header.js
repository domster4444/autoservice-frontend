import React from "react";
import { Link } from "react-router-dom";
import "./style.css";
const Header = (props) => {
  return (
    <header className='header'>
      <div style={{ display: "flex" }}>
        <div className='logo'>Web Messenger</div>
        <ul className='leftMenu'>
          <li>
            <Link to='/chat'>Chat</Link>
          </li>
          <li>
            <Link to='/chat-login'>Login</Link>
          </li>
          <li>
            <Link to='/chat-register'>Register</Link>
          </li>
        </ul>
      </div>

      <div style={{ margin: "20px 0", color: "#fff", fontWeight: "bold" }}>Hi Riz</div>

      <ul className='menu'>
        <li>
          <Link to='#' onClick={props.logout}>
            Logout
          </Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
