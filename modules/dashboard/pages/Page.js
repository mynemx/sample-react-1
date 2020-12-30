// import libs
import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { dashboardRequest } from "./service";
import BarChart from "../../../utils/BarChart";
import LineChart from "../../../utils/LineChart";
import DoughnutChart from "../../../utils/DoughnutChart";
import { authPageLoading } from "../../auth/store/actions";

class Page extends PureComponent {
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

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(authPageLoading(false));
        const user = this.props.user.toJson();
        if (user.id) {
            dispatch(dashboardRequest({}));
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const user = nextProps.user.toJson();
        const { callSummary, orderSummary } = nextProps;
        const { dispatch } = this.props;

        if (!_.isEqual(this.state.user, user)) {
            this.setState({ user });
            dispatch(dashboardRequest({}));
        }
        this.setState({ callSummary, orderSummary });
    }

    render() {
        return (
            <main className="page-container dashboard-container" role="main">
                <div className="row">
                    <div className="col-md-6 col">
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
                                                title="Orders Generated Per day"
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
                                                title="Sales Order Generated per day"
                                                color="#3E517A"
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
                                        <div className="table-responsive">
                                            <table className="table table-sm table-strip">
                                                <tbody>
                                                    <tr>
                                                        <th>Order Gendered</th>
                                                        <th>
                                                            {this.state.orderSummary.amountOrders.toLocaleString()}
                                                        </th>
                                                    </tr>
                                                    <tr>
                                                        <th>
                                                            Actual Amount Sold
                                                        </th>
                                                        <th>
                                                            {this.state.orderSummary.soldAmount.toLocaleString()}
                                                        </th>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col">
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

                        <div className="row mt-3">
                            <div
                                className="col chart-wrapper bg-white py-2"
                                style={{ maxHeight: "250px" }}
                            >
                                <h6 className="pl-3">OUTBOUND CALLS</h6>
                                <DoughnutChart
                                    data={this.state.callSummary.calls}
                                    value="percentage"
                                    label="label"
                                    title="Call Summary"
                                    colors={["#4CAF50", "#3E517A", "#E72649"]}
                                />
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col bg-white py-3">
                                <ol className="actions-container">
                                    {this.state.callSummary.calls.map(
                                        (action, index) => {
                                            return (
                                                <li key={index}>
                                                    <div className="px-3 py-2">
                                                        <div className="spacer-xs">
                                                            <small>
                                                                {" "}
                                                                {action.label.toUpperCase()}{" "}
                                                            </small>
                                                            <h5 className="mt-2 text-primary">
                                                                {action.data}
                                                            </h5>
                                                        </div>
                                                    </div>
                                                </li>
                                            );
                                        }
                                    )}
                                </ol>
                            </div>
                        </div>

                        <div className="row mt-3">
                            <div
                                className="col chart-wrapper bg-white py-2"
                                style={{ maxHeight: "250px" }}
                            >
                                <h6 className="pl-3">INBOUND CALLS</h6>
                                <DoughnutChart
                                    data={this.state.callSummary.callInbound}
                                    value="percentage"
                                    label="label"
                                    title="Call Summary"
                                    colors={["#4CAF50", "#3E517A", "#E72649"]}
                                />
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col bg-white py-3">
                                <ol className="actions-container">
                                    {this.state.callSummary.callInbound.map(
                                        (action, index) => {
                                            return (
                                                <li key={index}>
                                                    <div className="px-3 py-2">
                                                        <div className="spacer-xs">
                                                            <small>
                                                                {" "}
                                                                {action.label.toUpperCase()}{" "}
                                                            </small>
                                                            <h5 className="mt-2 text-primary">
                                                                {action.data}
                                                            </h5>
                                                        </div>
                                                    </div>
                                                </li>
                                            );
                                        }
                                    )}
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        );
    }
}

export default Page;
