import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import FloatingText from "../../../../../../utils/FloatingText";
import FloatingDropdown from "../../../../../../utils/FloatingDropdown";
import FloatingDate from "../../../../../../utils/FloatingDate";
import FloatingTextArea from "../../../../../../utils/FloatingTextArea";
import FloatingAutoComplete from "../../../../../../utils/FloatingAutoComplete";
import { showNotification } from "../../../../../../utils/Notification";
import OrderItemRow from "./OrderItemRow";

const displayName = "OrderFrom";
const propTypes = {
    order: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
};

const Form = ({ order, orderStatuses, users, sourceList, errors, onChange, onSubmit }) => {
    const [items, setItems] = useState(order.items);
    const [totalPrice, setPrice] = useState(order.totalPrice);

    useEffect(() => {
        setItems(order.items);
        getTotalPrice(order.items);
    });

    function handleChange(name, value) {
        if (value !== order[name]) {
            onChange(name, value);
        }
    }

    function removeItem(id) {
        const newItems = items.filter(obj => obj.id !== id);

        setItems(newItems);
        onChange("items", newItems);
    }

    function addItem(item) {
        const obj = items.find(obj => obj.id === item.id);
        if (!obj) {
            let newItem = Object.assign(
                {},
                {
                    ...item,
                    quantity: 1,
                    uprice: parseFloat(item.price),
                    price: parseFloat(item.price),
                    productId: item.id
                }
            );
            setItems([...items, newItem]);
            onChange("items", [...items, newItem]);
            getTotalPrice([...items, newItem]);
        } else {
            showNotification("Item is already on the list", "error");
        }
    }

    function updateItem(item) {
        const newItems = items.map(obj => {
            if (obj.id === item.id) {
                return { ...obj, ...item };
            }
            return obj;
        });
        setItems(newItems);
        onChange("items", newItems);
        getTotalPrice(newItems);
    }

    function getTotalPrice(newItems) {
        const price = newItems.reduce((prev, item) => {
            return prev + parseFloat(item.price);
        }, 0);
        setPrice(price);
    }

    function renderItems(items) {
        return items.map((item, index) => {
            return (
                <OrderItemRow
                    key={index}
                    index={index}
                    item={item}
                    handleUpdate={updateItem}
                    handleRemove={removeItem}
                />
            );
        });
    }

    return (
        <form onSubmit={e => onSubmit(e)} autoComplete="off">
            <fieldset>
                <legend>Order Details</legend>
                <div className="form-row">
                    <div className="form-group floating-label col">
                        <FloatingDropdown
                            label="Client Category"
                            name="category"
                            value={order.category}
                            list={[{ name: "Company" }, { name: "Contact" }]}
                            errors={errors}
                            field="name"
                            displayField="name"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group floating-label col">
                        {order.category == "Company" ? (
                            <FloatingAutoComplete
                                label="Company Name"
                                name="companyId"
                                value={order.companyId || ""}
                                errors={errors}
                                url="crm/companies/search"
                                dataset="companies"
                                nameField="id"
                                displayField="name"
                                selectedValue={order.clientName || ""}
                                onChange={handleChange}
                                onChangeItem={item => {
                                    setTimeout(() => {
                                        handleChange("companyId", item.id);
                                        handleChange("contactId", "");
                                        handleChange("clientName", item.name);
                                        handleChange(
                                            "contactNumber",
                                            item.phone
                                        );
                                        handleChange(
                                            "deliveryAddress",
                                            item.location
                                        );
                                    }, 300);
                                }}
                            />
                        ) : (
                            ""
                        )}

                        {order.category == "Contact" ? (
                            <FloatingAutoComplete
                                label="Contact Name"
                                name="contactId"
                                value={order.contactId || ""}
                                errors={errors}
                                url="crm/contacts/search"
                                dataset="contacts"
                                nameField="id"
                                displayField="name"
                                selectedValue={order.clientName || ""}
                                onChange={handleChange}
                                onChangeItem={item => {
                                    setTimeout(() => {
                                        handleChange("contactId", item.id);
                                        handleChange("companyId", "");
                                        handleChange("clientName", item.name);
                                        handleChange(
                                            "contactNumber",
                                            item.phone
                                        );
                                        handleChange(
                                            "deliveryAddress",
                                            item.location
                                        );
                                    }, 300);
                                }}
                            />
                        ) : (
                            ""
                        )}
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group floating-label col">
                        <FloatingText
                            label="Client Name"
                            name="clientName"
                            value={order.clientName}
                            errors={errors}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group floating-label col">
                        <FloatingText
                            label="Contact Number"
                            name="contactNumber"
                            value={order.contactNumber || ""}
                            errors={errors}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group floating-label col">
                        <FloatingDropdown
                            label="Order Status"
                            name="orderStatusId"
                            value={order.orderStatusId}
                            list={orderStatuses}
                            errors={errors}
                            field="id"
                            displayField="name"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group floating-label col">
                        <FloatingDate
                            label="Order Date"
                            name="orderedDate"
                            value={order.orderedDate || ""}
                            errors={errors}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group floating-label col">
                        <FloatingDropdown
                            label="Sales Rep"
                            name="salesRepId"
                            value={order.salesRepId}
                            list={users}
                            errors={errors}
                            field="id"
                            displayField="name"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group floating-label col">
                        <FloatingText
                            label="Delivery Address"
                            name="deliveryAddress"
                            value={order.deliveryAddress || ""}
                            errors={errors}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group floating-label col">
                        <FloatingDropdown
                            label="Source"
                            name="source"
                            value={order.source}
                            list={sourceList}
                            errors={errors}
                            field="name"
                            displayField="name"
                            onChange={handleChange}
                        />
                    </div>
                </div>
            </fieldset>

            <fieldset>
                <legend>Ordered Products </legend>

                <div className="form-row">
                    <div className="form-group floating-label col">
                        <FloatingAutoComplete
                            label="Search Product"
                            name="product"
                            value={order.product || ""}
                            errors={errors}
                            url="administration/products/search"
                            dataset="products"
                            nameField="id"
                            displayField="name"
                            selectedValue={order.product || ""}
                            onChange={handleChange}
                            onChangeItem={item => {
                                setTimeout(() => {
                                    addItem(item);
                                    handleChange("product", "...");
                                }, 300);
                            }}
                        />
                    </div>
                </div>

                <div className="form-row">
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
                            <tbody>{renderItems(items)}</tbody>
                            <tfoot>
                                <tr>
                                    <td colSpan="4"></td>
                                    <td>Sub Total</td>
                                    <td className="text-right h6">
                                        {totalPrice.toLocaleString()}
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            </fieldset>

            <div className="form-group row">
                <div className="form-submit-elements">
                    <button
                        disabled={errors.any()}
                        type="submit"
                        className="btn btn-success"
                    >
                        UPDATE
                    </button>
                </div>
            </div>
        </form>
    );
};

Form.displayName = displayName;
Form.propTypes = propTypes;

export default React.memo(Form);
