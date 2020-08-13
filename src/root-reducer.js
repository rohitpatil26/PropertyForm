import { combineReducers } from "redux";
import propertyReducer from "./redux/reducer";

const rootReducer = {
  propertyReducer,
};

const combinedReducer = combineReducers(rootReducer);

export default combinedReducer;
