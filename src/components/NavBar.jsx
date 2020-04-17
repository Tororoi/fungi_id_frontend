import React from 'react';
import {NavLink} from 'react-router-dom'

const NavBar = (props) => {
  return(
    <ul className="nav">
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/mushrooms">Mushrooms</NavLink>
      </li>
      <li>
        <NavLink to="/login">Login</NavLink>
      </li>
      <li>
        <NavLink to="/register">Register</NavLink>
      </li>
      <li>
        <NavLink to="/profile">Profile</NavLink>
      </li> 
      <li>
        {props.token && <span onClick={props.handleLogout}>Log out</span>}
      </li>
    </ul>
  )
};

export default NavBar;