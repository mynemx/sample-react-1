// import libs
import {
    connect
} from "react-redux";
import {
    withRouter
} from "react-router-dom";
import Order from "../../../models/Order";

// import components
import Page from "./Page";

const mapStateToProps = state => {
    const users = state.administration.users;
    const orderStatuses = state.settings.orderStatuses || [];

    return {
        users,
        orderStatuses: orderStatuses.filter(
            item => item.initial == 1 || item.progress == 1
        )
    };
};

export default withRouter(connect(mapStateToProps)(Page));
