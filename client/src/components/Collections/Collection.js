import React, { Component } from "react";
import "./Collection.css";

export class Collection extends Component {
  render() {
    const { collection, history } = this.props;
    return (
      <div className="Collection">
        <div className="Card">
          <div
            onClick={() =>
              history.push(`/collections/${collection.id}/${collection.title}`)
            }
            className="Card-Layer"
          ></div>
          <div className="Cover-Photo">
            <img
              src={collection.preview_photos[0].urls.small}
              alt={collection.cover_photo.alt_description}
            />
          </div>
          <div className="Preview-Photo">
            <img
              src={collection.preview_photos[1].urls.small}
              alt={collection.cover_photo.alt_description}
            />
            <img
              src={collection.preview_photos[2].urls.small}
              alt={collection.cover_photo.alt_description}
            />
          </div>
        </div>
        <div className="Collection-Info">
          <h5
            onClick={this.handleClick}
            className="Title text-nowrap text-truncate mb-1 mt-2"
          >
            {collection.title}
          </h5>
          <p className="Subtitle text-nowrap text-truncate p-0">
            {collection.total_photos} photos - Curated by {collection.user.name}
          </p>
        </div>
      </div>
    );
  }
}

export default Collection;
