import React, { Component } from "react";
import { PhotoContext } from "../../context/PhotoContext";
import Masonry from "react-masonry-component";
import InfiniteScroll from "react-infinite-scroll-component";
import Photo from "./Photo";
import Spinner from "../Spinner/Spinner";
import "./Photos.css";
import HomeSearch from "../Search/HomeSearch";

export class Photos extends Component {
  static contextType = PhotoContext;
  render() {
    const { photos, fetchPhotos } = this.context;
    const { history } = this.props;
    return (
      <>
        <HomeSearch history={history} />
        <div className="Photos">
          <InfiniteScroll
            className={"InfiniteScroll"}
            dataLength={photos.length}
            hasMore={true}
            next={fetchPhotos}
            loader={<Spinner />}
          >
            <Masonry
              className={"Photos-Grid"}
              options={{
                gutter: 20,
                fitWidth: true
              }}
            >
              {photos.map(photo => (
                <div key={photo.id}>
                  <Photo history={history} photo={photo} />
                </div>
              ))}
            </Masonry>
          </InfiniteScroll>
        </div>
      </>
    );
  }
}

export default Photos;
