import { connect } from "react-redux";
import User from "../../../../user/models/User";
import { withRouter } from "react-router-dom";
// import components
import Page from "./Page";

const mapStateToProps = (state, router) => {
    const { params } = router.match;
    const user = state.administration.users.find(
        user => user.id === Number(params.id)
    );
    return {
        user: user ? new User(user) : new User({})
    };
};

export default withRouter(connect(mapStateToProps)(Page));
