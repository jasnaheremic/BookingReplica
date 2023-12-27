/*import { useContext } from "react";
import "./navbar.css"
import {Link} from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
const{user} = useContext(AuthContext);

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{color:"inherit", textDecoration:"none"}}>
        <span className="logo">FejkBooking</span>
        </Link>
        {user ? user.username : (<div className="navItems">
          <button className="navButton">Register</button>
          <button className="navButton">Login</button>
        </div>)}
      </div>
    </div>
  )
}

export default Navbar*/

import { useContext } from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const { user, loading } = useContext(AuthContext);

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">FejkBooking</span>
        </Link>
        {loading ? (
          <div className="navItems">
            <button className="navButton">Register</button>
            <button className="navButton">Login</button>
          </div>
        ) : (
          user && <span>{user.username}</span> 
        )}
      </div>
    </div>
  );
};

export default Navbar;
