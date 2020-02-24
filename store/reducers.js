import { combineReducers } from "redux";

import auth from "../modules/auth/store/reducer";
import administration from "../modules/administration/store/reducer";
import crm from "../modules/crm/store/reducer";

export default combineReducers({
  auth,
  administration,
  crm
});
