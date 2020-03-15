import React, { Component } from "react";
import NavSearch from "../Search/NavSearch";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { Link } from "react-router-dom";
import "./Navbar.css";

export class Navbar extends Component {
  render() {
    const { history, match, location } = this.props;
    const active = location.pathname === "/collections" ? "active" : "";
    return (
      <div className="Navbar">
        <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light">
          <Link className="navbar-brand" to="/">
            Splash
          </Link>
          <div className="Nav-Search mr-auto">
            <NavSearch history={history} match={match} />
          </div>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item mr-2">
                <Link className={`nav-link ${active}`} to="/collections">
                  Collections
                </Link>
              </li>
              <li className="nav-item border-left">
                <Link className="pl-4 nav-link" to="/">
                  Login
                </Link>
              </li>
            </ul>
          </div>
          <div className="More-Options">
            <DropdownButton
              key="left"
              id="dropdown-button-drop-left"
              drop="left"
              title="More"
              variant="outline-secondary"
            >
              <Dropdown.Item eventKey="1">
                <Link className="nav-link p-0 text-dark" to="/collections">
                  Collections
                </Link>
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item eventKey="4">
                <Link className="nav-link p-0 text-dark" to="/login">
                  Login
                </Link>
              </Dropdown.Item>
            </DropdownButton>
          </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;
