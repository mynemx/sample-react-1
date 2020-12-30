// import libs
import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import SearchText from "../../../../../utils/SearchText";
import SearchDropdown from "../../../../../utils/SearchDropdown";
import SearchDate from "../../../../../utils/SearchDate";
import { callEventListRequest } from "../service";

// import components
import TableRow from "./components/TableRow";
import { Link } from "react-router-dom";
import { authPageLoading } from "../../../../auth/store/actions";

class Page extends PureComponent {
    static displayName = "CallLogsPage";
    static propTypes = {
        callGateways: PropTypes.array.isRequired,
        dispatch: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            showFilter: false,
            callGateways: this.props.callGateways
        };

    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(authPageLoading(false));
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const { callGateways } = nextProps;
        if (!_.isEqual(this.state.callGateways, callGateways)) {
            this.setState({ callGateways });
        }
    }

    pageChange(pageNumber = 1) {
        const form = Object.assign({}, { ...this.state.filter, pageNumber });
        // this.props.dispatch(callEventListRequest(form));
        if (form.caller != "") {
            const callGateways = this.props.callGateways.filter(
                event => event.Event == form.caller
            );
            this.setState({ callGateways });
        } else {
            this.setState({ callGateways: this.props.callGateways });
        }
        this.setState({ showFilter: false });
    }


    renderTableRows() {
        return this.state.callGateways.map((callGateway, index) => {
            return <TableRow key={index} callGateway={callGateway} index={index} />;
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
                        <Link to="/app/contact-center/call-logs">
                            {" "}
                            Call Gateways
                        </Link>
                    </li>
                </ol>
                <div className="page-content">
                    <div className="card">
                        <div className="card-header">
                            <div className="card-title">Call Gateway</div>
                            {/* <div className="heading-elements">
                                <button
                                    className="btn btn-primary btn-sm"
                                    onClick={e => this.toggleFilter()}
                                >
                                    Filter
                                </button>
                            </div> */}
                        </div>
                        <div className="card-body">
                            {this.state.showFilter ? this.renderFilter() : ""}
                            <div className="table-responsive">
                                <table className="table table-hover table-sm">
                                    <thead className="">
                                        <tr>
                                            <th>#</th>
                                            <th>Name</th>
                                            <th>Ip Address</th>
                                            <th>DID</th>
                                            <th>Caller Id Name</th>
                                            <th>Caller Id Number</th>
                                            <th>Direction</th>
                                            <th>Local Rate Per Second</th>
                                            <th>Local Rate Per Minute</th>
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
