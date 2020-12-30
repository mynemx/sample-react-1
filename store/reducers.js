import { combineReducers } from "redux";

import auth from "../modules/auth/store/reducer";
import user from "../modules/user/store/reducer";
import administration from "../modules/administration/store/reducer";
import crm from "../modules/crm/store/reducer";
import cc from "../modules/cc/store/reducer";
import help from "../modules/help/store/reducer";
// import auth from '../reducers/auth';
import settings from "../modules/settings/store/reducer";
import dashboard from "../modules/dashboard/store/reducer";
import report from "../modules/report/store/reducer";

export default combineReducers({
    auth,
    user,
    settings,
    administration,
    crm,
    cc,
    help,
    dashboard,
    report
});
