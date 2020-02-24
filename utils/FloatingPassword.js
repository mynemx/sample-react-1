import React from "react";
import PropTypes from "prop-types";

const displayName = "FloatingFormPasswordField";
const propTypes = {
    errors: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired
};

const FloatingPassword = ({
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
            <input
                type="password"
                className={`floating-input rounded-0 ${errors.has({
                    name
                }) && "is-invalid"}`}
                name={name}
                id={name}
                placeholder=" "
                value={value || ""}
                required={required}
                onChange={e => onChange(e.target.name, e.target.value)}
            />
            <label className="label">{label}</label>
            {errors.has(`${name}`) && (
                <div className="invalid-feedback">
                    {errors.first(`${name}`)}
                </div>
            )}
        </>
    );
};

FloatingPassword.displayName = displayName;
FloatingPassword.propTypes = propTypes;

export default FloatingPassword;
