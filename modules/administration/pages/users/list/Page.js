// import libs
import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import {
    userListRequest,
    userUpdateRequest,
    userRemoveRequest
} from "../service";

// import components
import UserRow from "./components/UserRow";
import Pagination from "../../../../../utils/Pagination";
import { Link } from "react-router-dom";

class Page extends PureComponent {
    static displayName = "UsersPage";
    static propTypes = {
        users: PropTypes.array.isRequired,
        dispatch: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.handleRemove = this.handleRemove.bind(this);
        this.pageChange = this.pageChange.bind(this);
    }

    componentDidMount() {
        const { dispatch } = this.props;

        dispatch(userListRequest({}));
    }

    pageChange(pageNumber) {
        this.props.dispatch(userListRequest({ pageNumber }));
    }

    handleRemove(id) {
        this.props.dispatch(userRemoveRequest(id));
    }

    renderUsers() {
        return this.props.users.map((user, index) => {
            return (
                <UserRow
                    key={index}
                    user={user}
                    index={index}
                    handleRemove={this.handleRemove}
                />
            );
        });
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
                </ol>
                <div className="page-content">
                    <div className="card">
                        <div className="card-header">
                            <div className="card-title">Users</div>
                            <div className="heading-elements">
                                <Link
                                    to="users/add"
                                    className="btn btn-success btn-sm"
                                >
                                    Add Users
                                </Link>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="table-responsive">
                                <table className="table table-hover table-sm">
                                    <thead className="">
                                        <tr>
                                            <th>#</th>
                                            <th>Firstname</th>
                                            <th>Secondname</th>
                                            <th>Lastname</th>
                                            <th>Department</th>
                                            <th>Email</th>
                                            <th>Job Title</th>
                                            <th>Gender</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>{this.renderUsers()}</tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        );
    }
}

export default Page;
