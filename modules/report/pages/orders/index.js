/* ============
 * Container
 * ============.
 *
 * Containers are used fetch the data from state
 * and disperse to the components.
 */

// import libs
import { connect } from "react-redux";
import Extension from "../../../cc/models/Extension";
import User from "../../../user/models/User";

// import components
import Page from "./Page";

// map store state as properties of the component
const mapStateToProps = state => {
    const orderSummary = state.report.orderSummary || {};
    return {
        user: new User(state.user),
        extensions: state.cc.sipExtensions || [],
        users : state.administration.users || [],
        orderSummary
    };
};

// binding store with component
export default connect(mapStateToProps)(Page);
