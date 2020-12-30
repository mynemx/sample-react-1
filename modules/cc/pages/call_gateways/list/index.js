// import libs
import { connect } from "react-redux";

// import components
import Page from "./Page";

const mapStateToProps = state => {
    return {
        callGateways: state.cc.callGateways || []
    };
};

export default connect(mapStateToProps)(Page);
