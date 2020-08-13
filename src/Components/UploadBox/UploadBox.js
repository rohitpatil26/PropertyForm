import React, { memo } from "react";
import { ProgressBar } from "react-bootstrap";
import CSVReader from "react-csv-reader";
import "./UploadBox.scss";

//functional component wrapped in memo as it will re-render only if it's props changes
const UploadBox = (props) => {
  return (
    <div className="upload-box-container">
      <CSVReader
        disabled={props.disabled}
        onFileLoaded={(data, fileInfo) => props.handleClick(data, fileInfo)}
      />

      {props.now > 1 ? (
        <div style={{ margin: "15px" }}>
          <ProgressBar striped variant="success" now={props.now} />
        </div>
      ) : null}
    </div>
  );
};
export default memo(UploadBox);