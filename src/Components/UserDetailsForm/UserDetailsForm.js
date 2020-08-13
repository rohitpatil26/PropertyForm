import React from "react";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
import { onFormDataChange } from "../../redux/actions";
import "./style.scss";

//Functional component 
const UserDetailsForm = (props) => {

  //on submit of form change the active accordion 
  const handleSubmit = (e) => {
    e.preventDefault();
    props.propsData.setActiveAccordion();
  };

  // on change of inout value set the redux state
  const handleOnchange = (e) => {
    const { onFormDataChange } = props;
    e.preventDefault();
    onFormDataChange({ [e.target.name]: e.target.value });
  };

  const { formData } = props;
  const { bedRoomCount, bathRoomCount, address, descirption } = formData;
  // isEnabled will check on every render 
  const isEnabled =
    bedRoomCount &&
    bedRoomCount.length > 0 &&
    bathRoomCount &&
    bathRoomCount.length > 0 &&
    address.length > 0;
  return (
    <form autoComplete="off" className="formControl" onSubmit={handleSubmit}>
      <div className="formContent">
        <table>
          <tbody>
            <tr>
              <td>
                <label>Address :</label>
              </td>
              <td>
                <textarea
                  required
                  value={address}
                  name="address"
                  maxLength="250"
                  onChange={handleOnchange}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label>Bedroom :</label>
              </td>
              <td>
                <input
                  required
                  type="number"
                  name="bedRoomCount"
                  value={bedRoomCount}
                  onChange={handleOnchange}
                  min="1"
                  max="10"
                />
              </td>
            </tr>
            <tr>
              <td>
                <label>Bathroom :</label>
              </td>
              <td>
                <input
                  required
                  type="number"
                  name="bathRoomCount"
                  value={bathRoomCount}
                  onChange={handleOnchange}
                  min="1"
                  max="5"
                />
              </td>
            </tr>
            <tr>
              <td>
                <label>Descirption of property:</label>
              </td>
              <td>
                <textarea
                  value={descirption}
                  name="descirption"
                  maxLength="250"
                  onChange={handleOnchange}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="control">
        <Button type="submit" value="Submit" disabled={!isEnabled}>
          Submit
        </Button>
      </div>
    </form>
  );
};

const mapStateToProps = (state) => {
  return {
    formData: state.propertyReducer.formData,
  };
};

const mapDispatchToProps = {
  onFormDataChange,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserDetailsForm);
