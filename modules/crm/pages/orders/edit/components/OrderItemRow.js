import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";
import ReeValidate from "ree-validate";
import FloatingText from "../../../../../../utils/FloatingText";
import FloatingTextArea from "../../../../../../utils/FloatingTextArea";

const displayName = "OrderItemRow";
const propTypes = {
    index: PropTypes.number.isRequired,
    item: PropTypes.object.isRequired,

    handleUpdate: PropTypes.func.isRequired,
    handleRemove: PropTypes.func.isRequired
};

const OrderItemRow = ({ index, item, handleUpdate, handleRemove }) => {
    const validator = new ReeValidate({
        quantity: "required|numeric",
        uprice: "required|numeric",
        description: "required"
    });
    const [state, setStates] = useState({
        item: item,
        errors: validator.errors
    });

    function handleChange(name, value) {
        const { errors } = validator;
        let price = state.item.price;
        if (name == "uprice") {
            value = parseFloat(value) || 0;
            price = parseFloat(state.item.quantity * value);
        } else if (name == "quantity") {
            value = parseInt(value) || 0;
            price = parseFloat(state.item.uprice * value);
        }
        let newItem = Object.assign(
            {},
            { ...state.item, [name]: value, price }
        );

        let newState = Object.assign({}, { ...state, item: newItem });
        errors.remove(name);

        validator.validate(name, value).then(() => {
            newState = Object.assign({}, { ...newState, errors: errors });
        });
        setStates(newState);
        handleUpdate(newItem);
    }

    return (
        <tr key={index}>
            <td scope="row">{index + 1}</td>
            <td>{state.item.name}</td>
            <td>{state.item.description}</td>
            <td>
                <FloatingText
                    label=""
                    name="quantity"
                    value={state.item.quantity}
                    errors={state.errors}
                    onChange={handleChange}
                />
            </td>
            <td>
                <FloatingText
                    label=""
                    name="uprice"
                    value={state.item.uprice}
                    errors={state.errors}
                    onChange={handleChange}
                />
            </td>
            <td>{state.item.price.toLocaleString()}</td>
            <td>
                <Link className="" to="#" onClick={() => handleRemove(item.id)}>
                    Delete
                </Link>
            </td>
        </tr>
    );
};

OrderItemRow.displayName = displayName;
OrderItemRow.propTypes = propTypes;

export default OrderItemRow;
