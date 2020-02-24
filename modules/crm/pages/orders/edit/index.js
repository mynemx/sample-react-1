// import libs
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Order from "../../../models/Order";

// import components
import Page from "./Page";

const mapStateToProps = (state, router) => {
    const { params } = router.match;
    const order =
        state.crm.orders.data.find(order => order.id === Number(params.id)) ||
        {};
    const users = state.administration.users;
    const orderStatuses = state.settings.orderStatuses || [];

    return {
        order: new Order(order),
        users,
        orderStatuses
    };
};

export default withRouter(connect(mapStateToProps)(Page));
