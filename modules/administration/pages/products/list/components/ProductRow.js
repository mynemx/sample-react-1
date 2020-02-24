import React from "react";
import PropTypes from "prop-types";
import MenuIcon from "@material-ui/icons/Menu";
import { Link } from "react-router-dom";

const displayName = "ProductRow";
const propTypes = {
    index: PropTypes.number.isRequired,
    product: PropTypes.object.isRequired,
    handleRemove: PropTypes.func.isRequired
};

const ProductRow = ({ index, product, handleRemove }) => {
    return (
        <tr key={index}>
            <td scope="row">{index + 1}</td>
            <td>{product.name}</td>
            <td>{product.productCategoryName}</td>
            <td>{product.description}</td>
            <td>{product.currencyCode + " " + product.price}</td>
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
                            to={`products/edit/${product.id}`}
                        >
                            Edit
                        </Link>
                        <Link
                            className="dropdown-item"
                            to="#"
                            onClick={() => handleRemove(product.id)}
                        >
                            Delete
                        </Link>
                    </div>
                </div>
            </td>
        </tr>
    );
};

ProductRow.displayName = displayName;
ProductRow.propTypes = propTypes;

export default ProductRow;
