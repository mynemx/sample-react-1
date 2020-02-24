import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";

const displayName = "OrderList";
const propTypes = {
    contact: PropTypes.object.isRequired
};

const OrderList = ({ contact, orders, dispatch }) => {
    const renderOrders = useCallback(() => {
        return orders.map((order, index) => {
            return (
                <tr key={order.id}>
                    <td scope="row">{index + 1}</td>
                    <td>
                        <Link className="" to={`/app/crm/orders/${order.id}`}>
                            {order.orderNo}
                        </Link>
                    </td>
                    <td>
                        {order.orderedDate &&
                            order.orderedDate.format("MMM, DD YYYY")}
                    </td>
                    <td>{order.statusName}</td>
                    <td>{order.currencyCode + " " + order.totalPrice}</td>
                    <td>{order.salesRepName}</td>
                </tr>
            );
        });
    });

    return (
        <div className="card">
            <div className="card-header">
                <div className="card-title">orders</div>
                <div className="heading-elements"></div>
            </div>
            <div className="card-body">
                <div className="table-responsive">
                    <table className="table table-hover table-sm">
                        <thead className="">
                            <tr>
                                <th>#</th>
                                <th>Order No</th>
                                <th>Order Date</th>
                                <th>Order Status</th>
                                <th>Amount</th>
                                <th>Sales Rep</th>
                            </tr>
                        </thead>
                        <tbody>{renderOrders()}</tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

OrderList.displayName = displayName;
OrderList.propTypes = propTypes;

export default React.memo(OrderList);
