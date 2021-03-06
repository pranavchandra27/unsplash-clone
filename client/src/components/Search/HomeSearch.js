import React, { Component } from "react";
import { PhotoSearchContext } from "../../context/PhotoSearchContext";
import "./HomeSearch.css";
import axios from "axios";

class HomeSearch extends Component {
  static contextType = PhotoSearchContext;
  state = {
    value: "",
    backImg: "",
    color: "#aaa",
    url: ""
  };

  componentDidMount() {
    this.fetchRndmImg();
  }

  fetchRndmImg = async () => {
    await axios.get(`photos/random?value=landscape`).then(res => {
      this.setState({
        url: res.data[0].urls.full,
        color: res.data[0].color,
        backImg: res.data[0].urls.regular
      });
    });
  };

  // getData = () => {
  //   const url = localStorage.getItem("url");
  //   if (url === "") {
  //     this.setState({ backImg: url });
  //   } else {
  //     this.setState({
  //       backImg:
  //         "https://images.unsplash.com/photo-1581656506224-6eae257ceb04?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjEwNDIwNH0"
  //     });
  //   }
  // };

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
            <h1>Splash</h1>
            <p>Download free high-resolution photos</p>
            <p className="pb-3 pt-2">Photos from creators around the world</p>
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
