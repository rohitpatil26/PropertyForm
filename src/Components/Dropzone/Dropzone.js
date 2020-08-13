import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import Dropzone from "react-dropzone-uploader";
import { toast } from "react-toastify";
import { onImageUpload, setFeatureImage } from "../../redux/actions";
import Checkbox from "../CustomCheckBox/CheckBox";
import Modal from "../Modal/Modal";
import "react-dropzone-uploader/dist/styles.css"; // dropzone css
import "./Dropzone.scss";

class Dropzoner extends Component {
  state = {
    submited: false,
    selectedPhoto: null,
    selectedPhotoId: 0,
    previewImage: null,
    isModal: false,
    isBtnEnabled: false,
  };

  // specify upload params and url for your files
  getUploadParams = ({ meta }) => {
    return { url: "https://httpbin.org/post" };
  };

  // receives array of files that are done uploading when submit button is clicked
  handleSubmit = (files) => {
    const { onImageUpload } = this.props;
    files.map((f) => onImageUpload(f.meta));
    this.setState({
      submited: true,
    });
  };

  // this will set selected photo and id
  handleOnCheck = (data, id) => {
    this.setState({
      selectedPhoto: data,
      selectedPhotoId: id,
      isBtnEnabled: true,
    });
  };

  // this will show the data stored in redux state and will set the Feature Image
  handleShowData = () => {
    const { setFeatureImage, formData } = this.props;
    const { selectedPhoto } = this.state;
    const { address, bedRoomCount, bathRoomCount } = formData;

    //action called to set feature Image
    setFeatureImage(selectedPhoto);
    toast.success("Featured Image updated successfully", {
      position: "top-right",
      autoClose: true,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    console.log("--------------------------------");
    console.log("Address: ", address);
    console.log("--------------------------------");
    console.log("Bed room count: ", bedRoomCount);
    console.log("--------------------------------");
    console.log("Bath room count: ", bathRoomCount);
    console.log("--------------------------------");
  };

  handleToggle = (e) => {
    e.preventDefault();
    // toggle modal open/close
    const { isModal } = this.state;
    this.setState({
      isModal: !isModal,
    });
  };

  handleModal = (data) => {
    // function to catch data and set for preview and callback function to change state after setting preview image then open modal
    this.setState(
      {
        previewImage: data,
      },
      () => {
        this.setState({
          isModal: true,
        });
      }
    );
  };

  render() {
    const { dataUrl } = this.props;
    const {
      submited,
      selectedPhotoId,
      previewImage,
      isModal,
      isBtnEnabled,
    } = this.state;
    return (
      <div className="dropzoneContainer">
        <Dropzone
          getUploadParams={this.getUploadParams}
          onSubmit={this.handleSubmit}
          accept="image/*"
          disabled={submited}
          submitButtonDisabled={submited}
          maxFiles="4"
        />
        <div className="preview">
          {dataUrl.map((item) => {
            return (
              <Fragment>
                <Checkbox
                  key={`${item.id}-${item.name}`}
                  className="mb-3"
                  type="checkbox"
                  checked={selectedPhotoId === item.id}
                  name={item.name}
                  onChange={() => this.handleOnCheck(item.previewUrl, item.id)}
                />
                <img
                  className="img"
                  key={`${item.id}-${item.name}`}
                  src={item.previewUrl}
                  alt={item.name}
                  onClick={() => this.handleModal(item.previewUrl)}
                />
              </Fragment>
            );
          })}
        </div>
        <div className="button_container">
          <button
            className="btn"
            onClick={this.handleShowData}
            disabled={!isBtnEnabled}
          >
            Submit
          </button>
        </div>
        <Modal
          open={isModal}
          handleToggle={this.handleToggle}
          src={previewImage}
        />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    dataUrl: state.propertyReducer.dataUrl,
    formData: state.propertyReducer.formData,
  };
};

const mapDispatchToProps = {
  onImageUpload,
  setFeatureImage,
};
export default connect(mapStateToProps, mapDispatchToProps)(Dropzoner);
