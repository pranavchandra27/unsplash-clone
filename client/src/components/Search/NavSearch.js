import React, { Component } from "react";
import { PhotoSearchContext } from "../../context/PhotoSearchContext";
import "./NavSearch.css";

export class NavSearch extends Component {
  static contextType = PhotoSearchContext;
  state = {
    value: ""
  };

  handleSubmit = async e => {
    e.preventDefault();
    const { value } = this.state;
    const { history } = this.props;
    const { photos, setQuery, fetchPhotos } = this.context;
    await setQuery(value);
    photos.splice(0, photos.length);
    fetchPhotos();
    history.push(`/s/photos/${value}`);
  };

  render() {
    return (
      <div className="NavSearch">
        <form onSubmit={this.handleSubmit} className="NavSearch-Form">
          <input
            required
            className="NavSearch-Input"
            type="search"
            value={this.state.value}
            placeholder="Search high-resolution photos"
            onChange={e => this.setState({ value: e.target.value })}
          />
          <button className="NavSearch-Button" type="submit">
            <i className="fas fa-search"></i>
          </button>
        </form>
      </div>
    );
  }
}

export default NavSearch;
