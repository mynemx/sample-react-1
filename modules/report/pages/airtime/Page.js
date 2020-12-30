// import libs
import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { callMonthlySummaryRequest } from "../service";
import BarChart from "../../../../utils/BarChart";
import LineChart from "../../../../utils/LineChart";
import DoughnutChart from "../../../../utils/DoughnutChart";

class Page extends PureComponent {
    static displayName = "UserPage";
    static propTypes = {
        user: PropTypes.object.isRequired,
        dispatch: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        const user = this.props.user.toJson();
        const { callMonthlySummary } = this.props;

        this.state = {
            user,
            callMonthlySummary
        };
    }

    componentDidMount() {
        const { dispatch } = this.props;
        const user = this.props.user.toJson();
        if (user.id) {
            dispatch(callMonthlySummaryRequest({}));
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const user = nextProps.user.toJson();
        const { callMonthlySummary } = nextProps;
        const { dispatch } = this.props;

        if (!_.isEqual(this.state.user, user)) {
            this.setState({ user });
            dispatch(callMonthlySummaryRequest({}));
        }
        this.setState({ callMonthlySummary });
    }

    render() {
        return (
            <main className="page-container" role="main">
                <div className="row mt-3 bg-white py-2">
                    <div className="col">
                        <div className="card bg-success">
                            <div className="card-body py-1">
                                <div className="card-title text-white">
                                    Overall Outbound Call
                                </div>

                                <div className="mt-3 clearfix text-white h5">
                                    <span className="float-right">
                                        {
                                            this.state.callMonthlySummary
                                                .timeOutboundSeconds
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
                                    Overall Credit Utilization
                                </div>
                                <div className="mt-3 text-right text-white h5">
                                    {this.state.callMonthlySummary.outboundCost.toLocaleString()}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <span className="float-right">
                            {`
                                ${this.state.callMonthlySummary.startDate} - ${this.state.callMonthlySummary.endDate}`}
                        </span>
                    </div>
                </div>
                {this.state.callMonthlySummary.months.map((month, index) => {
                    return (
                        <div key={index} className="row mt-3 bg-white py-2">
                            <div className="col">
                                <div className="card bg-success">
                                    <div className="card-body py-1">
                                        <div className="card-title text-white">
                                            Outbound Call
                                        </div>

                                        <div className="mt-3 clearfix text-white h5">
                                            <span className="float-right">
                                                {month.sumedOutboundCalls}
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
                                            {month.outboundCost.toLocaleString()}
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
                                            {month.timeOutboundSeconds}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <span className="float-right">
                                    {month.date}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </main>
        );
    }
}

export default Page;
