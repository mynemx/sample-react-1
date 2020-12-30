// import libs
import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { callSummaryRequest } from "../service";
import BarChart from "../../../../utils/BarChart";
import LineChart from "../../../../utils/LineChart";
import DoughnutChart from "../../../../utils/DoughnutChart";
import SearchDate from "../../../../utils/SearchDate";
import SearchCheckbox from "../../../../utils/SearchCheckbox";

class Page extends PureComponent {
    static displayName = "UserPage";
    static propTypes = {
        user: PropTypes.object.isRequired,
        dispatch: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        const user = this.props.user.toJson();
        const { sipExtensions, callSummary, orderSummary } = this.props;

        this.state = {
            user,
            callSummary,
            orderSummary,
            sipExtensions,
            filter: {
                exten: [],
                calldate: ""
            }
        };

        this.handleChecked = this.handleChecked.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.pageChange = this.pageChange.bind(this);
    }

    componentDidMount() {
        const { dispatch } = this.props;
        const user = this.props.user.toJson();
        if (user.id) {
            dispatch(callSummaryRequest({}));
        }
    }

    pageChange() {
        this.props.dispatch(callSummaryRequest(this.state.filter));
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

    handleChange(name, value) {
        const filter = Object.assign(
            {},
            { ...this.state.filter, [name]: value }
        );
        this.setState({ filter });
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const user = nextProps.user.toJson();
        const { callSummary } = nextProps;
        const { dispatch } = this.props;

        if (!_.isEqual(this.state.user, user)) {
            this.setState({ user });
            dispatch(callSummaryRequest({}));
        }
        this.setState({ callSummary });
    }

    render() {
        return (
            <main className="page-container" role="main">
                <div className="row mt-3 bg-white py-2">
                    <div className="col">
                        <span className="float-right">
                            {`
                                ${this.state.callSummary.startDate} - ${this.state.callSummary.endDate}`}
                        </span>
                    </div>
                </div>

                <div className="row mt-3 bg-white py-2 pt-3 ">
                    <div className="col">
                        <span className="float-right">
                            <div className="floating-label float-left mr-5 mb-0 pb-2">
                                <SearchCheckbox
                                    label="User"
                                    name="exten"
                                    options={this.props.sipExtensions}
                                    field="regexten"
                                    value={this.state.filter.exten}
                                    onChange={this.handleChecked}
                                    displayField="callerid"
                                />
                            </div>

                            <div className="floating-label float-left mr-3 mb-0 pb-2">
                                <SearchDate
                                    label="Month"
                                    name="calldate"
                                    value={this.state.filter.calldate}
                                    onChange={this.handleChange}
                                />
                            </div>
                            <div className="floating-label float-left mr-3 mb-0 pb-2">
                                <button
                                    onClick={e => this.pageChange()}
                                    type="button"
                                    className="btn btn-sm btn-primary"
                                >
                                    Filter
                                </button>
                            </div>
                        </span>
                    </div>
                </div>
                <div className="row mt-3 bg-white py-2">
                    <div className="col">
                        <div className="card bg-primary">
                            <div className="card-body py-1">
                                <div className="card-title text-white">
                                    Inbound Call
                                </div>
                                <div className="mt-3 clearfix text-white h5">
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
                    <div className="col">
                        <div className="card bg-primary">
                            <div className="card-body py-1">
                                <div className="card-title text-white">
                                    Inbound Duration
                                </div>
                                <div className="mt-3 text-right text-white h5">
                                    {this.state.callSummary.timeInboundSeconds}
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
                                    {this.state.callSummary.timeOutboundSeconds}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row mt-3 bg-white py-2">
                    <div className="col">
                        <h6 className="pl-3">OUTBOUND CALLS</h6>

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

                    <div
                        className="col-md-6 chart-wrapper"
                        style={{ maxHeight: "250px" }}
                    >
                        <DoughnutChart
                            data={this.state.callSummary.calls}
                            value="percentage"
                            label="label"
                            title="Call Summary"
                            colors={["#4CAF50", "#3E517A", "#E72649"]}
                        />
                    </div>
                </div>
                <div className="row mt-3 bg-white py-2">
                    <div className="col">
                        <h6 className="pl-3">INBOUND CALLS</h6>
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
                    <div
                        className="col-md-6 chart-wrapper"
                        style={{ maxHeight: "250px" }}
                    >
                        <DoughnutChart
                            data={this.state.callSummary.callInbound}
                            value="percentage"
                            label="label"
                            title="Call Summary"
                            colors={["#4CAF50", "#3E517A", "#E72649"]}
                        />
                    </div>
                </div>
            </main>
        );
    }
}

export default React.memo(Page);
