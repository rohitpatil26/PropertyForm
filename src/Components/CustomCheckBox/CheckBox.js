import React from "react";

// Custom CheckBox
const Checkbox = (props) => {
  return (
    <input
      type={props.type}
      name={props.name}
      checked={props.checked}
      onChange={props.onChange}
    />
  );
};

export default Checkbox;
