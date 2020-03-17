import React, { Component } from "react";
import { PhotoSearchContext } from "../../context/PhotoSearchContext";
import Masonry from "react-masonry-component";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "../Spinner/Spinner";
import SearchPhoto from "./SearchPhoto";
import "./SearchPhotos.css";

export class SearchPhotos extends Component {
  static contextType = PhotoSearchContext;
  render() {
    const { history } = this.props;
    const { query, photos, fetchPhotos } = this.context;
    return (
      <div className="SearchPhotos">
        <div className="Search-Heading">
          <h1>{query}</h1>
        </div>
        <div className="Search-Related"></div>
        <InfiniteScroll
          className={"InfiniteScroll"}
          dataLength={photos.length}
          hasMore={true}
          next={fetchPhotos}
          loader={<Spinner />}
        >
          <Masonry
            className={"SearchPhotos-Grid"}
            options={{ gutter: 20, fitWidth: true }}
          >
            {photos.map(photo => (
              <div key={photo.id}>
                <SearchPhoto history={history} photo={photo} />
              </div>
            ))}
          </Masonry>
        </InfiniteScroll>
      </div>
    );
  }
}

export default SearchPhotos;
