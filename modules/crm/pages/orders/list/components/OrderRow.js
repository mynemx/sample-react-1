import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";

const displayName = "OrderRow";
const propTypes = {
    index: PropTypes.number.isRequired,
    order: PropTypes.object.isRequired,
    handleRemove: PropTypes.func.isRequired
};

const OrderRow = ({ index, order, handleRemove }) => {
    return (
        <tr key={order.id}>
            <td scope="row">{index + 1}</td>
            <td>
                <Link className="" to={`orders/${order.id}`}>
                    {order.orderNo}
                </Link>
            </td>
            <td>{order.clientName}</td>
            <td>{order.contactNumber}</td>
            <td>{order.salesRepName}</td>
            <td>{order.source}</td>
            <td>
                {order.orderedDate && order.orderedDate.format("MMM, DD YYYY")}
            </td>
            <td>{order.statusName}</td>
            <td>
                {order.currencyCode + " " + order.subTotal.toLocaleString()}
            </td>
            <td>
                <div className="btn-group btn-sm action-btn">
                    <button
                        type="button"
                        className="btn btn-sm dropdown-toggle"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                    >
                        <MenuIcon />
                    </button>

                    <div className="dropdown-menu">
                        <Link
                            className="dropdown-item"
                            to={`orders/${order.id}`}
                        >
                            Details
                        </Link>
                        <Link
                            className="dropdown-item"
                            to={`orders/edit/${order.id}`}
                        >
                            Edit
                        </Link>
                        <Link
                            className="dropdown-item"
                            to="#"
                            onClick={() => handleRemove(order.id)}
                        >
                            Delete
                        </Link>
                    </div>
                </div>
            </td>
        </tr>
    );
};

OrderRow.displayName = displayName;
OrderRow.propTypes = propTypes;

export default React.memo(OrderRow);
