import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Photo.css";

export class Photo extends Component {
  render() {
    const { photo, history } = this.props;

    return (
      <div className="Photo">
        <div
          onClick={() => {
            history.push(`photos/${photo.id}`);
          }}
          className="Photo-Layer"
        ></div>
        <div className="small-display">
          <div className="pb-3">
            <div className="d-flex align-items-center">
              <Link to={`/user/${photo.user.username}`}>
                <img
                  className="rounded-circle"
                  src={photo.user.profile_image.large}
                  alt={photo.user.name}
                />
              </Link>
              <Link to={`/user/${photo.user.username}`}>
                <p className="pl-3 m-0">{photo.user.name}</p>
              </Link>
            </div>
          </div>
        </div>
        <div style={{ background: photo.color }}>
          <img src={photo.urls.small} alt={photo.alt_description} />
        </div>
        <div className="small-display ">
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
        <div className="Photo-Info">
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

export default Photo;
