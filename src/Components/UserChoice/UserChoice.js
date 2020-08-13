import React, { Component } from "react";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
import classnames from "classnames";
import "./UserChoice.scss";
import UploadBox from "../UploadBox/UploadBox";
import { onFormDataChange } from "../../redux/actions";

//Class Component
class UserChoice extends Component {

  state = {
    uploadCsv: false,
    progress: 0,
    isFormActive: false,
  };

  //On button click open next Accordion
  onAddScratch = (e) => {
    e.preventDefault();
    this.setState({
      isFormActive: true,
    });
    this.props.propsData.setActiveAccordion();
  };

  //ON CSV upload extract data and set that data to state
  onCsvSelect = async (data, info) => {
    const { onFormDataChange } = this.props;
    const addressIndex = (element) =>
      element === "Address" || element === "address";
      // findIndex of element 
    const indexOfAddress = data[0].findIndex(addressIndex);

    const bedroomIndex = (element) =>
      element === "Bed Room" || element === "bed room";
    const indexOfbedrm = data[0].findIndex(bedroomIndex);

    const bathRoomIndex = (element) =>
      element === "Bath Room" || element === "bath room";
    const indexOfbathrm = data[0].findIndex(bathRoomIndex);
    //use that index to get extact positioned data and set it by calling the action
    await onFormDataChange({
      address: data[1][indexOfAddress],
      bedRoomCount: data[1][indexOfbedrm],
      bathRoomCount: data[1][indexOfbathrm],
    });

    // initail will set progress fro 10 as it will start filling the bar color  and make uploadCsv to disable the uploadbox
    await this.setState({
      progress: 10,
      uploadCsv: true,
    });

    //interval to increase progress bar value every 2second
    let interval = setInterval(() => {
      this.setState(
        {
          progress: this.state.progress + 20,
        },
        () => {
          if (this.state.progress > 100) {
            clearInterval(interval);
            setTimeout(() => {
              this.props.propsData.setActiveAccordion("3");
            }, 2000);
          }
        }
      );
    }, 2000);
  };
  
  render() {
    const { progress, uploadCsv, isFormActive } = this.state;
    return (
      <div className="userchoice-main">
        <div className={classnames("add-scratch", { disabled: uploadCsv })}>
          <Button onClick={this.onAddScratch} disabled={uploadCsv || isFormActive}>
            Add from scratch
          </Button>
        </div>
        {!isFormActive && <div>OR</div>}
        {this.props.propsData.activeAccordion !== "2" && !isFormActive && (
          <div className="upload-container">
            <UploadBox
              mainTitle="Upload CSV"
              secondaryTitle={`One file only & not exceeding 10MB`}
              disabled={uploadCsv}
              handleClick={this.onCsvSelect}
              now={progress}
            />
          </div>
        )}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    featureImage: state.propertyReducer.featureImage,
  };
};

const mapDispatchToProps = {
  onFormDataChange,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserChoice);
