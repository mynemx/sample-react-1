import React, { useCallback } from "react";
import PropTypes from "prop-types";
import FloatingText from "../../../../../../utils/FloatingText";
import FloatingDropdown from "../../../../../../utils/FloatingDropdown";
import FloatingTextArea from "../../../../../../utils/FloatingTextArea";

const displayName = "ProductFrom";
const propTypes = {
    product: PropTypes.object.isRequired,
    productCategories: PropTypes.array.isRequired,
    currencies: PropTypes.array.isRequired,
    errors: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
};

const Form = ({
    product,
    productCategories,
    currencies,
    errors,
    onChange,
    onSubmit
}) => {
    const handleChange = useCallback(
        (name, value) => {
            if (value !== product[name]) {
                onChange(name, value);
            }
        },
        [onChange, product]
    );

    return (
        <form onSubmit={e => onSubmit(e)} className="mt-3">
            <div className="form-row">
                <div className="form-group floating-label col">
                    <FloatingText
                        label="Name"
                        name="name"
                        value={product.name}
                        errors={errors}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group floating-label col">
                    <FloatingDropdown
                        label="Product Category"
                        name="productCategoryId"
                        value={product.productCategoryId || ""}
                        list={productCategories}
                        displayField="name"
                        field="id"
                        errors={errors}
                        onChange={handleChange}
                    />
                </div>
            </div>

            <div className="form-row">
                <div className="form-group floating-label col">
                    <FloatingDropdown
                        label="Currency"
                        name="currencyId"
                        value={product.currencyId || ""}
                        list={currencies}
                        displayField="name"
                        field="id"
                        errors={errors}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group floating-label col">
                    <FloatingText
                        label="Price"
                        name="price"
                        value={product.price || ""}
                        errors={errors}
                        onChange={handleChange}
                    />
                </div>
            </div>

            <div className="form-row">
                <div className="form-group floating-label col">
                    <FloatingTextArea
                        label="Description"
                        name="description"
                        value={product.description || ""}
                        errors={errors}
                        onChange={handleChange}
                    />
                </div>
            </div>

            <div className="form-group row">
                <div className="form-submit-elements">
                    <button
                        disabled={errors.any()}
                        type="submit"
                        className="btn btn-success"
                    >
                        {product.id ? "UPDATE" : "SAVE"}
                    </button>
                </div>
            </div>
        </form>
    );
};

Form.displayName = displayName;
Form.propTypes = propTypes;

export default Form;
