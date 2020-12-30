// import libs
import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import SearchText from "../../../../../utils/SearchText";
import SearchDropdown from "../../../../../utils/SearchDropdown";
import SearchDate from "../../../../../utils/SearchDate";
import { callEventListRequest } from "../service";

// import components
import IncomingTableRow from "./components/IncomingTableRow";
import { Link } from "react-router-dom";
import { authPageLoading } from "../../../../auth/store/actions";
import ExtensionCard from "./components/ExtensionCard";

class Page extends PureComponent {
    static displayName = "CallLogsPage";
    static propTypes = {
        calls: PropTypes.array.isRequired,
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
            },
            calls: this.props.calls,
            agents: this.props.agents,
            extensions: this.props.extensions,
        };

        this.handleChecked = this.handleChecked.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.toggleFilter = this.toggleFilter.bind(this);
        this.pageChange = this.pageChange.bind(this);
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(authPageLoading(false));
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const { calls, agents } = nextProps;
        if (!_.isEqual(this.state.calls, calls)) {
            this.setState({ calls });
        }
        if (!_.isEqual(this.state.agents, agents)) {
            this.setState({ calls });
        }
    }

    pageChange(pageNumber = 1) {
        const form = Object.assign({}, { ...this.state.filter, pageNumber });
        // this.props.dispatch(callEventListRequest(form));
        if (form.caller != "") {
            const calls = this.props.calls.filter(
                event => event.Event == form.caller
            );
            this.setState({ calls });
        } else {
            this.setState({ calls: this.props.calls });
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
        const calls = this.state.calls.filter(call => call.agent == '');
        return calls.map((call, index) => {
            return <IncomingTableRow key={index} call={call} index={index} />;
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
        const {calls } = this.state;
        const {extensions } = this.props;
        return (
            <main className="page-container" role="main">
                <ol className="breadcrumb">
                    <li>
                        <Link to="/app/contact-center"> Contact Center </Link>
                    </li>
                    <li className="active">
                        <Link to="/app/contact-center/call-summaries">
                            {" "}
                            Call Summary
                        </Link>
                    </li>
                </ol>
                <div className="page-content">
                    <div className="card">

                        <div className="row">
                            
                            <div className="col-md-6">
                                <h5 className="h5 p-3"> Extensions </h5>
                                <ul className="label extension-summary" style={{minWidth: 200, display: "inline-flex"}}>
                                    {extensions.map((extension, index) => {
                                        return <ExtensionCard 
                                                    key={index} extension={extension} 
                                                    call={calls.find(call => call.agent == extension.regexten && (call.callStatus == "Up" || call.callStatus == "Hold"  || call.callStatus == "Ringing"  || call.callStatus == "Connecting") )} 
                                                    calls={calls.filter(call => call.agent == extension.regexten)} 
                                                    index={index} />;
                                    })}
                                </ul>
                            </div>

                            <div className="col-md-6">
                                <h5 className="h5 p-3"> Incoming Calls </h5>
                                <div className="table-responsive">
                                    <table className="table table-hover table-sm">
                                        <thead className="">
                                            <tr>
                                                <th>#</th>
                                                <th>Date</th>
                                                <th>Name</th>
                                                <th>From</th>
                                                <th>Call Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>{this.renderTableRows()}</tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        );
    }
}

export default Page;
