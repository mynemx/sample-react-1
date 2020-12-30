// import libs
import { connect } from "react-redux";
import Extension from "../../../models/Extension";

// import components
import Page from "./Page";

const mapStateToProps = state => {
    return {
        calls: state.cc.callEvents.calls || [],
        agents: state.cc.callEvents.agents || [],
        extensions: state.cc.sipExtensions.map(obj => new Extension(obj))

    };
};

export default connect(mapStateToProps)(Page);
