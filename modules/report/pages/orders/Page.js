// import libs
import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import _ from "lodash";

import { orderSummaryRequest } from "../service";
import BarChart from "../../../../utils/BarChart";
import LineChart from "../../../../utils/LineChart";
import DoughnutChart from "../../../../utils/DoughnutChart";
import SearchDate from "../../../../utils/SearchDate";
import SearchDropdown from "../../../../utils/SearchDropdown";
import { Chart } from "react-google-charts";

class Page extends PureComponent {
    static displayName = "UserPage";
    static propTypes = {
        user: PropTypes.object.isRequired,
        dispatch: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        const user = this.props.user.toJson();
        const { orderSummary } = this.props;

        this.state = {
            user,
            orderSummary,
            filter: {
                orderDate: "",
                userid: ""
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
            dispatch(orderSummaryRequest({}));
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const user = nextProps.user.toJson();
        const { orderSummary } = nextProps;
        const { dispatch } = this.props;

        if (!_.isEqual(this.state.user, user)) {
            this.setState({ user });
            dispatch(orderSummaryRequest({}));
        }
        if (!_.isEqual(this.state.orderSummary, orderSummary)) {
            this.setState({ orderSummary });
        }
    }

    pageChange() {
        this.props.dispatch(orderSummaryRequest(this.state.filter));
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

    getOrderAmountChart(){
        let labels = ['Date', "Amount Generated", "Amount Sales Of Order "];
        let data = [];
        
        data.push(labels);


        this.state.orderSummary.orderPerDay.forEach(order =>{
            let dataRow = [order.label, order.amount, order.amountSold];
            data.push(dataRow);
        })

        return data;
    }


    getOrderCountChart(){
        let labels = ['Date', "No Of Order Generated", "No Of Confirmed Orders"];
        let data = [];
        
        data.push(labels);


        this.state.orderSummary.orderPerDay.forEach(order =>{
            let dataRow = [order.label, order.ordered, order.soldOrders];
            data.push(dataRow);
        })

        return data;
    }

    render() {
        // console.log(this.state.orderSummary)
        return (
            <main className="page-container" role="main">
                <div className="row mt-3 bg-white py-2">
                    <div className="col">
                        <span className="float-right">
                            {`
                            ${this.state.orderSummary.startDate} - ${this.state.orderSummary.endDate}`}
                        </span>
                    </div>
                </div>
                <div className="row mt-3 bg-white py-2 pt-3 text-right">
                    <div className="col">
                        <span className="float-right">

                            <div className="floating-label float-left mr-3 mb-0 pb-2">
                                <SearchDropdown
                                    label="User"
                                    name="userId"
                                    list={this.props.users}
                                    field="id"
                                    displayField="name"
                                    value={this.state.filter.userId}
                                    onChange={this.handleChange}
                                />
                            </div>

                            <div className="floating-label float-left mr-3 mb-0 pb-2">
                                <SearchDate
                                    label="Month"
                                    name="orderDate"
                                    value={this.state.filter.orderDate}
                                    onChange={this.handleChange}
                                />
                            </div>
                            <div className="floating-label float-right mb-0 pb-2">
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
                                    No. Of Order Generated
                                </div>
                                <div className="mt-3 clearfix text-white h5">
                                    <span className="float-right">
                                        {this.state.orderSummary.totalOrders}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card bg-success">
                            <div className="card-body py-1">
                                <div className="card-title text-white">
                                    Amount Of Order
                                </div>

                                <div className="mt-3 clearfix text-white h5">
                                    <span className="float-right">
                                        {this.state.orderSummary.amountOrders.toLocaleString()}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col">
                        <div className="card bg-info">
                            <div className="card-body py-1">
                                <div className="card-title text-white">
                                    No of Confirmed Orders
                                </div>
                                <div className="mt-3 text-right text-white h5">
                                    {this.state.orderSummary.soldOrders}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card bg-primary">
                            <div className="card-body py-1">
                                <div className="card-title text-white">
                                    Actual Sales of orders
                                </div>
                                <div className="mt-3 text-right text-white h5">
                                    {this.state.orderSummary.soldAmount.toLocaleString()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="row mt-3 bg-white py-2">
                    <div className="col">
                        <h6 className="pl-3">SOURCE ORDER STATS</h6>

                        <ol className="actions-container" style={{background: "#fff"}}>
                            
                        {
                            this.state.orderSummary.orderPerSource.map((item, key) => {
                                return(
                                    <li key={key} className="action-item">
                                        <div className="px-3 py-2">
                                            <div className="spacer-xs">
                                                <small>
                                                {item.source}
                                                </small>
                                                <h5 className="mt-2 text-primary">
                                                    {item.amount.toLocaleString()} ({item.total})
                                                </h5>
                                            </div>
                                        </div>
                                    </li>
                                )
                            })
                            
                        }

                           
                        </ol>
                    </div>

                </div>

                <div className="row mt-3 bg-white py-2">
                    <div className="col-md-6 col">
                        <div className="card">
                            <div className="card-body pt-1 chart-wrapper">
                                <div className="mt-3 text-white h5">
                                    <BarChart
                                        data={
                                            this.state.orderSummary.orderPerDay
                                        }
                                        value="ordered"
                                        label="label"
                                        title="Orders Genereted Per Day"
                                        color="#70CAD1"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col">
                        <div className="card">
                            <div className="card-body pt-1 chart-wrapper">
                                <div className="mt-3 text-white h5">
                                    <LineChart
                                        data={
                                            this.state.orderSummary.orderPerDay
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


                <div className="row mt-3 bg-white py-2">
                    <div className="col">
                        <Chart
                            width={'1100px'}
                            height={'400px'}
                            chartType="Bar"
                            loader={<div>Loading Chart</div>}
                            data={this.getOrderAmountChart()}
                            options={{
                                chart: {
                                title: 'Amount Of Sales Order Per day',
                                subtitle: '',
                                },
                            }}
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
                            data={this.getOrderCountChart()}
                            options={{
                                chart: {
                                title: 'No Of Sales Order Per day',
                                subtitle: '',
                                },
                            }}
                            rootProps={{ 'data-testid': '2' }}
                            />
                    </div>
                   
                </div>

                <div className="row mt-3 bg-white py-2">
                    <div className="col">
                        <div className="card ">
                            <div className="card-body py-1">
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>Agents</th>
                                                <th>Amount</th>
                                                {this.state.orderSummary.weeks.map(
                                                    (week, index) => {
                                                        return (
                                                            <th key={index}>
                                                                Week {index + 1}
                                                            </th>
                                                        );
                                                    }
                                                )}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.orderSummary.orderPerWeek.map(
                                                (order, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <th>
                                                                {`${order.agent} (
                                                                ${order.total})`}
                                                            </th>
                                                            <th>
                                                                {order.amount.toLocaleString()}
                                                            </th>
                                                            {order.weeks.map(
                                                                (
                                                                    week,
                                                                    index
                                                                ) => {
                                                                    return (
                                                                        <td key={index}>
                                                                            {`${week.amount.toLocaleString()} (${
                                                                                week.ordered
                                                                            })`}
                                                                        </td>
                                                                    );
                                                                }
                                                            )}
                                                        </tr>
                                                    );
                                                }
                                            )}
                                        </tbody>
                                        <tfoot>
                                            <tr>
                                                <th>Date</th>
                                                <th></th>
                                                {this.state.orderSummary.weeks.map(
                                                    (week, index) => {
                                                        return (
                                                            <th key={index}>
                                                                {` ${week.sdate} - ${week.edate}`}
                                                            </th>
                                                        );
                                                    }
                                                )}
                                            </tr>
                                        </tfoot>
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

export default React.memo(Page);
