// import libs
import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import moment from "moment";

import CallIcon from "@material-ui/icons/Call";
import CallMadeIcon from "@material-ui/icons/CallMade";
import CallReceivedIcon from "@material-ui/icons/CallReceived";
import CallMissedIcon from "@material-ui/icons/CallMissed";
import { green, red } from '@material-ui/core/colors';

// import components
import TableRow from "./components/TableRow";
import { Link } from "react-router-dom";
import { authPageLoading } from "../../../../auth/store/actions";

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
            extension: this.props.extension.toJson(),
        };

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
    }

    renderTableRows() {
        const calls = this.state.calls;
        return calls.map((call, index) => {
            return <TableRow key={index} call={call} index={index} />;
        });
    }

    render() {
        const {calls, extension } = this.state;
        const {agent } = this.props;
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

                    <li className="active">
                        {`${extension.displayName} ${agent}`}
                    </li>
                </ol>
                <div className="page-content">
                    <div className="card">


                    <div className=" mt-3 bg-white py-2">
                    <div className="col">
                        <h6 className="pl-3"> AGENT STATS</h6>

                        <ol className="actions-container" style={{background: "#fff"}}>
                            
                            <li className="action-item">
                                <div className="px-3 py-2">
                                    <div className="spacer-xs">
                                        <small>
                                           No Of Calls
                                        </small>
                                        <h5 className="mt-2 text-primary">
                                            {this.state.calls.filter(call => call.direction == "OUT").length}
                                            { <CallMadeIcon fontSize="small" /> } 
                                            &nbsp;
                                            {this.state.calls.filter(call => call.direction == "IN").length}    
                                            { <CallReceivedIcon fontSize="small" /> } 
                   
                                        </h5>
                                    </div>
                                </div>
                            </li>

                            <li className="action-item">
                                <div className="px-3 py-2">
                                    <div className="spacer-xs">
                                        <small>
                                           No Of Answered Calls
                                        </small>
                                        <h5 className="mt-2 text-primary">
                                            {this.state.calls.filter(call => call.billsecs > 0).length}
                                            { <CallIcon fontSize="small" /> } 
                                        </h5>
                                    </div>
                                </div>
                            </li>

                            <li className="action-item">
                                <div className="px-3 py-2">
                                    <div className="spacer-xs">
                                        <small>
                                        No of Missed Calls
                                        </small>
                                        <h5 className="mt-2 text-primary">
                                            {this.state.calls.filter(call => call.agent == '').length}
                                            { <CallMissedIcon fontSize="small" /> } 
                                        </h5>
                                    </div>
                                </div>
                            </li>

                            <li className="action-item">
                                <div className="px-3 py-2">
                                    <div className="spacer-xs">
                                        <small>
                                           Long Talk Time
                                        </small>
                                        <h5 className="mt-2 text-primary">
                                        </h5>
                                    </div>
                                </div>
                            </li>

                            <li className="action-item">
                                <div className="px-3 py-2">
                                    <div className="spacer-xs">
                                        <small>
                                        Average Call Time
                                        </small>
                                        <h5 className="mt-2 text-primary">

                                        </h5>
                                    </div>
                                </div>
                            </li>

                        </ol>
                    </div>

                </div>

                        <div className="row">
                            <div className="col-md-12">
                                <h5 className="h5 p-3"> agents Calls </h5>
                                <div className="table-responsive">
                                    <table className="table table-hover table-sm">
                                        <thead className="">
                                            <tr>
                                                <th>#</th>
                                                <th>Date</th>
                                                <th>Name</th>
                                                <th>From</th>
                                                <th>To</th>
                                                <th>Direction</th>
                                                <th>Duration</th>
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
