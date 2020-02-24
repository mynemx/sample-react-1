import React from "react";
import PropTypes from "prop-types";

const displayName = "SearchDropdownFormField";
const propTypes = {
    onChange: PropTypes.func.isRequired
};

const SeachDropdown = ({
    name,
    label,
    value,
    onChange,
    list,
    field = "id",
    displayField = "name"
}) => {
    return (
        <>
            <label htmlFor={name} className="sr-only">
                {label}
            </label>
            <select
                className={`floating-select`}
                name={name}
                id={name}
                value={value || ""}
                onChange={e => onChange(e.target.name, e.target.value)}
            >
                <option value="">Select {label} </option>
                {list.map((item, index) => (
                    <option key={index} value={item[field]}>
                        {item[displayField]}
                    </option>
                ))}
            </select>

            <label className="label">{label}</label>
        </>
    );
};

SeachDropdown.displayName = displayName;
SeachDropdown.propTypes = propTypes;

export default SeachDropdown;
