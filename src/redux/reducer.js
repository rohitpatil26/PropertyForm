import types from "./types";
//default icon/image for feature Photo
import logo from "../logo.svg";

const INITIAL_STATE = {
  featureImage: logo,
  formData: {
    address: "",
    bedRoomCount: null,
    bathRoomCount: null,
    descirption:""
  },
  dataUrl: [],
};

const reducerHandler = (action, state = INITIAL_STATE) => {
  const reducers = {
    [types.SET_FEATURE_IMAGE]: () => ({
      ...state,
      featureImage: action.payLoad,
    }),
    [types.SET_FORM_DATA]: () => ({
      ...state,
      formData: { ...state.formData, ...action.payLoad },
    }),
    [types.SET_DATA_URL]: () => ({
      ...state,
      dataUrl: [action.payLoad, ...state.dataUrl],
    }),
  };
  return (reducers[action.type] && reducers[action.type]()) || state;
};

const propertyReducer = (state, action) => reducerHandler(action, state);
export default propertyReducer;
