// import libs
import { connect } from "react-redux";
import Order from "../../../models/Order";

// import components
import Page from "./Page";

const mapStateToProps = state => {
    const { data, meta } = state.crm.orders;
    const users = state.administration.users;
    const sources = [
        {name: "Cold customer"},
        {name: "Existing customer "},
        {name: "Inbound cold customer "},
        {name: "Inbound existing customer"},
    ]
    return {
        orders: data.map(order => new Order(order)),
        users,
        sources,
        meta: Object.assign({}, meta)
    };
};

export default connect(mapStateToProps)(Page);
