import React, { useCallback } from "react";
import PropTypes from "prop-types";
import FloatingAutoComplete from "../../../../../../utils/FloatingAutoComplete";
import FloatingDropdown from "../../../../../../utils/FloatingDropdown";
import FloatingText from "../../../../../../utils/FloatingText";
import FloatingTextArea from "../../../../../../utils/FloatingTextArea";

import SearchText from "../../../../../../utils/SearchText";
import SearchCheckbox from "../../../../../../utils/SearchCheckbox";
import { campaignRecipientsRequest } from "../../service";

const displayName = "ContactFrom";
const propTypes = {
    campaign: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
};

const Form = ({ campaign, sipExtensions, callGateways, errors, onChange, onSubmit }) => {
    const handleChange = useCallback((name, value) => {
        if (value !== campaign[name]) {
            onChange(name, value);
        }
    });

    return (
        <form onSubmit={e => onSubmit(e)} className="mt-3">
            <div className="form-row">
                <div className="form-group floating-label col">
                    <FloatingDropdown
                        label="Agent"
                        name="agent"
                        list={sipExtensions}
                        displayField="callerid"
                        field="regexten"
                        value={campaign.agent}
                        errors={errors}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className="form-row">
                <div className="form-group floating-label col">
                    <FloatingDropdown
                        label="Gateway"
                        name="gatewayId"
                        list={callGateways}
                        field="id"
                        displayField="label"
                        value={campaign.gatewayId}
                        errors={errors}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className="form-row">
                <div className="form-group floating-label col">
                    <FloatingTextArea
                        label="Call Script"
                        name="callScript"
                        value={campaign.callScript}
                        errors={errors}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className="form-group row">
                <div className="submit-form-elements p-3">
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
