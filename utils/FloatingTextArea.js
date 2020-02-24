import React from "react";
import PropTypes from "prop-types";

const displayName = "LeadFrom";
const propTypes = {
    errors: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired
};

const FloatingTextArea = ({
    name,
    label,
    value,
    errors,
    onChange,
    required = false
}) => {
    return (
        <>
            <label htmlFor={name} className="sr-only">
                {label}
            </label>
            <textarea
                className={`floating-input ${errors.has({ name }) &&
                    "is-invalid"}`}
                name={name}
                id={name}
                rows="7"
                placeholder=" "
                defaultValue={value || ""}
                onChange={e => onChange(e.target.name, e.target.value)}
                required={required}
            ></textarea>
            <label className="label">{label}</label>
            {errors.has(`${name}`) && (
                <div className="invalid-feedback">
                    {errors.first(`${name}`)}
                </div>
            )}
        </>
    );
};

FloatingTextArea.displayName = displayName;
FloatingTextArea.propTypes = propTypes;

export default FloatingTextArea;
