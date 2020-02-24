import React, { Component } from "react";
import PropTypes from "prop-types";
import { NavLink, Link, Switch, Route, Router } from "react-router-dom";
import { userEditRequest } from "../service";

// import components
import GeneralInfo from "./components/General";

class Page extends Component {
    static displayName = "UsersPage";
    static propTypes = {
        match: PropTypes.object.isRequired,
        user: PropTypes.object.isRequired,
        dispatch: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        const user = this.props.user.toJson();

        this.state = {
            user
        };
    }

    UNSAFE_componentWillMount() {
        this.loadUser();
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const user = nextProps.user.toJson();

        if (!_.isEqual(this.state.user, user) && !this.state.user.id) {
            this.setState({ user });
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !_.isEqual(nextState, this.state); // equals() is your implementation
    }

    loadUser() {
        const { match, user, dispatch } = this.props;

        if (!user.id) {
            dispatch(userEditRequest(match.params.id));
        }
    }

    render() {
        return (
            <main className="page-container" role="main">
                <ol className="breadcrumb">
                    <li>
                        <Link to="/app/company/administration">
                            Administration
                        </Link>
                    </li>
                    <li>
                        <Link to="/app/company/administration/users">
                            Users
                        </Link>
                    </li>
                    <li className="active">Details</li>
                </ol>
                <div className="page-content">
                    <ul className="nav nav-tabs justify-content-start mb-2">
                        <li className="nav-item">
                            <NavLink
                                className="nav-link"
                                activeClassName="active"
                                to={`${this.props.match.url}`}
                            >
                                General
                            </NavLink>
                        </li>
                    </ul>
                    <Switch>
                        <Route
                            path="/"
                            render={() => {
                                return <GeneralInfo {...this.state} />;
                            }}
                        />
                    </Switch>
                </div>
            </main>
        );
    }
}

export default Page;
