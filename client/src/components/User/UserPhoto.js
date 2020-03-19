import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./UserPhoto.css";

class UserPhoto extends Component {
  render() {
    const { photo, history } = this.props;
    return (
      <div className="UserPhoto">
        <div
          onClick={() => {
            history.push(`/photos/${photo.id}`);
          }}
          className="Photo-Layer"
        ></div>
        <div style={{ background: photo.color }}>
          <img
            src={photo.urls.small}
            onClick={() => {
              history.push(`photos/${photo.id}`);
            }}
            alt={photo.alt_description}
          />
        </div>
        <div className="UserPhoto-Info">
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
            <a
              rel="noopener noreferrer"
              target="_blank"
              href={photo.links.download}
              className="Download"
            >
              <i className="fas fa-download"></i>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default UserPhoto;
