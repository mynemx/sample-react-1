import React from "react";
import PropTypes from "prop-types";

const displayName = "SearchRadioFormField";
const propTypes = {
    onChange: PropTypes.func.isRequired
};

const SearchRadio = ({
    name,
    label,
    value,
    options,
    field,
    displayField,
    onChange
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
        </>
    );
};

SearchRadio.displayName = displayName;
SearchRadio.propTypes = propTypes;

export default SearchRadio;
