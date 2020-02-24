import React from "react";
import PropTypes from "prop-types";

const displayName = "FloatingTimeFormField";
const propTypes = {
    errors: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired
};

const FloatingTime = ({
    name,
    label,
    value,
    errors,
    onChange,
    required = false
}) => {
    var dateref;
    const changeTimeType = e => {
        dateref.type = "time";
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
                onClick={e => changeTimeType(e)}
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

FloatingTime.displayName = displayName;
FloatingTime.propTypes = propTypes;

export default FloatingTime;
