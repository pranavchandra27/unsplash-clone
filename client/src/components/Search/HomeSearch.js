import React, { Component } from "react";
import { PhotoSearchContext } from "../../context/PhotoSearchContext";
import "./HomeSearch.css";
import Axios from "axios";

class HomeSearch extends Component {
  static contextType = PhotoSearchContext;
  state = {
    value: "",
    backImg: "",
    color: "#aaa"
  };

  async componentDidMount() {
    await Axios.get(`photos/random?value=landscape`).then(res => {
      this.setState({
        backImg: res.data[0].urls.full,
        color: res.data[0].color
      });
    });
  }

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
    const { value, backImg, color } = this.state;
    return (
      <div>
        <div
          style={{ backgroundImage: `url(${backImg})`, backgroundColor: color }}
          className="d-flex flex-column justify-content-center align-items-center HomeSearch"
        >
          <div className="HomeSearch-headings text-white">
            <h1 className="display-4">Splash</h1>
            <p>Download free high-resolution photos</p>
            <p>Photos from creators everywhere</p>
          </div>
          <form className="HomeSearch-form" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <input
                required
                className="form-control form-control-lg"
                type="search"
                value={value}
                placeholder="Search free high-resolution photos"
                onChange={e => this.setState({ value: e.target.value })}
              />
              <button type="submit">
                <i className="fas fa-search text-secondary"></i>
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default HomeSearch;
