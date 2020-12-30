import React, { useCallback } from "react";
import PropTypes from "prop-types";

const displayName = "LeadFrom";
const propTypes = {
    lead: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
};

const Form = ({
    lead,
    leadStatuses,
    users,
    sources,
    gender,
    countries,
    industries,
    errors,
    onChange,
    onSubmit
}) => {
    const handleChange = useCallback((name, value) => {
        if (value !== lead[name]) {
            onChange(name, value);
        }
    });

    const renderDropdown = useCallback(
        (label, name, value, list, key = "id") => {
            return (
                <>
                    <label htmlFor={name} className="sr-only">
                        {label}
                    </label>
                    <select
                        className={`floating-select ${errors.has({ name }) &&
                            "is-invalid"}`}
                        name={name}
                        id={name}
                        value={value || ""}
                        onChange={e =>
                            handleChange(e.target.name, e.target.value)
                        }
                    >
                        <option value="">Select {label} </option>
                        {list.map((item, index) => (
                            <option key={index} value={item[key]}>
                                {item.name}{" "}
                            </option>
                        ))}
                    </select>

                    <label className="label">{label}</label>
                    {errors.has(`${name}`) && (
                        <div className="invalid-feedback">
                            {errors.first(`${name}`)}
                        </div>
                    )}
                </>
            );
        }
    );

    const renderTextInput = useCallback((label, name, value) => {
        return (
            <>
                <label htmlFor={name} className="sr-only">
                    {label}
                </label>
                <input
                    type="text"
                    className={`floating-input rounded-0 ${errors.has({
                        name
                    }) && "is-invalid"}`}
                    name={name}
                    id={name}
                    value={value || ""}
                    onChange={e => handleChange(e.target.name, e.target.value)}
                />
                <label className="label">{label}</label>
                {errors.has(`${name}`) && (
                    <div className="invalid-feedback">
                        {errors.first(`${name}`)}
                    </div>
                )}
            </>
        );
    });

    const renderTextarea = useCallback(
        (label, name, value, required = false) => {
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
                        defaultValue={value || ""}
                        onChange={e =>
                            handleChange(e.target.name, e.target.value)
                        }
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
        }
    );

    return (
        <form onSubmit={e => onSubmit(e)} className="mt-3">
            <div className="form-row">
                <div className="form-group floating-label col">
                    {renderTextInput("Lead Name", "name", lead.name)}
                </div>
                <div className="form-group floating-label col">
                    {renderDropdown(
                        "Lead Status",
                        "leadStatusId",
                        lead.leadStatusId,
                        leadStatuses
                    )}
                </div>
            </div>
            <div className="form-row">
                <div className="form-group floating-label col">
                    {renderTextInput("Primary Email", "email", lead.email)}
                </div>
                <div className="form-group floating-label col">
                    {renderTextInput("Primary Phone", "phone", lead.phone)}
                </div>
            </div>

            <div className="form-row">
                <div className="form-group floating-label col">
                    {renderTextInput("Location", "location", lead.location)}
                </div>
                <div className="form-group floating-label col">
                    {renderTextInput("Address", "address", lead.address)}
                </div>
            </div>

            <div className="form-row">
                <div className="form-group floating-label col">
                    {renderDropdown(
                        "Sales Rep",
                        "salesRepId",
                        lead.salesRepId,
                        users
                    )}
                </div>
                <div className="form-group floating-label col">
                    {renderDropdown(
                        "Industry",
                        "industryId",
                        lead.industryId,
                        industries
                    )}
                </div>
            </div>
            <div className="form-row">
                <div className="form-group floating-label col">
                    {renderTextInput("City", "city", lead.city)}
                </div>

                <div className="form-group floating-label col">
                    {renderTextInput("State", "state", lead.state)}
                </div>
            </div>

            <div className="form-row">
                <div className="form-group floating-label col">
                    {renderDropdown(
                        "Source",
                        "source",
                        lead.source,
                        sources,
                        "name"
                    )}
                </div>
                <div className="form-group floating-label col">
                    {renderTextInput(
                        "Delivery Address",
                        "deliveryAddress",
                        lead.deliveryAddress
                    )}
                </div>
            </div>
            <div className="form-row">
                <div className="form-group floating-label col">
                    {renderTextInput("Website", "website", lead.website)}
                </div>

                <div className="form-group floating-label col">
                    {renderDropdown(
                        "Country",
                        "country",
                        lead.country,
                        countries,
                        "name"
                    )}
                </div>
            </div>
            <div className="form-row">
                <div className="form-group floating-label col">
                    {renderDropdown(
                        "Gender",
                        "gender",
                        lead.gender,
                        gender,
                        "name"
                    )}
                </div>
                <div className="form-group floating-label col">
                    {renderTextarea("Note", "note", lead.note)}
                </div>
            </div>

            <div className="form-group row">
                <div className="p-3">
                    <button
                        disabled={errors.any()}
                        type="submit"
                        className="btn btn-success"
                    >
                        UPDATE
                    </button>
                </div>
            </div>
        </form>
    );
};

Form.displayName = displayName;
Form.propTypes = propTypes;

export default Form;
