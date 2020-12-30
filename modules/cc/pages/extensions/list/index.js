// import libs
import { connect } from "react-redux";
import Extension from "../../../models/Extension";

// import components
import Page from "./Page";

const mapStateToProps = state => {
    const sipExtensions = state.cc.sipExtensions;

    return {
        sipExtensions: sipExtensions.map(obj => new Extension(obj))
    };
};

export default connect(mapStateToProps)(Page);
