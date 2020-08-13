import types from "./types";

//this action will set the feature Photo
export const setFeatureImage = (path) => (dispatch) => {
  dispatch({ type: types.SET_FEATURE_IMAGE, payLoad: path });
};

//this action will set the form data
export const onFormDataChange = (value) => (dispatch) => {
  dispatch({ type: types.SET_FORM_DATA, payLoad: value });
};

//this action will upload the image from dropzone one-by-one
export const onImageUpload = (value) => (dispatch) => {
  dispatch({ type: types.SET_DATA_URL, payLoad: value });
};