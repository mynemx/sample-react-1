// import libs
import React, { Component } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { userUpdateRequest } from "../service";
import ReeValidate from "ree-validate";

// import components
import GeneralInfo from "./personal-info/components/general";

class Page extends Component {
    static displayName = "UserPage";
    static propTypes = {
        user: PropTypes.object.isRequired,
        departments: PropTypes.array.isRequired,
        dispatch: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.validator = new ReeValidate({
            name: "required|min:3",
            email: "required|email",
            phone: "min:8|numeric",
            about: "min:10|max:1024"
        });

        const user = this.props.user.toJson();

        this.state = {
            user,
            errors: this.validator.errors
        };
    }

    componentWillReceiveProps(nextProps) {
        const user = nextProps.user.toJson();

        if (!_.isEqual(this.state.user, user)) {
            this.setState({ user });
        }
    }

    render() {
        return (
            <main className="page-container" role="main">
                <GeneralInfo {...this.props} />
            </main>
        );
    }
}

export default Page;
