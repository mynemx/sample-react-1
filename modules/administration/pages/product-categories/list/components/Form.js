import React, { useCallback } from "react";
import PropTypes from "prop-types";

const displayName = "CategoryFrom";
const propTypes = {
    editMode: PropTypes.bool.isRequired,
    category: PropTypes.object.isRequired,
    productCategories: PropTypes.array.isRequired,
    errors: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    onClearMode: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
};

const Form = ({
    editMode,
    category,
    productCategories,
    errors,
    onChange,
    onClearMode,
    onSubmit
}) => {
    const handleChange = useCallback(
        (name, value) => {
            if (value !== category[name]) {
                onChange(name, value);
            }
        },
        [onChange, category]
    );

    return (
        <form onSubmit={e => onSubmit(e)} className="">
            <label className="mt-1 mb-3 pl-3 py-1 pr-5 bg-primary">
                {editMode
                    ? "Edit Product Category"
                    : "Add New Product Category"}
            </label>
            <div className="form-row">
                <div className="form-group floating-label col">
                    <label htmlFor="name" className="sr-only">
                        Product Category Name
                    </label>
                    <input
                        type="text"
                        className={`floating-input rounded-0 ${errors.has(
                            "name"
                        ) && "is-invalid"}`}
                        name="name"
                        id="name"
                        placeholder=" "
                        value={category.name || ""}
                        onChange={e =>
                            handleChange(e.target.name, e.target.value)
                        }
                        required
                        autoFocus
                    />
                    <label className="label">Name</label>
                    {errors.has("name") && (
                        <div className="invalid-feedback">
                            {errors.first("name")}
                        </div>
                    )}
                </div>

                <div className="form-group floating-label col">
                    <label htmlFor="product_category_id" className="sr-only">
                        Parent Category
                    </label>
                    <select
                        className={`floating-select ${errors.has(
                            "parentCategoryId"
                        ) && "is-invalid"}`}
                        name="parentCategoryId"
                        id="product_category_id"
                        placeholder=" "
                        value={category.parentCategoryId || ""}
                        onChange={e =>
                            handleChange(e.target.name, e.target.value)
                        }
                        autoFocus
                    >
                        <option value="">Root Category</option>
                        {productCategories.map((category, index) => (
                            <option key={index} value={category.id}>
                                {" "}
                                {category.name}{" "}
                            </option>
                        ))}
                    </select>
                    <label className="label">Select Parent Category </label>
                    {errors.has("parentCategoryId") && (
                        <div className="invalid-feedback">
                            {errors.first("parentCategoryId")}
                        </div>
                    )}
                </div>

                <div className="form-group col-2">
                    <div className="p-3 btn-group btn-xs">
                        <button
                            disabled={errors.any()}
                            type="submit"
                            className="btn btn-success btn-sm"
                        >
                            {editMode ? "Update" : "Save"}
                        </button>
                        <button
                            onClick={e => onClearMode(e)}
                            type="button"
                            className="btn btn-primary btn-sm"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
};

Form.displayName = displayName;
Form.propTypes = propTypes;

export default React.memo(Form);
