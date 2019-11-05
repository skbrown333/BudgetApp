import { combineReducers } from "redux";
import * as Actions from "./actions";

const account = (state = null, action) => {
  switch (action.type) {
    case Actions.UPDATE_ACCOUNT_ACTION:
      return action.payload;
    default:
      return state;
  }
};

const toast = (state = [], action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default combineReducers({
  account,
  toast
});
