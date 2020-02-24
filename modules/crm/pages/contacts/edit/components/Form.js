import React, { useCallback } from "react";
import PropTypes from "prop-types";
import FloatingAutoComplete from "../../../../../../utils/FloatingAutoComplete";
import FloatingDropdown from "../../../../../../utils/FloatingDropdown";
import FloatingText from "../../../../../../utils/FloatingText";
import FloatingTextArea from "../../../../../../utils/FloatingTextArea";
import FloatingRadio from "../../../../../../utils/FloatingRadio";
import FloatingDate from "../../../../../../utils/FloatingDate";

const displayName = "ContactFrom";
const propTypes = {
    contact: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
};

const Form = ({
    contact,
    contactTypes,
    contactCategories,
    salutations,
    users,
    sources,
    countries,
    errors,
    onChange,
    onSubmit
}) => {
    const handleChange = useCallback(
        (name, value) => {
            if (value !== contact[name]) {
                onChange(name, value);
            }
        },
        [onChange, contact]
    );

    return (
        <form onSubmit={e => onSubmit(e)} className="mt-3">
            <div className="form-row">
                <div className="form-group floating-label col">
                    <FloatingDropdown
                        label="Salutation"
                        name="salutationId"
                        value={contact.salutationId}
                        list={salutations}
                        field="id"
                        displayField="name"
                        errors={errors}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group floating-label col">
                    <FloatingText
                        label="Contact Name"
                        name="name"
                        value={contact.name}
                        errors={errors}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className="form-row">
                <div className="form-group floating-label col">
                    <FloatingDropdown
                        label="Contact Type"
                        name="contactTypeId"
                        value={contact.contactTypeId}
                        list={contactTypes}
                        field="id"
                        displayField="name"
                        errors={errors}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group floating-label col">
                    <FloatingDropdown
                        label="Contact Category"
                        name="contactCategoryId"
                        value={contact.contactCategoryId}
                        list={contactCategories}
                        field="id"
                        displayField="name"
                        errors={errors}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className="form-row">
                <div className="form-group floating-label col">
                    <FloatingText
                        label="Email"
                        name="email"
                        value={contact.email}
                        errors={errors}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group floating-label col">
                    <FloatingText
                        label="Phone"
                        name="phone"
                        value={contact.phone}
                        errors={errors}
                        onChange={handleChange}
                    />
                </div>
            </div>

            <div className="form-row">
                <div className="form-group floating-label col">
                    <FloatingAutoComplete
                        label="Company Name"
                        name="companyId"
                        value={contact.companyId || ""}
                        errors={errors}
                        url="crm/companies/search"
                        dataset="companies"
                        nameField="id"
                        displayField="name"
                        selectedValue={contact.companyName || ""}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group floating-label col">
                    <FloatingText
                        label="Position"
                        name="position"
                        value={contact.position}
                        errors={errors}
                        onChange={handleChange}
                    />
                </div>
            </div>

            <div className="form-row">
                <div className="form-group floating-label col">
                    <FloatingText
                        label="Location"
                        name="location"
                        value={contact.location}
                        errors={errors}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group floating-label col">
                    <FloatingText
                        label="Address"
                        name="address"
                        value={contact.address}
                        errors={errors}
                        onChange={handleChange}
                    />
                </div>
            </div>

            <div className="form-row">
                <div className="form-group floating-label col">
                    <FloatingDropdown
                        label="Sales Rep"
                        name="salesRepId"
                        value={contact.salesRepId}
                        list={users}
                        field="id"
                        displayField="name"
                        errors={errors}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group floating-label col">
                    <FloatingText
                        label="City"
                        name="city"
                        value={contact.city}
                        errors={errors}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className="form-row">
                <div className="form-group floating-label col">
                    <FloatingDate
                        label="Date of birth"
                        name="dateOfBirth"
                        value={contact.dateOfBirth}
                        errors={errors}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group floating-label col">
                    <FloatingText
                        label="State"
                        name="state"
                        value={contact.state}
                        errors={errors}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className="form-row">
                <div className="form-group floating-label col">
                    <FloatingRadio
                        label="Gender"
                        name="gender"
                        value={contact.gender}
                        displayField="name"
                        field="name"
                        options={[{ name: "Male" }, { name: "Female" }]}
                        errors={errors}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group floating-label col">
                    <FloatingDropdown
                        label="Country"
                        name="country"
                        value={contact.country}
                        list={countries}
                        field="name"
                        displayField="name"
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
                        value={contact.source}
                        list={sources}
                        field="name"
                        displayField="name"
                        errors={errors}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group floating-label col">
                    <FloatingText
                        label="Delivery Address"
                        name="deliveryAddress"
                        value={contact.deliveryAddress}
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
                        value={contact.website}
                        errors={errors}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group floating-label col">
                    <FloatingText
                        label="Postal"
                        name="postal"
                        value={contact.postal}
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
                        value={contact.note}
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
                        UPDATE
                    </button>
                </div>
            </div>
        </form>
    );
};

Form.displayName = displayName;
Form.propTypes = propTypes;

export default React.memo(Form);
