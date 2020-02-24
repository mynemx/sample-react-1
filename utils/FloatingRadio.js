import React from "react";
import PropTypes from "prop-types";

const displayName = "FloatingRadioFormField";
const propTypes = {
    errors: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired
};

const FloatingRadio = ({
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
                return (
                    <div
                        key={index}
                        className="custom-control custom-radio custom-control-inline"
                    >
                        <input
                            type="radio"
                            id={`${name}${option[field]}`}
                            name={name}
                            required={required}
                            value={option[field]}
                            defaultChecked={value == option ? true : false}
                            onClick={e =>
                                onChange(e.target.name, e.target.value)
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
            <label className="label-radio">{label}</label>
            {errors.has(`${name}`) && (
                <div className="invalid-feedback">
                    {errors.first(`${name}`)}
                </div>
            )}
        </>
    );
};

FloatingRadio.displayName = displayName;
FloatingRadio.propTypes = propTypes;

export default FloatingRadio;
