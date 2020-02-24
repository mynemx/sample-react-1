// import libs
import { connect } from "react-redux";
import Order from "../../../models/Order";

// import components
import Page from "./Page";

const mapStateToProps = state => {
    const { data, meta } = state.crm.orders;

    return {
        orders: data.map(order => new Order(order)),
        meta: Object.assign({}, meta)
    };
};

export default connect(mapStateToProps)(Page);
