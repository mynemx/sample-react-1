// import libs
import React, { Component } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import SearchText from "../../../../../utils/SearchText";
import SearchDropdown from "../../../../../utils/SearchDropdown";
import SearchDate from "../../../../../utils/SearchDate";
import { callEventListRequest } from "../service";

// import components
import TableRow from "./components/TableRow";
import { Link } from "react-router-dom";

class Page extends Component {
    static displayName = "CallLogsPage";
    static propTypes = {
        callEvents: PropTypes.array.isRequired,
        dispatch: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            showFilter: false,
            filter: {
                destination: "",
                direction: "",
                caller: "",
                calldate: "",
                limits: 200
            },
            callEvents: this.props.callEvents,
            socket: this.props.socket
        };

        this.handleChecked = this.handleChecked.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.toggleFilter = this.toggleFilter.bind(this);
        this.pageChange = this.pageChange.bind(this);
    }

    initSocket = () => {
        const socket = this.state.socket;
        socket.on("connect", () => {
            console.log("connected");
        });

        this.setState({ socket });
    };

    UNSAFE_componentWillMount() {
        const { dispatch } = this.props;
        // this.initSocket();
        // dispatch(callEventListRequest());
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const { callEvents, socket } = nextProps;
        if (!_.isEqual(this.state.callEvents, callEvents)) {
            this.setState({ callEvents });
        }
        this.setState({ socket });
    }

    pageChange(pageNumber = 1) {
        const form = Object.assign({}, { ...this.state.filter, pageNumber });
        // this.props.dispatch(callEventListRequest(form));
        if (form.caller != "") {
            const callEvents = this.props.callEvents.filter(
                event => event.Event == form.caller
            );
            this.setState({ callEvents });
        } else {
            this.setState({ callEvents: this.props.callEvents });
        }
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
        return this.state.callEvents.map((callEvent, index) => {
            return <TableRow key={index} callEvent={callEvent} index={index} />;
        });
    }

    renderFilter() {
        const { filter } = this.state;
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
                        list={[{ name: "OUT" }, { name: "IN" }]}
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
                            Call Events
                        </Link>
                    </li>
                </ol>
                <div className="page-content">
                    <div className="card">
                        <div className="card-header">
                            <div className="card-title">Call Events</div>
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
                        </div>
                    </div>
                </div>
            </main>
        );
    }
}

export default Page;
