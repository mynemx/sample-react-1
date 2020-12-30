// import libs
import React, { Component } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { extensionListRequest, extensionRemoveRequest } from "../service";

// import components
import TableRow from "./components/TableRow";
import Pagination from "./components/Pagination";
import { Link } from "react-router-dom";
import { authPageLoading } from "../../../../auth/store/actions";

class Page extends Component {
    static displayName = "Sip Extension Page";
    static propTypes = {
        sipExtensions: PropTypes.array.isRequired,
        dispatch: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.handleRemove = this.handleRemove.bind(this);
        this.pageChange = this.pageChange.bind(this);
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(authPageLoading(false));
        dispatch(extensionListRequest({}));
    }

    pageChange(pageNumber) {
        this.props.dispatch(extensionListRequest({ pageNumber }));
    }

    handleRemove(id) {
        this.props.dispatch(extensionRemoveRequest(id));
    }

    renderTableRows() {
        return this.props.sipExtensions.map((sipExtension, index) => {
            return (
                <TableRow
                    key={sipExtension.id}
                    sipExtension={sipExtension}
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
                        <Link to="/app/contact-center"> Contact Center </Link>
                    </li>
                    <li className="active">
                        <Link to="/app/contact-center/sip-extensions">
                            {" "}
                            Sip Extensions{" "}
                        </Link>
                    </li>
                </ol>
                <div className="page-content">
                    <div className="card">
                        <div className="card-header">
                            <div className="card-title">Sip Extensions </div>
                            <div className="heading-elements">
                                <Link
                                    to="sip-extensions/add"
                                    className="btn btn-primary btn-sm"
                                >
                                    Add Sip Extension
                                </Link>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="table-responsive">
                                <table className="table table-hover table-sm">
                                    <thead className="">
                                        <tr>
                                            <th>#</th>
                                            <th>Exten</th>
                                            <th>Agent name</th>
                                            <th>User</th>
                                            <th>Caller Id</th>
                                            <th>Port</th>
                                            <th>Codecs</th>
                                            <th>Password</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>{this.renderTableRows()}</tbody>
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
