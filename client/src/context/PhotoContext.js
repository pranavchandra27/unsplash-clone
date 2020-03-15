import React, { Component, createContext } from "react";
import axios from "axios";

export const PhotoContext = createContext();

export class PhotoProvider extends Component {
  state = {
    photos: [],
    page: 1
  };

  addPhotos = photos => {
    this.setState({ photos: this.state.photos.concat(photos) });
  };

  fetchPhotos = async () => {
    const { page } = this.state;
    const data = await axios.get(`/photos?page=${page}`).then(res => res.data);

    this.addPhotos(data);
    this.setState({ page: page + 1 });
  };

  componentDidMount() {
    this.fetchPhotos();
  }

  render() {
    return (
      <PhotoContext.Provider
        value={{ photos: this.state.photos, fetchPhotos: this.fetchPhotos }}
      >
        {this.props.children}
      </PhotoContext.Provider>
    );
  }
}
