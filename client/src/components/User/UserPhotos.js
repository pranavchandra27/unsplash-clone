import React, { Component } from "react";
import axios from "axios";
import Masonry from "react-masonry-component";
import InfiniteScroll from "react-infinite-scroll-component";
import UserPhoto from "./UserPhoto";
import "./UserPhotos.css";

class UserPhotos extends Component {
  state = {
    photos: [],
    page: 1
  };

  componentDidMount() {
    this.fetchUserPhotos();
  }

  fetchUserPhotos = async () => {
    const { match } = this.props;
    const { page, photos } = this.state;
    await axios
      .get(`/users/photos?username=${match.params.username}&page=${page}`)
      .then(res => this.setState({ photos: photos.concat(res.data) }));
    this.setState({ page: page + 1 });
  };
  render() {
    const { history } = this.props;
    const { photos } = this.state;
    return (
      <div className="User-Photos">
        <InfiniteScroll
          dataLength={photos.length}
          hasMore={true}
          next={this.fetchUserPhotos}
          endMessage="No More Photos"
        >
          <Masonry
            className={"UserPhotos-Grid"}
            options={{
              gutter: 20,
              fitWidth: true
            }}
          >
            {photos.map(photo => (
              <UserPhoto history={history} photo={photo} />
            ))}
          </Masonry>
        </InfiniteScroll>
      </div>
    );
  }
}

export default UserPhotos;
