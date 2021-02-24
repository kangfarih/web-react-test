import React from "react";

class Header extends React.Component {
  render() {
    return (
      <div className="header">
        <section className="logo">{`(๑>ᴗ<๑)`}</section>
        <section className="search-bar">Search Bar</section>
        <section className="nav-bar">Nav bar</section>
      </div>
    );
  }
}

export default Header;
