import React, { useState, useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import FloatingDropdown from "../../../../../../utils/FloatingDropdown";
import FloatingText from "../../../../../../utils/FloatingText";
import FloatingTextArea from "../../../../../../utils/FloatingTextArea";

const displayName = "ContactFrom";
const propTypes = {
    campaignList: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
};

const Form = ({ campaignList, users, errors, onChange, onSubmit }) => {
    const handleChange = useCallback(
        (name, value) => {
            if (value !== campaignList[name]) {
                onChange(name, value);
            }
        },
        [onChange, campaignList]
    );

    const listCategories = useMemo(() => [
        { name: "Company" },
        { name: "Contact" },
        { name: "Lead" }
    ]);
    const listTypes = useMemo(() => [{ name: "Call" }, { name: "Email" }]);

    const renderForm = useCallback(() => {
        return (
            <>
                <div className="form-row">
                    <div className="form-group floating-label col">
                        <FloatingText
                            label="Name"
                            name="name"
                            value={campaignList.name}
                            errors={errors}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group floating-label col">
                        <FloatingDropdown
                            label="Type"
                            name="listType"
                            value={campaignList.listType}
                            list={listTypes}
                            errors={errors}
                            field="name"
                            displayField="name"
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group floating-label col">
                        <FloatingDropdown
                            label="Filter Category"
                            name="category"
                            value={campaignList.category}
                            list={listCategories}
                            errors={errors}
                            field="name"
                            displayField="name"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group floating-label col">
                        <FloatingDropdown
                            label="User"
                            name="userId"
                            value={campaignList.userId}
                            list={users}
                            errors={errors}
                            field="id"
                            displayField="name"
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group floating-label col">
                        <FloatingTextArea
                            label="Description"
                            name="description"
                            value={campaignList.description}
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
                            SUBMIT
                        </button>
                    </div>
                </div>
            </>
        );
    });

    return (
        <form onSubmit={e => onSubmit(e)} className="mt-3">
            {renderForm()}
        </form>
    );
};

Form.displayName = displayName;
Form.propTypes = propTypes;

export default React.memo(Form);
