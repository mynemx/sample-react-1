// import libs
import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { gatewayReportRequest } from "../new_service";
import SearchDate from "../../../../utils/SearchDate";
import SearchDropdown from "../../../../utils/SearchDropdown";
import { Chart } from "react-google-charts";
import moment from 'moment';

class Page extends PureComponent {
    static displayName = "UserPage";
    static propTypes = {
        user: PropTypes.object.isRequired,
        dispatch: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        const user = this.props.user.toJson();
        const { callGateways, gatewaySummary } = this.props;

        this.state = {
            user,
            gatewaySummary,
            callGateways,
            filter: {
                gateway: "",
                calldate: moment().format('YYYY-MM-DD'),
            }
        };

        this.handleChange = this.handleChange.bind(this);
        this.pageChange = this.pageChange.bind(this);
    }

    componentDidMount() {
        const { dispatch } = this.props;
        const user = this.props.user.toJson();
        if (user.id) {
            dispatch(gatewayReportRequest({}));
        }
    }

    pageChange() {
        this.props.dispatch(gatewayReportRequest(this.state.filter));
    }

    getChart(calls, days, column="noOfSuccessfullOutboundCalls"){
        let labels = ['Date'];
        let data = [];
        
        for (const prop in calls) {
            labels.push(prop);
        }
        data.push(labels);

        days.forEach(day =>{
            let dataRow = [day];
            
            for (const prop in calls) {
                let call = calls[prop].find(call => call.date == day)
                dataRow.push( call ? call[column] : 0)
            }
            data.push(dataRow);
        })

        return data;
    }

    handleChange(name, value) {
        const filter = Object.assign(
            {},
            { ...this.state.filter, [name]: value }
        );
        this.setState({ filter });
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const { gatewaySummary, user } = nextProps;
        const { dispatch } = this.props;
        // console.log(gatewaySummary)
        if (!_.isEqual(this.state.user, user)) {
            this.setState({ user });
            dispatch(gatewayReportRequest({}));
        }
        this.setState({ gatewaySummary });
    }

    render() {
        return (
            <main className="page-container" role="main">
                <div className="row mt-3 bg-white py-2">
                    <div className="col">
                        <span className="float-right">
                            {`
                                ${this.state.gatewaySummary.startDate} - ${this.state.gatewaySummary.endDate}`}
                        </span>
                    </div>
                </div>

                <div className="row mt-3 bg-white py-2 pt-3 ">
                    <div className="col">
                        <span className="float-right">


                            <div className="floating-label float-left mr-3 mb-0 pb-2">
                                <SearchDropdown
                                    label="gateway"
                                    name="gateway"
                                    list={this.props.callGateways}
                                    field="didNumber"
                                    displayField="label"
                                    value={this.state.filter.gateway}
                                    onChange={this.handleChange}
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
                        <h6 className="pl-3">OUTBOUND CALLS</h6>

                        <ol className="actions-container" style={{background: "#fff"}}>
                            

                            <li className="action-item">
                                <div className="px-3 py-2">
                                    <div className="spacer-xs">
                                        <small>
                                           Credit Utilization
                                        </small>
                                        <h5 className="mt-2 text-primary">
                                            {this.state.gatewaySummary.outboundCost.toLocaleString()}
                                        </h5>
                                    </div>
                                </div>
                            </li>

                            <li className="action-item">
                                <div className="px-3 py-2">
                                    <div className="spacer-xs">
                                        <small>
                                           Total Duration
                                        </small>
                                        <h5 className="mt-2 text-primary">
                                            {this.state.gatewaySummary.sumOfOutbound}
                                        </h5>
                                    </div>
                                </div>
                            </li>

                            <li className="action-item">
                                <div className="px-3 py-2">
                                    <div className="spacer-xs">
                                        <small>
                                           Average Outbound
                                        </small>
                                        <h5 className="mt-2 text-primary">
                                            {this.state.gatewaySummary.averageOutbound}
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
                                            {this.state.gatewaySummary.longestTalkTimeOutbound}
                                        </h5>
                                    </div>
                                </div>
                            </li>

                            <li className="action-item">
                                <div className="px-3 py-2">
                                    <div className="spacer-xs">
                                        <small>
                                           No of Calls
                                        </small>
                                        <h5 className="mt-2 text-primary">
                                            {this.state.gatewaySummary.noOfOutboundCalls}
                                        </h5>
                                    </div>
                                </div>
                            </li>

                            <li className="action-item">
                                <div className="px-3 py-2">
                                    <div className="spacer-xs">
                                        <small>
                                        No of Answered Calls
                                        </small>
                                        <h5 className="mt-2 text-primary">
                                            {this.state.gatewaySummary.noOfSuccessfullOutboundCalls}
                                        </h5>
                                    </div>
                                </div>
                            </li>

                            <li className="action-item">
                                <div className="px-3 py-2">
                                    <div className="spacer-xs">
                                        <small>
                                        No of Unanswered Calls
                                        </small>
                                        <h5 className="mt-2 text-primary">
                                            {this.state.gatewaySummary.noOfUnansweredOutboundCalls}
                                        </h5>
                                    </div>
                                </div>
                            </li>

                            <li className="action-item">
                                <div className="px-3 py-2">
                                    <div className="spacer-xs">
                                        <small>
                                        No of Failed Calls
                                        </small>
                                        <h5 className="mt-2 text-primary">
                                            {this.state.gatewaySummary.noOfFailedOutboundCalls}
                                        </h5>
                                    </div>
                                </div>
                            </li>
                           
                            <li className="action-item">
                                <div className="px-3 py-2">
                                    <div className="spacer-xs">
                                        <small>
                                           No of Calls Outside Business Hours
                                        </small>
                                        <h5 className="mt-2 text-primary">
                                            {this.state.gatewaySummary.noOfOutboundCallsOutsideBusinessHours}
                                        </h5>
                                    </div>
                                </div>
                            </li>
                           
                        </ol>
                    </div>

                </div>




                <div className="row mt-3 bg-white py-2">
                    <div className="col">
                        <h6 className="pl-3">INBOUND CALLS</h6>

                        <ol className="actions-container" style={{background: "#fff"}}>
                            

                            <li className="action-item">
                                <div className="px-3 py-2">
                                    <div className="spacer-xs">
                                        <small>
                                           Total Duration
                                        </small>
                                        <h5 className="mt-2 text-primary">
                                            {this.state.gatewaySummary.sumOfInbound}
                                        </h5>
                                    </div>
                                </div>
                            </li>

                            <li className="action-item">
                                <div className="px-3 py-2">
                                    <div className="spacer-xs">
                                        <small>
                                           Average Inbound
                                        </small>
                                        <h5 className="mt-2 text-primary">
                                            {this.state.gatewaySummary.averageInbound}
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
                                            {this.state.gatewaySummary.longestTalkTimeInbound}
                                        </h5>
                                    </div>
                                </div>
                            </li>

                            <li className="action-item">
                                <div className="px-3 py-2">
                                    <div className="spacer-xs">
                                        <small>
                                           No of Calls
                                        </small>
                                        <h5 className="mt-2 text-primary">
                                            {this.state.gatewaySummary.noOfInboundCalls}
                                        </h5>
                                    </div>
                                </div>
                            </li>

                            <li className="action-item">
                                <div className="px-3 py-2">
                                    <div className="spacer-xs">
                                        <small>
                                        No of Answered Calls
                                        </small>
                                        <h5 className="mt-2 text-primary">
                                            {this.state.gatewaySummary.noOfSuccessfullInboundCalls}
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
                                            {this.state.gatewaySummary.noOfUnansweredInboundCalls}
                                        </h5>
                                    </div>
                                </div>
                            </li>

                            <li className="action-item">
                                <div className="px-3 py-2">
                                    <div className="spacer-xs">
                                        <small>
                                        No of Failed Calls
                                        </small>
                                        <h5 className="mt-2 text-primary">
                                            {this.state.gatewaySummary.noOfFailedInboundCalls}
                                        </h5>
                                    </div>
                                </div>
                            </li>
                           
                            <li className="action-item">
                                <div className="px-3 py-2">
                                    <div className="spacer-xs">
                                        <small>
                                           No of Calls Outside Business Hours
                                        </small>
                                        <h5 className="mt-2 text-primary">
                                            {this.state.gatewaySummary.noOfOutboundCallsOutsideBusinessHours}
                                        </h5>
                                    </div>
                                </div>
                            </li>

                            <li className="action-item">
                                <div className="px-3 py-2">
                                    <div className="spacer-xs">
                                        <small>
                                           No of Calls Abandoned Outside Business Hours
                                        </small>
                                        <h5 className="mt-2 text-primary">
                                            {this.state.gatewaySummary.noOfInboundCallsAbandonedOutsideBusinessHours}
                                        </h5>
                                    </div>
                                </div>
                            </li>
                           
                        </ol>
                    </div>

                </div>


                <div className="row mt-3 bg-white py-2">
                    <div className="col">
                        <Chart
                            width={'1100px'}
                            height={'400px'}
                            chartType="Bar"
                            loader={<div>Loading Chart</div>}
                            data={this.getChart(this.state.gatewaySummary.calls, this.state.gatewaySummary.days, 'outboundCost')}
                            options={{
                                chart: {
                                title: 'Gateway Utilization Per day',
                                subtitle: 'Credit Utilized per day',
                                },
                            }}
                            // For tests
                            rootProps={{ 'data-testid': '2' }}
                            />
                    </div>
                   
                </div>

                <div className="row mt-3 bg-white py-2">
                    <div className="col">
                        <Chart
                            width={'1100px'}
                            height={'400px'}
                            chartType="Bar"
                            loader={<div>Loading Chart</div>}
                            data={this.getChart(this.state.gatewaySummary.calls, this.state.gatewaySummary.days, 'noOfSuccessfullOutboundCalls')}
                            options={{
                                chart: {
                                title: 'Gateway Utilization Per day',
                                subtitle: 'Number of Successfull Outbound calls per day',
                                },
                            }}
                            // For tests
                            rootProps={{ 'data-testid': '2' }}
                            />
                    </div>
                   
                </div>

                <div className="row mt-3 bg-white py-2">
                    <div className="col">
                        <Chart
                            width={'1100px'}
                            height={'400px'}
                            chartType="Bar"
                            loader={<div>Loading Chart</div>}
                            data={this.getChart(this.state.gatewaySummary.calls, this.state.gatewaySummary.days, 'noOfSuccessfullInboundCalls')}
                            options={{
                                chart: {
                                title: 'Gateway Utilization Per day',
                                subtitle: 'Number of Successfull Inbound calls per day',
                                },
                            }}
                            // For tests
                            rootProps={{ 'data-testid': '2' }}
                            />
                    </div>
                   
                </div>


            </main>
        );
    }
}

export default React.memo(Page);
