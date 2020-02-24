import React from "react";
import PropTypes from "prop-types";

const displayName = "SearchDateFormField";
const propTypes = {
    onChange: PropTypes.func.isRequired
};

const SearchDate = ({ name, label, value, onChange }) => {
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
                className={`floating-input rounded-0`}
                name={name}
                id={name}
                value={value || ""}
                ref={element => (dateref = element)}
                onClick={e => changeDateType(e)}
                onChange={e => onChange(e.target.name, e.target.value)}
            />
            <label className="label">{label}</label>
        </>
    );
};

SearchDate.displayName = displayName;
SearchDate.propTypes = propTypes;

export default SearchDate;
