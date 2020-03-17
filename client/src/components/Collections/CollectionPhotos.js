import React, { Component } from "react";
import axios from "axios";
import Masonry from "react-masonry-component";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "../Spinner/Spinner";
import "./CollectionPhotos.css";
import { Link } from "react-router-dom";

export class CollectionPhotos extends Component {
  state = {
    photos: [],
    page: 1,
    title: "",
    description: "",
    author: "",
    total_photos: "",
    profile: "",
    username: ""
  };

  componentDidMount() {
    this.fetchCollectionPhotos();
    this.fetchCollectionDetails();
  }

  addPhotos = data => {
    this.setState({ photos: this.state.photos.concat(data) });
  };

  fetchCollectionDetails = async () => {
    const { match } = this.props;
    await axios
      .get(`/collection/${match.params.id}?id=${match.params.id}`)
      .then(res => {
        this.setState({
          title: res.data.title,
          description: res.data.description,
          author: res.data.user.name,
          total_photos: res.data.total_photos,
          profile: res.data.user.profile_image.small,
          username: res.data.user.username
        });
      });
  };

  fetchCollectionPhotos = async () => {
    const { match } = this.props;
    const { page } = this.state;

    await axios
      .get(`/collections/${match.params.id}?id=${match.params.id}&page=${page}`)
      .then(res => this.addPhotos(res.data));
    this.setState({ page: page + 1 });
  };

  render() {
    const { history } = this.props;
    const {
      photos,
      title,
      description,
      author,
      total_photos,
      profile,
      username
    } = this.state;
    return !title ? (
      ""
    ) : (
      <div className="CollectionPhotos">
        <div className="CollectionPhotos-Top">
          <h1 className="text-wrapper text-trauncate CollectionPhotos-Title">
            {title}
          </h1>
          <p className="CollectionPhotos-Desc">{description}</p>
          <p className="mt-3 CollectionPhotos-Author text-dark">
            <Link to={`/user/${username}`}>
              <img className="mr-2 rounded-circle" src={profile} alt={author} />
              {author}
            </Link>
          </p>
          <p className="CollectionPhotos-PhotoCount text-secondary mt-2">
            {total_photos} photos
          </p>
        </div>
        <InfiniteScroll
          dataLength={photos.length}
          hasMore={true}
          next={this.fetchCollectionPhotos}
          loader={<Spinner />}
        >
          <Masonry
            className={"Collection-Grid"}
            options={{
              gutter: 20,
              fitWidth: true
            }}
          >
            {photos.map(photo => (
              <div className="Collection-Photo" key={photo.id}>
                <div
                  onClick={() => history.push(`/photos/${photo.id}`)}
                  className="Photo-Layer"
                ></div>
                <div className="small-display px-2">
                  <div className="pb-2">
                    <div className="d-flex align-items-center">
                      <Link to={`/user/${photo.user.username}`}>
                        <img
                          className="rounded-circle"
                          src={photo.user.profile_image.large}
                          alt={photo.user.name}
                        />
                      </Link>
                      <Link to={`/user/${photo.user.username}`}>
                        <p className="pl-2 m-0">{photo.user.name}</p>
                      </Link>
                    </div>
                  </div>
                </div>
                <div style={{ background: photo.color }}>
                  <img src={photo.urls.small} alt={photo.alt_description} />
                </div>
                <div className="small-display px-2">
                  <div className="pt-2 d-flex justify-content-between">
                    <div className="d-flex">
                      <p className="m-0">
                        <i className="far fa-heart"></i>
                      </p>
                      <p className="m-0 pl-3">
                        <i className="far fa-plus-square"></i>
                      </p>
                    </div>
                    <div>
                      <a
                        rel="noopener noreferrer"
                        target="_blank"
                        href={photo.links.download}
                        className="text-dark"
                      >
                        <i className="fas fa-download"></i>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="Collection-Photo-Info">
                  <div className="Top-Icon">
                    <p>
                      <i className="far fa-heart"></i>
                    </p>
                    <p>
                      <i className="far fa-plus-square"></i>
                    </p>
                  </div>
                  <div className="User">
                    <div className="User-Info m-0">
                      <Link to={`/user/${photo.user.username}`}>
                        <img
                          className="Profile"
                          src={photo.user.profile_image.small}
                          alt={photo.user.name}
                        />
                      </Link>
                      <p className="Name">
                        <Link to={`/user/${photo.user.username}`}>
                          {photo.user.name}
                        </Link>
                      </p>
                    </div>
                    <a href={photo.links.download} className="Download">
                      <i className="fas fa-download"></i>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </Masonry>
        </InfiniteScroll>
      </div>
    );
  }
}

export default CollectionPhotos;
