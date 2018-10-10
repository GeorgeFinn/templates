import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import users from "./users";
import profileReducer from './profileReducer';
import { loadingBarReducer } from "react-redux-loading";

export default combineReducers({
  auth: authReducer,
  profile: profileReducer,
  errors: errorReducer,
  loadingBar: loadingBarReducer
});
