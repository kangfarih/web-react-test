import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faBars } from "@fortawesome/free-solid-svg-icons";

class Header extends React.Component {
  render() {
    return (
      <div className="header">
        <section className="logo">{`(๑>ᴗ<๑)`}</section>
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
        </section>
      </div>
    );
  }
}

export default Header;
