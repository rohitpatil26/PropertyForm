import React, { memo, Fragment } from "react";
import { Badge } from "reactstrap";
import Collapse, { Panel } from "rc-collapse";
import classnames from "classnames";
import "rc-collapse/assets/index.css";
import "./style.scss";

const AccordionComponent = (props) => {
  const onAccordionChange = (activeKey) => {
    const { setActiveAccordionList } = props;
    if (activeKey) {
      setActiveAccordionList(activeKey);
    }
  };

  const {
    activeAccordion,
    accordionItems,
    activeAccordionList,
    setActiveAccordionList,
    setActiveAccordion,
  } = props;
  const propsData = {
    address: "",
    bedRoomCount: null,
    bathRoomCount: null,
    activeAccordion,
    accordionItems,
    activeAccordionList,
    setActiveAccordionList,
    setActiveAccordion,
  };
  return (
    <Collapse
      accordion={false}
      activeKey={activeAccordionList}
      onChange={onAccordionChange}
      expandIcon={() => <i />}
    >
      {accordionItems.map((item) => {

        const propsList = {};
        let titleSelectedContent;
        let disabled = item.itemId > activeAccordion;
        propsList.propsData = propsData;

        const title = (
          <Fragment>
            <Badge color="secondary" className="indicator">
              {item.itemId}
            </Badge>
            <span className="accordion-title">{item.title}</span>
            {titleSelectedContent}
          </Fragment>
        );

        return (
          <Panel
            header={title}
            key={item.itemId}
            className={classnames({
              "rc-collapse-content-custom": activeAccordionList.includes(
                item.itemId
              ),
            })}
            disabled={disabled}
          >
            {item.getComponent(propsList)}
          </Panel>
        );
      })}
    </Collapse>
  );
};
export default memo(AccordionComponent);
