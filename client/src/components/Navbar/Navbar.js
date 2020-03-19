import React, { Component } from "react";
import NavSearch from "../Search/NavSearch";
import { Link } from "react-router-dom";
import "./Navbar.css";

export class Navbar extends Component {
  render() {
    const { history, match, location } = this.props;
    const activeCollection =
      location.pathname === "/collections" ? "active" : "";
    const activeHome = location.pathname === "/" ? "active" : "";
    return (
      <div className="Navbar">
        {location.pathname === "/m/search" ? (
          <div className="py-2 d-flex">
            <NavSearch history={history} match={match} />
            <button
              className="btn btn-light btn-sm pl-2"
              aria-label="Close"
              onClick={() => history.goBack()}
            >
              Cancel
            </button>
          </div>
        ) : (
          <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" to="/">
              Splash
            </Link>
            <div className="Nav-Search mr-auto">
              <NavSearch history={history} match={match} />
            </div>
            <div className="mobile-nav">
              <ul className="nav nav-pills justify-content-around">
                <li className="nav-item">
                  <Link className={`nav-link ${activeHome}`} to="/">
                    <i className="fas fa-home"></i>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${activeCollection}`}
                    to="/collections"
                  >
                    <i className="fas fa-layer-group"></i>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/m/search">
                    <i className="fas fa-search"></i>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item mr-2">
                  <Link
                    className={`nav-link ${activeCollection}`}
                    to="/collections"
                  >
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
          </nav>
        )}
      </div>
    );
  }
}

export default Navbar;
