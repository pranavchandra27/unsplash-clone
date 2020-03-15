import React, { Component, createContext } from "react";
import axios from "axios";

export const CollectionsContext = createContext();

export class CollectionsProvider extends Component {
  state = {
    collections: [],
    page: 1
  };

  fetchCollections = async () => {
    const { page } = this.state;
    const data = await axios
      .get(`/collections?page=${page}`)
      .then(res => res.data);
    this.setState({ collections: this.state.collections.concat(data) });
    this.setState({ page: page + 1 });
  };
  render() {
    return (
      <CollectionsContext.Provider
        value={{
          collections: this.state.collections,
          fetchCollections: this.fetchCollections
        }}
      >
        {this.props.children}
      </CollectionsContext.Provider>
    );
  }
}
