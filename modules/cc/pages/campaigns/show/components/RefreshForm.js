import React, { useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import FloatingAutoComplete from "../../../../../../utils/FloatingAutoComplete";
import FloatingDropdown from "../../../../../../utils/FloatingDropdown";
import FloatingCheckbox from "../../../../../../utils/FloatingCheckbox";
import FloatingTextArea from "../../../../../../utils/FloatingTextArea";

import SearchText from "../../../../../../utils/SearchText";
import SearchCheckbox from "../../../../../../utils/SearchCheckbox";

const displayName = "RefreshFrom";
const propTypes = {
    campaign: PropTypes.object.isRequired,
    rerun: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
};

const Form = ({ campaign, rerun, dispatch, errors, onChange, onSubmit }) => {
    const handleChange = useCallback((name, value) => {
        if (value !== rerun[name]) {
            onChange(name, value);
        }
    });

    const actions = useMemo(() => [
        { name: "call back", label: "Call Back" },
        { name: "not interested", label: "Not Interested" },
        { name: "in stock", label: "In Stock" },
        { name: "prospect", label: "Prospect" },
        { name: "ordered", label: "Ordered" },
        { name: "wrong number", label: "Wrong Number" },
        { name: "no answer", label: "No Answer" },
        {
            name: "answering machine",
            label: "Answering Machine"
        },
        { name: "switch off", label: "Switch Off" },
        { name: "not available", label: "Not Available" },
        { name: "hang up", label: "Hang up" },
        { name: "failed", label: "Failed" },
        { name: "number busy", label: "Number Busy" },
        { name: "non-committal", label: "Non-committal" },
        {
            name: "language barrier",
            label: "Language Barrier"
        },
        {
            name: "incorrect number",
            label: "Incorrect Number"
        },
        { name: "abject refusal", label: "Abject Refusal" },
        { name: "consented", label: "Consented" }
    ]);

    const callStatuses = useMemo(() => [
        { name: "busy", label: "Busy" },
        { name: "answered", label: "Answered" },
        { name: "no answer", label: "No Answer" },
        { name: "failed", label: "Failed" }
    ]);

    const listTypes = useMemo(() => [
        { name: "all", label: "All" },
        { name: "call_status", label: "Call Status" },
        { name: "selected_few", label: "Selected" },
        { name: "actions", label: "Actions" }
    ]);

    const handleChecked = useCallback((name, value, status) => {
        if (status) {
            const obj = [...rerun[name], value];
            onChange(name, obj);
        } else {
            const obj = rerun[name].filter(item => item !== value);
            onChange(name, obj);
        }
    });

    const renderActions = useCallback(() => {
        return (
            <div className="form-row">
                <div className="form-group floating-label col">
                    <FloatingCheckbox
                        label="Response"
                        name="actions"
                        value={rerun.actions}
                        options={actions}
                        errors={errors}
                        field="name"
                        displayField="label"
                        onChange={handleChecked}
                    />
                </div>
            </div>
        );
    });

    const renderSelectedFew = useCallback(() => {
        return (
            <div className="table-responsive">
                <table className="table table-striped table-sm">
                    <thead className="">
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Number</th>
                            <th>Call Status</th>
                            <th>Response</th>
                        </tr>
                    </thead>
                    <tbody>
                        {campaign.recipients.map((recipient, index) => {
                            return (
                                <tr key={index}>
                                    <td>
                                        <SearchCheckbox
                                            className="mr-0"
                                            label=""
                                            name="selectedFew"
                                            options={[
                                                {
                                                    name: "",
                                                    value: recipient.id
                                                }
                                            ]}
                                            field="value"
                                            value={rerun.selectedFew}
                                            onChange={handleChecked}
                                            displayField="name"
                                        />
                                    </td>
                                    <td>{recipient.name}</td>
                                    <td>{recipient.phonenumber}</td>
                                    <td>{recipient.callStatus}</td>
                                    <td>{recipient.action}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        );
    });

    const renderCallStatus = useCallback(() => {
        return (
            <div className="form-row">
                <div className="form-group floating-label col">
                    <FloatingCheckbox
                        label="call status"
                        name="callStatus"
                        value={rerun.callStatus}
                        options={callStatuses}
                        errors={errors}
                        field="name"
                        displayField="label"
                        onChange={handleChecked}
                    />
                </div>
            </div>
        );
    });

    const renderListType = useCallback(() => {
        switch (rerun.listType.toLowerCase()) {
            case "call_status":
                return renderCallStatus();
                break;
            case "selected_few":
                return renderSelectedFew();
                break;
            case "actions":
                return renderActions();
                break;
            default:
                return "";
                break;
        }
    });

    return (
        <form onSubmit={e => onSubmit(e)} className="mt-3">
            <div className="form-row">
                <div className="form-group floating-label col">
                    <FloatingDropdown
                        label="Select"
                        name="listType"
                        value={rerun.listType}
                        list={listTypes}
                        errors={errors}
                        field="name"
                        displayField="label"
                        onChange={handleChange}
                    />
                </div>
            </div>

            {renderListType()}

            <div className="form-group row">
                <div className="submit-form-elements p-3">
                    <button
                        disabled={errors.any()}
                        type="submit"
                        className="btn btn-success"
                    >
                        RE RUN
                    </button>
                </div>
            </div>
        </form>
    );
};

Form.displayName = displayName;
Form.propTypes = propTypes;

export default React.memo(Form);
