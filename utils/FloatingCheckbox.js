import React from "react";
import PropTypes from "prop-types";

const displayName = "FloatingCheckboxFormField";
const propTypes = {
    errors: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired
};

const FloatingCheckbox = ({
    name,
    label,
    value,
    options,
    field,
    displayField,
    errors,
    onChange,
    required = false
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
                            required={required}
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
            {errors.has(`${name}`) && (
                <div className="invalid-feedback">
                    {errors.first(`${name}`)}
                </div>
            )}
        </>
    );
};

FloatingCheckbox.displayName = displayName;
FloatingCheckbox.propTypes = propTypes;

export default FloatingCheckbox;
