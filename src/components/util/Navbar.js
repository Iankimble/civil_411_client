import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Nav, Navbar } from "react-bootstrap";
import style from "../style/PrimaryStyling.module.css";

class NavBar extends Component {
  render() {
    return (
      <Navbar
        collapseOnSelect
        expand="lg"
        style={{ width: "auto" }}
        className={style.navbar}
      >
        <Navbar.Brand>
          <Link id="RouterNavLink" to="/" className={style.nav}>
            Civil 411
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="ml-auto">
            <Link to="/learn" className={style.nav}>
              Learn
            </Link>
            <Link to="/resource" className={style.nav}>
              Resources
            </Link>
            <Link to="/about" className={style.nav}>
              About
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default withRouter(NavBar);
