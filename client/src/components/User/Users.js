import React, { Component } from "react";
import axios from "axios";
import "./Users.css";
import UserPhotos from "./UserPhotos";

class Users extends Component {
  state = {
    user: {}
  };

  componentDidMount() {
    this.fetchUser();
  }
  fetchUser = async () => {
    const { match } = this.props;
    await axios
      .get(`/users?username=${match.params.username}`)
      .then(res => this.setState({ user: res.data }));
  };

  render() {
    const { user } = this.state;
    return !user.name ? (
      ""
    ) : (
      <div className="User">
        <div className="User-Data border-bottom">
          <div className="User-Info d-flex flex-column flex-md-row justify-content-center mt-5">
            <div className="mr-5 profile">
              <img
                className="rounded-circle"
                src={user.profile_image.large}
                alt={user.name}
              />
            </div>
            <div className="info mt-2">
              <h1>{user.name}</h1>
              <div className="d-flex flex-column flex-md-row text-secondary">
                <p className="m-0">
                  <i className="fas fa-map-marker-alt"></i>{" "}
                  {user.location ? user.location : "N/A"}
                </p>
                <p className="ml-md-5 ">
                  <i className="fab fa-instagram"></i> instagram.com/
                  {user.instagram_username}
                </p>
              </div>
              <p>{user.bio}</p>
            </div>
          </div>
        </div>
        <UserPhotos
          match={this.props.match}
          name={user.first_name}
          history={this.props.history}
        />
      </div>
    );
  }
}

export default Users;
