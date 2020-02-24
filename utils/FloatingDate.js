import React from "react";
import PropTypes from "prop-types";

const displayName = "FloatingDateFormField";
const propTypes = {
    errors: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired
};

const FloatingDate = ({
    name,
    label,
    value,
    errors,
    onChange,
    required = false
}) => {
    var dateref;
    const changeDateType = e => {
        dateref.type = "date";
    };

    return (
        <>
            <label htmlFor={name} className="sr-only">
                {label}
            </label>
            <input
                type="text"
                className={`floating-input rounded-0 ${errors.has({ name }) &&
                    "is-invalid"}`}
                name={name}
                id={name}
                placeholder=" "
                value={value || ""}
                ref={element => (dateref = element)}
                onClick={e => changeDateType(e)}
                onChange={e => onChange(e.target.name, e.target.value)}
                required={required}
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

FloatingDate.displayName = displayName;
FloatingDate.propTypes = propTypes;

export default FloatingDate;
