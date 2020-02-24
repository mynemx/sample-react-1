// import libs
import { connect } from "react-redux";
import User from "../../../../user/models/User";

// import components
import Page from "./Page";

const mapStateToProps = state => {
    //   const {data, ...meta} = state.administration.users
    const users = state.administration.users;

    return {
        users: users.map(user => new User(user))
    };
};

export default connect(mapStateToProps)(Page);
