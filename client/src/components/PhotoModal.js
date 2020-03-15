import React, { Component } from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import "./PhotoModal.css";

class PhotoModal extends Component {
  state = {
    isShow: false,
    photoData: {},
    photo: "",
    isImageBig: false
  };

  componentWillMount() {
    this.fetchPhotoData();
  }

  fetchPhotoData = async () => {
    const { match } = this.props;
    this.setState({ isShow: true });
    const data = await axios
      .get(`/photos/${match.params.id}?id=${match.params.id}`)
      .then(res => res.data);
    this.setState({ photoData: data });
    this.setState({ photo: data.urls.thumb });
    //console.log(this.state.photoData);
  };

  zoomImg = () => {
    this.setState({ isImageBig: !this.state.isImageBig });
  };

  render() {
    const { history } = this.props;
    const { isImageBig, isShow, photo, photoData } = this.state;

    return !photo ? (
      ""
    ) : (
      <>
        <Modal
          className="PhotoModal"
          show={isShow}
          onHide={() => {
            this.setState({ isShow: false });
            history.goBack();
          }}
          dialogClassName="modal-90w"
          aria-labelledby="example-custom-modal-styling-title"
        >
          <Modal.Body className="p-0">
            <div className="d-flex justify-content-between align-items-center pt-3 px-3 Header">
              <div className="Image">
                <a href={photoData.user.links.html} className="d-flex">
                  <img
                    src={photoData.user.profile_image.small}
                    alt={photoData.user.name}
                  />
                  <div className="pl-2 text-dark Name">
                    <p className="m-0">{photoData.user.name}</p>
                    <p className="text-secondary">@{photoData.user.username}</p>
                  </div>
                </a>
              </div>
              <div>
                <a
                  rel="noopener noreferrer"
                  target="_blank"
                  href={photoData.urls.raw}
                  download={photoData.urls.raw}
                  className="btn btn-success text-white"
                >
                  Download Full Photo
                </a>
                <button
                  onClick={() => {
                    history.goBack();
                    this.setState({ isShow: false });
                  }}
                  className="btn btn-danger ml-2"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
            </div>
            <div
              style={{
                overflow: "hidden",
                cursor: !isImageBig ? "zoom-in" : "zoom-out"
              }}
              onClick={this.zoomImg}
              className="text-center mt-4"
            >
              {isImageBig ? (
                <img
                  style={{ height: "150vh", width: "100%", objectFit: "cover" }}
                  src={photoData.urls.raw}
                  alt={photoData.alt_description}
                />
              ) : (
                <img
                  style={{ height: "70vh", width: "auto", objectFit: "cover" }}
                  src={photoData.urls.regular}
                  alt={photoData.alt_description}
                />
              )}
            </div>
            <div className="pl-5 pt-5">
              <h2 className="h1">Related collections</h2>
            </div>
            <div className="p-5 d-flex flex-wrap PhotoModal-Collection">
              {photoData.related_collections.results.map(res => (
                <div key={res.id} className="Card">
                  <div id="Card" className="d-flex">
                    <div
                      onClick={() =>
                        history.push(`/collections/${res.id}/${res.title}`)
                      }
                      className="Card-Layer"
                    ></div>
                    <div className="Cover-Photo">
                      <img
                        src={res.preview_photos[0].urls.small}
                        alt={res.cover_photo.alt_description}
                      />
                    </div>
                    <div className="Preview-Photo">
                      <img
                        src={res.preview_photos[1].urls.small}
                        alt={res.cover_photo.alt_description}
                      />
                      <img
                        src={res.preview_photos[2].urls.small}
                        alt={res.cover_photo.alt_description}
                      />
                    </div>
                  </div>
                  <div className="pt-3 ">
                    <h5
                      onClick={() =>
                        history.push(`/collections/${res.id}/${res.title}`)
                      }
                      className="text-nowrap text-truncate my-2 Title"
                    >
                      {res.title}
                    </h5>
                    <p className="text-secondary">
                      {res.total_photos} photos - Curated by {res.user.name}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Modal.Body>
        </Modal>
      </>
    );
  }
}

export default PhotoModal;
