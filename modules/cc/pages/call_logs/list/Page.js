// import libs
import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import SearchText from "../../../../../utils/SearchText";
import SearchDropdown from "../../../../../utils/SearchDropdown";
import SearchDate from "../../../../../utils/SearchDate";
import { callLogListRequest } from "../service";

// import components
import TableRow from "./components/TableRow";
import Pagination from "../../../../../utils/Pagination";
import { Link } from "react-router-dom";

class Page extends PureComponent {
    static displayName = "CallLogsPage";
    static propTypes = {
        callLogs: PropTypes.array.isRequired,
        dispatch: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            showFilter: false,
            direction: [{ name: "OUT" }, { name: "IN" }],
            filter: {
                destination: "",
                direction: "",
                caller: "",
                calldate: "",
                limits: 200
            }
        };

        this.handleChecked = this.handleChecked.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.toggleFilter = this.toggleFilter.bind(this);
        this.pageChange = this.pageChange.bind(this);
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(callLogListRequest(this.state.filter));
    }

    pageChange(pageNumber = 1) {
        const form = Object.assign({}, { ...this.state.filter, pageNumber });
        this.props.dispatch(callLogListRequest(form));
        this.setState({ showFilter: false });
    }

    handleChange(name, value) {
        const filter = Object.assign(
            {},
            { ...this.state.filter, [name]: value }
        );
        this.setState({ filter });
    }

    handleChecked(name, value, status) {
        if (status) {
            const obj = [...this.state.filter[name], value];
            const filter = Object.assign(
                {},
                { ...this.state.filter, [name]: obj }
            );
            this.setState({ filter });
        } else {
            const obj = this.state.filter[name].filter(item => item !== value);
            const filter = Object.assign(
                {},
                { ...this.state.filter, [name]: obj }
            );
            this.setState({ filter });
        }
    }

    toggleFilter() {
        this.setState({ showFilter: !this.state.showFilter });
    }

    renderTableRows() {
        return this.props.callLogs.map((callLog, index) => {
            return (
                <TableRow key={callLog.id} callLog={callLog} index={index} />
            );
        });
    }

    renderFilter() {
        const { filter, direction } = this.state;
        return (
            <div className="row">
                <div className="floating-label col">
                    <SearchText
                        label="From"
                        name="caller"
                        value={filter.caller}
                        onChange={this.handleChange}
                    />
                </div>
                <div className="floating-label col">
                    <SearchText
                        label="To"
                        name="destination"
                        value={filter.destination}
                        onChange={this.handleChange}
                    />
                </div>

                <div className="floating-label col">
                    <SearchDropdown
                        label="Direction"
                        name="direction"
                        value={filter.direction}
                        list={direction}
                        field="name"
                        displayField="name"
                        onChange={this.handleChange}
                    />
                </div>

                <div className="floating-label col">
                    <SearchDate
                        label="Call date"
                        name="calldate"
                        value={filter.calldate}
                        onChange={this.handleChange}
                    />
                </div>
                <div className="floating-label col">
                    <SearchText
                        label="Limit"
                        name="limits"
                        value={filter.limits}
                        onChange={this.handleChange}
                    />
                </div>
                <div className="floating-label col">
                    <button
                        onClick={e => this.pageChange(1)}
                        type="button"
                        className="btn btn-sm btn-primary"
                    >
                        Filter
                    </button>
                </div>
            </div>
        );
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
                            Call Logs ({this.props.meta.total})
                        </Link>
                    </li>
                </ol>
                <div className="page-content">
                    <div className="card">
                        <div className="card-header">
                            <div className="card-title">
                                Call Logs ({this.props.meta.count})
                            </div>
                            <div className="heading-elements">
                                <button
                                    className="btn btn-primary btn-sm"
                                    onClick={e => this.toggleFilter()}
                                >
                                    Filter
                                </button>
                            </div>
                        </div>
                        <div className="card-body">
                            {this.state.showFilter ? this.renderFilter() : ""}
                            <div className="table-responsive">
                                <table className="table table-hover table-sm">
                                    <thead className="">
                                        <tr>
                                            <th>#</th>
                                            <th>Date</th>
                                            <th>From</th>
                                            <th>To</th>
                                            <th>Direction</th>
                                            <th>Duration</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>{this.renderTableRows()}</tbody>
                                </table>
                            </div>
                            <Pagination
                                meta={this.props.meta}
                                onChange={this.pageChange}
                            />
                        </div>
                    </div>
                </div>
            </main>
        );
    }
}

export default Page;
