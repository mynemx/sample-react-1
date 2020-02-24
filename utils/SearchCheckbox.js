import React from "react";
import PropTypes from "prop-types";

const displayName = "SearchCheckboxFormField";
const propTypes = {
    onChange: PropTypes.func.isRequired
};

const SearchCheckbox = ({
    name,
    label,
    value = [],
    options,
    field,
    displayField,
    onChange
}) => {
    return (
        <>
            {options.map((option, index) => {
                const item = value.find(item => item == option[field]);
                return (
                    <div
                        key={index}
                        className="custom-control custom-checkbox custom-control-inline"
                    >
                        <input
                            type="checkbox"
                            id={`${name}${option[field]}`}
                            name={name}
                            value={option[field]}
                            defaultChecked={item !== undefined ? true : false}
                            onClick={e =>
                                onChange(
                                    e.target.name,
                                    e.target.value,
                                    e.target.checked
                                )
                            }
                            className="custom-control-input"
                        />
                        <label
                            className="custom-control-label"
                            htmlFor={`${name}${option[field]}`}
                        >
                            {option[displayField]}
                        </label>
                    </div>
                );
            })}
            <label className="label-check">{label}</label>
        </>
    );
};

SearchCheckbox.displayName = displayName;
SearchCheckbox.propTypes = propTypes;

export default SearchCheckbox;
