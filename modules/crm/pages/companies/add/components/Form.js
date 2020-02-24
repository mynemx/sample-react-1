import React, { useCallback } from "react";
import PropTypes from "prop-types";
import FloatingText from "../../../../../../utils/FloatingText";
import FloatingDropdown from "../../../../../../utils/FloatingDropdown";
import FloatingTextArea from "../../../../../../utils/FloatingTextArea";

const displayName = "UserFrom";
const propTypes = {
    company: PropTypes.object.isRequired,
    currencies: PropTypes.array.isRequired,
    errors: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
};

const Form = ({
    company,
    companyTypes,
    companyCategories,
    users,
    sources,
    countries,
    employeeSizes,
    currencies,
    industries,
    errors,
    onChange,
    onSubmit
}) => {
    const handleChange = useCallback(
        (name, value) => {
            if (value !== company[name]) {
                onChange(name, value);
            }
        },
        [onChange, company]
    );

    return (
        <form onSubmit={e => onSubmit(e)} className="mt-3">
            <div className="form-row">
                <div className="form-group floating-label col">
                    <FloatingText
                        label="Company name"
                        name="name"
                        value={company.name}
                        errors={errors}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group floating-label col">
                    <FloatingText
                        label="Primary Email"
                        name="email"
                        value={company.email}
                        errors={errors}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className="form-row">
                <div className="form-group floating-label col">
                    <FloatingDropdown
                        label="Company Type"
                        name="companyTypeId"
                        value={company.companyTypeId}
                        list={companyTypes}
                        field="id"
                        errors={errors}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group floating-label col">
                    <FloatingText
                        label="Primary Phone"
                        name="phone"
                        value={company.phone}
                        errors={errors}
                        onChange={handleChange}
                    />
                </div>
            </div>

            <div className="form-row">
                <div className="form-group floating-label col">
                    <FloatingDropdown
                        label="Company Category"
                        name="companyCategoryId"
                        value={company.companyCategoryId}
                        list={companyCategories}
                        field="id"
                        errors={errors}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group floating-label col">
                    <FloatingText
                        label="Location"
                        name="location"
                        value={company.location}
                        errors={errors}
                        onChange={handleChange}
                    />
                </div>
            </div>

            <div className="form-row">
                <div className="form-group floating-label col">
                    <FloatingDropdown
                        label="Industry"
                        name="industryId"
                        value={company.industryId}
                        list={industries}
                        field="id"
                        errors={errors}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group floating-label col">
                    <FloatingText
                        label="Address"
                        name="address"
                        value={company.address}
                        errors={errors}
                        onChange={handleChange}
                    />{" "}
                </div>
            </div>

            <div className="form-row">
                <div className="form-group floating-label col">
                    <FloatingDropdown
                        label="Sales Rep"
                        name="salesRepId"
                        value={company.salesRepId}
                        list={users}
                        field="id"
                        errors={errors}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group floating-label col">
                    <FloatingText
                        label="City"
                        name="city"
                        value={company.city}
                        errors={errors}
                        onChange={handleChange}
                    />{" "}
                </div>
            </div>
            <div className="form-row">
                <div className="form-group floating-label col">
                    <FloatingDropdown
                        label="Currency"
                        name="currencyId"
                        value={company.currencyId}
                        list={currencies}
                        errors={errors}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group floating-label col">
                    <FloatingText
                        label="State"
                        name="state"
                        value={company.state}
                        errors={errors}
                        onChange={handleChange}
                    />{" "}
                </div>
            </div>
            <div className="form-row">
                <div className="form-group floating-label col">
                    <FloatingDropdown
                        label="Company Size"
                        name="companySize"
                        value={company.companySize}
                        list={employeeSizes}
                        field="name"
                        errors={errors}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group floating-label col">
                    <FloatingDropdown
                        label="Country"
                        name="country"
                        value={company.country}
                        list={countries}
                        field="name"
                        errors={errors}
                        onChange={handleChange}
                    />
                </div>
            </div>

            <div className="form-row">
                <div className="form-group floating-label col">
                    <FloatingDropdown
                        label="Source"
                        name="source"
                        value={company.source}
                        list={sources}
                        field="name"
                        errors={errors}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group floating-label col">
                    <FloatingText
                        label="Delivery Address"
                        name="deliveryAddress"
                        value={company.deliveryAddress}
                        errors={errors}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className="form-row">
                <div className="form-group floating-label col">
                    <FloatingText
                        label="Website"
                        name="website"
                        value={company.website}
                        errors={errors}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group floating-label col">
                    <FloatingText
                        label="Postal"
                        name="postal"
                        value={company.postal}
                        errors={errors}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className="form-row">
                <div className="form-group floating-label col">
                    <FloatingTextArea
                        label="Note"
                        name="note"
                        value={company.note}
                        errors={errors}
                        onChange={handleChange}
                    />
                </div>
            </div>

            <div className="form-group row">
                <div className="form-submit-elements">
                    <button
                        disabled={errors.any()}
                        type="submit"
                        className="btn btn-success"
                    >
                        SAVE
                    </button>
                </div>
            </div>
        </form>
    );
};

Form.displayName = displayName;
Form.propTypes = propTypes;

export default React.memo(Form);
