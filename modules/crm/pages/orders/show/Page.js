import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { orderEditRequest, orderRemoveRequest } from "../service";
import MoreVertIcon from "@material-ui/icons/MoreVert";

// import components
import OrderItemRow from "./components/OrderItemRow";
import { showNotification } from "../../../../../utils/Notification";
import { authPageLoading } from "../../../../auth/store/actions";

class Page extends PureComponent {
    static displayName = "OrdersPage";
    static propTypes = {
        order: PropTypes.object.isRequired,
        match: PropTypes.object.isRequired,
        dispatch: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        const order = this.props.order.toJson();
        this.state = {
            order
        };

        this.handleRemove = this.handleRemove.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(authPageLoading(false));
        this.loadOrder();
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const order = nextProps.order.toJson();

        if (!_.isEqual(this.state.order, order)) {
            this.setState({ order });
        }
    }

    loadOrder() {
        const { match, order, dispatch } = this.props;

        if (!order.id) {
            dispatch(orderEditRequest(match.params.id)).catch(
                ({ error, statusCode }) => {
                    showNotification(error, "error");
                    if (statusCode == 404) {
                        this.props.history.push("/app/crm/orders");
                    }
                }
            );
        }
    }

    handleRemove(id) {
        this.props.dispatch(orderRemoveRequest(id)).then(() => {
            this.props.history.push("/app/crm/orders");
        });
    }
    renderItems() {
        const { items } = this.state.order;
        return items.map((item, index) => {
            return <OrderItemRow key={index} item={item} index={index} />;
        });
    }

    render() {
        const { order } = this.state;
        return (
            <main className="page-container" role="main">
                <ol className="breadcrumb">
                    <li>
                        <Link to="/app/crm">CRM</Link>
                    </li>
                    <li>
                        <Link to="/app/crm/orders">Orders</Link>
                    </li>
                    <li className="active">Details</li>
                </ol>
                <div className="page-content">
                    <div className="row">
                        <div className="col-xs-12 col-sm-5 col-md-4 col-lg-3 ">
                            <div className="card ">
                                <div className="card-body px-0">
                                    <div className="col">
                                        <div className="form-group mb-2">
                                            <label className="label mb-0">
                                                Customer Name
                                            </label>
                                            <div className="pl-3 text-default">
                                                {order.customerName}
                                            </div>
                                        </div>
                                        <div className="form-group mb-2">
                                            <label className="label mb-0">
                                                Client Type
                                            </label>
                                            <div className="pl-3 text-default">
                                                {order.category}
                                            </div>
                                        </div>
                                        <div className="form-group mb-2">
                                            <label className="label mb-0">
                                                Order No.
                                            </label>
                                            <div className="pl-3 text-default">
                                                {order.orderNo}
                                            </div>
                                        </div>

                                        <div className="form-group mb-2">
                                            <label className="label mb-0">
                                                Order Date
                                            </label>
                                            <div className="pl-3 text-default">
                                                {order.orderDate}
                                            </div>
                                        </div>

                                        <div className="form-group mb-2">
                                            <label className="label mb-0">
                                                Total Amount
                                            </label>
                                            <div className="pl-3 text-default">
                                                {`${
                                                    order.currencyCode
                                                } ${order.totalPrice.toLocaleString()}`}
                                            </div>
                                        </div>
                                        <div className="form-group mb-2">
                                            <label className="label mb-0">
                                                Sales Rep
                                            </label>
                                            <div className="pl-3 text-default">
                                                {order.salesRepName}
                                            </div>
                                        </div>

                                        <div className="form-group mb-2">
                                            <label className="label mb-0">
                                                Status
                                            </label>
                                            <div className="pl-3 text-default">
                                                {order.statusName}
                                            </div>
                                        </div>
                                        <div className="form-group mb-2">
                                            <label className="label mb-0">
                                                Contact Person
                                            </label>
                                            <div className="pl-3 text-default">
                                                {order.contactName}
                                            </div>
                                        </div>

                                        <div className="form-group mb-2">
                                            <label className="label mb-0">
                                                Contact Number
                                            </label>
                                            <div className="pl-3 text-default">
                                                {order.contactNumber}
                                            </div>
                                        </div>
                                        <div className="form-group mb-2">
                                            <label className="label mb-0">
                                                Delivery Address
                                            </label>
                                            <div className="pl-3 text-default">
                                                {order.deliveryAddress}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-xs-12 col-sm-7 col-md-8 col-lg-9 ">
                            <div className="card">
                                <div className="card-header">
                                    <div className="card-title">
                                        Order Items
                                    </div>
                                    <div className="heading-elements">
                                        <Link
                                            to="/app/crm/orders/add"
                                            className="btn btn-primary btn-sm"
                                        >
                                            Add Order
                                        </Link>
                                        <div className="btn-group btn-sm action-btn">
                                            <button
                                                type="button"
                                                className="btn btn-sm dropdown-toggle"
                                                data-toggle="dropdown"
                                                aria-haspopup="true"
                                                aria-expanded="false"
                                            >
                                                Menu
                                            </button>

                                            <div className="dropdown-menu">
                                                <Link
                                                    className="dropdown-item"
                                                    to={`/app/crm/orders/edit/${order.id}`}
                                                >
                                                    Edit
                                                </Link>
                                                <Link
                                                    className="dropdown-item"
                                                    to="#"
                                                    onClick={() =>
                                                        this.handleRemove(
                                                            order.id
                                                        )
                                                    }
                                                >
                                                    Delete
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="table-responsive">
                                        <table className="table table-hover table-sm">
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Name</th>
                                                    <th>Description</th>
                                                    <th>Quantity</th>
                                                    <th>Unit Price</th>
                                                    <th>Price</th>
                                                </tr>
                                            </thead>
                                            <tbody>{this.renderItems()}</tbody>
                                            <tfoot>
                                                <tr>
                                                    <td colSpan="4"></td>
                                                    <td>Sub Total</td>
                                                    <td className="text-right h6">
                                                        {order.subTotal.toLocaleString()}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td colSpan="4"></td>
                                                    <td>Total + Vat</td>
                                                    <td className="text-right h6">
                                                        {order.totalPrice.toLocaleString()}
                                                    </td>
                                                </tr>
                                            </tfoot>
                                        </table>
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

export default React.memo(Page);
