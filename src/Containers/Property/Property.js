import React, { PureComponent } from "react";
import UserChoice from "../../Components/UserChoice/UserChoice";
import UserDetailsForm from "../../Components/UserDetailsForm/UserDetailsForm";
import Dropzone from "../../Components/Dropzone/Dropzone";
import AccordionComponent from "../../Components/Accordion/AccordionComponent";
import { connect } from "react-redux";

import "./Property.scss";

class Property extends PureComponent {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
      activeAccordion: "1",
      activeAccordionList: ["1"],
      accordionItems: [
        {
          itemId: "1",
          title: "Choose to fill up the data",
          getComponent: (propsList) => <UserChoice {...propsList} />,
        },
        {
          itemId: "2",
          title: "Property Details",
          getComponent: (propsList) => <UserDetailsForm {...propsList} />,
        },
        {
          itemId: "3",
          title: "Upload Property Photos",
          getComponent: (propsList) => <Dropzone {...propsList} />,
        },
      ],
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }
  setActiveAccordion = (activeKey) => {
    if (activeKey) {
      this.setState({
        activeAccordion: activeKey,
        activeAccordionList: activeKey,
      });
    } else {
      if (parseInt(this.state.activeAccordion) <= 3) {
        this.setState({
          activeAccordion: (
            parseInt(this.state.activeAccordion) + 1
          ).toString(),
          activeAccordionList: (
            parseInt(this.state.activeAccordion) + 1
          ).toString(),
        });
      }
    }
  };

  setActiveAccordionList = (e) => {
    this.setState({
      activeAccordionList: [...e],
    });
  };

  render() {
    const { accordionItems } = this.state;
    const { featureImage } = this.props;
    return (
      <div className="propert-main container">
        <span className="left-side-panel">
          <img src={featureImage} className="f_photo" alt="featureimage" />
        </span>
        <span className="right-side-panel">
          <AccordionComponent
            {...this.state}
            accordionItems={accordionItems}
            setActiveAccordionList={this.setActiveAccordionList}
            setActiveAccordion={this.setActiveAccordion}
          />
        </span>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    featureImage: state.propertyReducer.featureImage,
  };
};

const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(Property);
