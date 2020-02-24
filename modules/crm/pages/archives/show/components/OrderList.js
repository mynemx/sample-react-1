import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";

const displayName = "OrderList";
const propTypes = {
    company: PropTypes.object.isRequired
};

const OrderList = ({ company, orders, dispatch }) => {
    function handleRemove(id) {}
    function renderOrders() {
        return orders.map((order, index) => {
            return (
                <tr key={index}>
                    <td scope="row">{index + 1}</td>
                    <td>
                        <Link className="" to={`/app/crm/orders/${order.id}`}>
                            {order.salutationName + " " + order.name}
                        </Link>
                    </td>
                    <td>{order.contactTypeName}</td>
                    <td>{order.contactCategoryName}</td>
                    <td>{order.phone}</td>
                    <td>{order.email}</td>
                    <td>{order.gender}</td>
                    <td>{order.position}</td>
                    <td>{order.location}</td>
                    <td>{order.salesRepName}</td>
                    <td>{order.source}</td>
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
                                    to={`/app/crm/orders/${order.id}`}
                                >
                                    Details
                                </Link>
                                <Link
                                    className="dropdown-item"
                                    to={`app/crm/orders/edit/${order.id}`}
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
        });
    }

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
                                <th>Name</th>
                                <th>Type</th>
                                <th>Category</th>
                                <th>Phone</th>
                                <th>Email</th>
                                <th>Gender</th>
                                <th>Position</th>
                                <th>Location</th>
                                <th>Sales Rep</th>
                                <th>Source</th>
                                <th>Actions</th>
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

export default OrderList;
