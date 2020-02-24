import React from "react";
import PropTypes from "prop-types";

const displayName = "SearchTextFormField";
const propTypes = {
    onChange: PropTypes.func.isRequired
};

const SearchText = ({ name, label, value, onChange }) => {
    return (
        <>
            <label htmlFor={name} className="sr-only">
                {label}
            </label>
            <input
                type="text"
                className={`floating-input rounded-0 `}
                name={name}
                id={name}
                value={value || ""}
                onChange={e => onChange(e.target.name, e.target.value)}
            />
            <label className="label">{label}</label>
        </>
    );
};

SearchText.displayName = displayName;
SearchText.propTypes = propTypes;

export default SearchText;
