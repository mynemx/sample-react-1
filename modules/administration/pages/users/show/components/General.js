import React, { Component } from "react";
import { Link } from "react-router-dom";

// components

class General extends Component {
    constructor(props) {
        super(props);

        const { user, errors } = this.props;

        this.state = {
            user
        };
    }

    componentWillReceiveProps(nextProps) {
        const { user, errors } = nextProps;

        if (!_.isEqual(this.state.user, user)) {
            this.setState({ user });
        }
        this.setState({ errors });
    }

    renderUserInfo() {
        const { user } = this.state;
        return (
            <>
                <div className="form-group mb-2">
                    <label className="label mb-0">FirstName</label>
                    <div className="pl-3 text-default">{user.firstName}</div>
                </div>
                <div className="form-group mb-2">
                    <label className="label mb-0">SecondName</label>
                    <div className="pl-3 text-default">{user.secondName}</div>
                </div>
                <div className="form-group mb-2">
                    <label className="label mb-0">LastName</label>
                    <div className="pl-3 text-default">{user.lastName}</div>
                </div>

                <div className="form-group mb-2">
                    <label className="label mb-0">Contact Email</label>
                    <div className="pl-3 text-default">{user.email}</div>
                </div>
                <div className="form-group mb-2">
                    <label className="label mb-0">Department</label>
                    <div className="pl-3 text-default">
                        {user.department.name}
                    </div>
                </div>
            </>
        );
    }

    render() {
        const { user } = this.state;
        return (
            <>
                <div className="row">
                    <div className="col-xs-12 col-sm-6 col-md-5 col-lg-4 col-xl-3">
                        <div
                            className="card bg-light-ash"
                            style={{
                                borderRadius: "0.9rem"
                                // backgroundColor: "#E2E7EA"
                            }}
                        >
                            <div className="card-body"></div>
                        </div>

                        <div className="card mt-2">
                            <div className="card-header">Task Summary</div>
                            <div className="card-body"></div>
                        </div>
                    </div>

                    <div className="col ">
                        <div className="card">
                            <div className="card-header">
                                <div className="card-title">
                                    Contact Information
                                </div>
                                <div className="heading-elements">
                                    <Link
                                        className="btn btn-sm btn-primary"
                                        to={`/app/company/administration/users/edit/${user.id}`}
                                    >
                                        Edit
                                    </Link>
                                </div>
                            </div>
                            <div className="card-body max-height-500">
                                {this.renderUserInfo()}
                            </div>
                        </div>

                        <div className="card mt-2">
                            <div className="card-header">About </div>
                            <div className="card-body">{user.about}</div>
                        </div>

                        <div className="card mt-2">
                            <div className="card-header">Interest</div>
                            <div className="card-body">{user.interest}</div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default General;
