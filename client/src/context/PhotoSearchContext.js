import React, { Component, createContext } from "react";
import axios from "axios";

export const PhotoSearchContext = createContext();

export class PhotoSearchProvider extends Component {
  state = {
    query: "",
    photos: [],
    page: 1
  };

  async componentDidMount() {
    localStorage.removeItem("query");
    await this.getQuery();
    this.fetchPhotos();
  }

  setQuery = value => {
    localStorage.removeItem("query");
    localStorage.setItem("query", value);
  };

  addPhotos = photos => {
    this.setState({ photos: this.state.photos.concat(photos) });
  };

  getQuery = () => {
    const value = localStorage.getItem("query");
    this.setState({ query: value });
  };

  fetchPhotos = async () => {
    this.getQuery();
    const { query, page } = this.state;
    await axios.get(`/search?query=${query}&page=${page}`).then(res => {
      // console.log(res.data);
      this.addPhotos(res.data.results);
    });
    this.setState({ page: page + 1 });
  };

  render() {
    return (
      <PhotoSearchContext.Provider
        value={{
          photos: this.state.photos,
          query: this.state.query,
          fetchPhotos: this.fetchPhotos,
          setQuery: this.setQuery
        }}
      >
        {this.props.children}
      </PhotoSearchContext.Provider>
    );
  }
}
