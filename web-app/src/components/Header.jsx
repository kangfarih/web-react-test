import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faBars } from "@fortawesome/free-solid-svg-icons";

class Header extends React.Component {
  render() {
    return (
      <div className="header">
        <section className="logo">
          <span className="icon">{`(๑>ᴗ<๑)`}</span>
        </section>
        <section className="search-bar">
          <input type="text" placeholder="Search ..." />
          <button type="submit" className="search-button">
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </section>
        <section className="nav-bar">
          <span className="nav-button">
            <FontAwesomeIcon icon={faBars} />
          </span>
          <ul className="menu">
            <li>Login</li>
            <li>Register</li>
            <li>About</li>
          </ul>
        </section>
      </div>
    );
  }
}

export default Header;
