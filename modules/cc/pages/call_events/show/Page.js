// import libs
import React, { Component } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { callSummaryRequest, orderSummaryRequest } from "../service";
import BarChart from "../../../../../utils/BarChart";
import LineChart from "../../../../../utils/LineChart";

class Page extends Component {
    static displayName = "UserPage";
    static propTypes = {
        user: PropTypes.object.isRequired,
        dispatch: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        const user = this.props.user.toJson();
        const { callSummary, orderSummary } = this.props;

        this.state = {
            user,
            callSummary,
            orderSummary
        };
    }

    UNSAFE_componentWillMount() {
        const { dispatch } = this.props;
        const user = this.props.user.toJson();
        if (user.id) {
            dispatch(callSummaryRequest({}));
            dispatch(orderSummaryRequest({}));
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const user = nextProps.user.toJson();
        const { callSummary, orderSummary } = nextProps;
        const { dispatch } = this.props;

        if (!_.isEqual(this.state.user, user)) {
            this.setState({ user });
            dispatch(callSummaryRequest({}));
            dispatch(orderSummaryRequest({}));
        }
        this.setState({ callSummary, orderSummary });
    }

    render() {
        return (
            <main className="page-container" role="main">
                <div className="row">
                    <div className="col">
                        <div className="row">
                            <div className="col">
                                <div className="card">
                                    <div className="card-body pt-1 chart-wrapper">
                                        <div className="mt-3 text-white h5">
                                            <BarChart
                                                data={
                                                    this.state.orderSummary
                                                        .userOrder
                                                }
                                                value="ordered"
                                                label="label"
                                                title="Orders Per Day"
                                                color="#70CAD1"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col">
                                <div className="card">
                                    <div className="card-body pt-1 chart-wrapper">
                                        <div className="mt-3 text-white h5">
                                            <LineChart
                                                data={
                                                    this.state.orderSummary
                                                        .userOrder
                                                }
                                                value="amount"
                                                label="label"
                                                title="Sales order per day"
                                                color="#3E517A"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="row">
                            <div className="col">
                                <div className="card bg-primary">
                                    <div className="card-body py-1">
                                        <div className="card-title text-white">
                                            Inbound Call
                                        </div>
                                        <div className="mt-3 text-white h5">
                                            <span className="text-left h6">
                                                Average:{" "}
                                                {
                                                    this.state.callSummary
                                                        .averageInboundSeconds
                                                }
                                            </span>

                                            <span className="float-right">
                                                {
                                                    this.state.callSummary
                                                        .sumedInboundCalls
                                                }
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="card bg-success">
                                    <div className="card-body py-1">
                                        <div className="card-title text-white">
                                            Outbound Call
                                        </div>

                                        <div className="mt-3 clearfix text-white h5">
                                            <span className="text-left h6">
                                                Average:{" "}
                                                {
                                                    this.state.callSummary
                                                        .averageOutboundSeconds
                                                }
                                            </span>

                                            <span className="float-right">
                                                {
                                                    this.state.callSummary
                                                        .sumedOutboundCalls
                                                }
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row mt-3">
                            <div className="col">
                                <div className="card bg-info">
                                    <div className="card-body py-1">
                                        <div className="card-title text-white">
                                            Credit Utilization
                                        </div>
                                        <div className="mt-3 text-right text-white h5">
                                            {this.state.callSummary.outboundCost.toLocaleString()}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row mt-3">
                            <div className="col">
                                <div className="card bg-primary">
                                    <div className="card-body py-1">
                                        <div className="card-title text-white">
                                            Inbound Duration
                                        </div>
                                        <div className="mt-3 text-right text-white h5">
                                            {
                                                this.state.callSummary
                                                    .timeInboundSeconds
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="card bg-success">
                                    <div className="card-body py-1">
                                        <div className="card-title text-white">
                                            Outbound Duration
                                        </div>

                                        <div className="mt-3 text-right text-white h5">
                                            {
                                                this.state.callSummary
                                                    .timeOutboundSeconds
                                            }
                                        </div>
                                    </div>
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
