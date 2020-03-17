import React, { Component } from "react";
import { CollectionsContext } from "../../context/CollectionsContext";
import Masonry from "react-masonry-component";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "../Spinner/Spinner";
import Collection from "./Collection";
import "./Collections.css";

class Collections extends Component {
  static contextType = CollectionsContext;
  componentDidMount() {
    const { fetchCollections } = this.context;
    fetchCollections();
  }
  render() {
    const { collections, fetchCollections } = this.context;
    const { history } = this.props;
    return (
      <div className="Collections">
        <div className="Collections-Heading">
          <h1 className="Title">Collections</h1>
          <p>Beautiful, free pictures of the week.</p>
          <p>
            Explore the world through collections of beautiful HD pictures free
            to use.
          </p>
        </div>
        <InfiniteScroll
          className={"InfiniteScroll"}
          dataLength={collections.length}
          hasMore={true}
          next={fetchCollections}
          loader={<Spinner />}
        >
          <Masonry
            className={"Collections-Grid"}
            options={{
              gutter: 20,
              fitWidth: true
            }}
          >
            {collections.map(collection => (
              <div key={collection.id}>
                <Collection history={history} collection={collection} />
              </div>
            ))}
          </Masonry>
        </InfiniteScroll>
      </div>
    );
  }
}

export default Collections;
