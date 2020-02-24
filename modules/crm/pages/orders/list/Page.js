// import libs
import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import {
    orderListRequest,
    orderUpdateRequest,
    orderRemoveRequest
} from "../service";

// import components
import OrderRow from "./components/OrderRow";
import Pagination from "../../../../../utils/Pagination";
import { Link } from "react-router-dom";
import { authPageLoading } from "../../../../auth/store/actions";

class Page extends PureComponent {
    static displayName = "UsersPage";
    static propTypes = {
        orders: PropTypes.array.isRequired,
        dispatch: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            showFilter: false,
            filter: {
                name: "",
                user: [],
                limits: 50
            }
        };
        this.handleRemove = this.handleRemove.bind(this);
        this.pageChange = this.pageChange.bind(this);
    }

    componentDidMount() {
        const { dispatch, orders } = this.props;
        dispatch(authPageLoading(false));
        const form = Object.assign(
            {},
            { ...this.state.filter, loader: orders.length < 5 ? true : false }
        );
        dispatch(orderListRequest(form));
    }

    pageChange(pageNumber) {
        this.props.dispatch(orderListRequest({ pageNumber }));
    }

    handleRemove(id) {
        this.props.dispatch(orderRemoveRequest(id));
    }

    renderOrders() {
        return this.props.orders.map((order, index) => {
            return (
                <OrderRow
                    key={order.id}
                    order={order}
                    index={index}
                    handleRemove={this.handleRemove}
                />
            );
        });
    }

    render() {
        return (
            <main className="page-container" role="main">
                <ol className="breadcrumb">
                    <li>
                        <Link to="/app/crm">CRM</Link>
                    </li>
                    <li>
                        <Link to="/app/crm/orders">
                            Orders ({this.props.meta.total})
                        </Link>
                    </li>
                </ol>
                <div className="page-content">
                    <div className="card">
                        <div className="card-header">
                            <div className="card-title">
                                Orders({this.props.meta.count})
                            </div>
                            <div className="heading-elements">
                                <Link
                                    to="/app/crm/orders/add"
                                    className="btn btn-primary btn-sm"
                                >
                                    Add Order
                                </Link>
                            </div>
                        </div>
                        <div className="card-body">
                            <table className="table table-striped table-sm">
                                <thead className="">
                                    <tr>
                                        <th>#</th>
                                        <th>Order No</th>
                                        <th>Client Name</th>
                                        <th>Contact Number</th>
                                        <th>Sales Rep</th>
                                        <th>Ordered Date</th>
                                        <th>Status</th>
                                        <th>Price</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>{this.renderOrders()}</tbody>
                            </table>
                        </div>
                        <Pagination
                            meta={this.props.meta}
                            onChange={this.pageChange}
                        />
                    </div>
                </div>
            </main>
        );
    }
}

export default Page;
