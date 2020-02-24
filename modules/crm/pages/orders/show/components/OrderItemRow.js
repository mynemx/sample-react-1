import React, { useState } from "react";
import PropTypes from "prop-types";

const displayName = "OrderItemRow";
const propTypes = {
    index: PropTypes.number.isRequired,
    item: PropTypes.object.isRequired
};

const OrderItemRow = ({ index, item }) => {
    return (
        <tr key={index}>
            <td scope="row">{index + 1}</td>
            <td>{item.name}</td>
            <td>{item.description}</td>
            <td>{item.quantity}</td>
            <td>{item.uprice.toLocaleString()}</td>
            <td>{item.price.toLocaleString()}</td>
        </tr>
    );
};

OrderItemRow.displayName = displayName;
OrderItemRow.propTypes = propTypes;

export default React.memo(OrderItemRow);
