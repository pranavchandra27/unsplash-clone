import React, { Component } from "react";
import { PhotoSearchContext } from "../../context/PhotoSearchContext";
import "./SearchPhoto.css";
import { Link } from "react-router-dom";

export class SearchPhoto extends Component {
  static contextType = PhotoSearchContext;

  handleClick = async (title) => {
    const { history } = this.props;
    const { photos, setQuery, fetchPhotos } = this.context;
    await setQuery(title);
    photos.splice(0, photos.length);
    fetchPhotos();
    history.push(`/s/photos/${title}`);
  };
  render() {
    const { photo, history } = this.props;
    const { photos, setQuery, fetchPhotos } = this.context;
    return (
      <div className='SearchPhoto'>
        <div className='SearchPhoto-Photo'>
          <div
            onClick={() => history.push(`/photos/${photo.id}`)}
            className='Photo-Layer'></div>
          <div className='small-display px-2'>
            <div className='pb-2'>
              <div className='d-flex align-items-center'>
                <Link to={`/user/${photo.user.username}`}>
                  <img
                    className='rounded-circle'
                    src={photo.user.profile_image.large}
                    alt={photo.user.name}
                  />
                </Link>
                <Link to={`/user/${photo.user.username}`}>
                  <p className='pl-2 m-0'>{photo.user.name}</p>
                </Link>
              </div>
            </div>
          </div>
          <div
            className='SearchPhoto-Photo'
            style={{ background: photo.color }}>
            <img
              onClick={() => history.push(`/photos/${photo.id}`)}
              src={photo.urls.small}
              alt={photo.alt_description}
            />
          </div>
          <div className='small-display px-2'>
            <div className='pt-2 d-flex justify-content-between'>
              <div className='d-flex'>
                <p className='m-0'>
                  <i className='far fa-heart'></i>
                </p>
                <p className='m-0 pl-3'>
                  <i className='far fa-plus-square'></i>
                </p>
              </div>
              <div>
                <a
                  rel='noopener noreferrer'
                  target='_blank'
                  href={photo.links.download}
                  className='text-dark'>
                  <i className='fas fa-download'></i>
                </a>
              </div>
            </div>
          </div>
          <div className='Photo-Info'>
            <div className='Top-Icon'>
              <p>
                <i className='far fa-heart'></i>
              </p>
              <p>
                <i className='far fa-plus-square'></i>
              </p>
            </div>
            <div className='User'>
              <div className='User-Info m-0'>
                <Link to={`/user/${photo.user.username}`}>
                  <img
                    className='Profile'
                    src={photo.user.profile_image.small}
                    alt={photo.user.name}
                  />
                </Link>
                <p className='Name'>
                  <Link to={`/user/${photo.user.username}`}>
                    {photo.user.name}
                  </Link>
                </p>
              </div>
              <a href={photo.links.download} className='Download'>
                <i className='fas fa-download'></i>
              </a>
            </div>
          </div>
        </div>
        <div className='p-2'>
          <p className='text-nowrap text-dark text-truncate'>
            {photo.alt_description}
          </p>
          {photo.tags.map((tag, i) => (
            <button
              key={i}
              onClick={async () => {
                await setQuery(tag.title);
                photos.splice(0, photos.length);
                fetchPhotos();
                history.push(`/s/photos/${tag.title}`);
              }}
              className='btn btn-light tag mr-2'>
              {tag.title}
            </button>
          ))}
        </div>
      </div>
    );
  }
}

export default SearchPhoto;
