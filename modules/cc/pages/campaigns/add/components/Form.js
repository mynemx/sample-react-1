import React, { useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import FloatingAutoComplete from "../../../../../../utils/FloatingAutoComplete";
import FloatingDropdown from "../../../../../../utils/FloatingDropdown";
import FloatingText from "../../../../../../utils/FloatingText";
import FloatingTextArea from "../../../../../../utils/FloatingTextArea";

import SearchText from "../../../../../../utils/SearchText";
import SearchCheckbox from "../../../../../../utils/SearchCheckbox";
import { campaignRecipientsRequest } from "../../service";
import { debounce } from "lodash";

const displayName = "ContactFrom";
const propTypes = {
    campaign: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
};

var timerOut = null;

const Form = ({
    campaign,
    contactTypes,
    companyTypes,
    sipExtensions,
    contactCategories,
    companyCategories,
    industries,
    leadStatuses,
    callGateways,
    users,
    genders = [{ name: "Male" }, { name: "Female" }],
    dispatch,
    errors,
    onChange,
    onSubmit
}) => {
    const listTypes = useMemo(() => [
        { name: "Company" },
        { name: "Contact" },
        { name: "Lead" },
        { name: "List" }
    ]);

    const handleChange = useCallback(
        (name, value) => {
            if (value !== campaign[name]) {
                onChange(name, value);
            }
        },
        [campaign, onChange]
    );

    const handleFilterChange = useCallback(
        (name, value) => {
            const filter = Object.assign(
                {},
                { ...campaign.filter, [name]: value }
            );
            onChange("filter", filter);
            clearTimeout(timerOut);
            timerOut = setTimeout(() => {
                handleRecipients(filter);
            }, 2000);
        },
        [campaign, handleRecipients]
    );

    const handleChecked = useCallback((name, value, status) => {
        if (status) {
            const obj = [...campaign.filter[name], value];
            const filter = Object.assign(
                {},
                { ...campaign.filter, [name]: obj }
            );
            onChange("filter", filter);
            clearTimeout(timerOut);
            timerOut = setTimeout(() => {
                handleRecipients(filter);
            }, 2000);
        } else {
            const obj = campaign.filter[name].filter(item => item !== value);
            const filter = Object.assign(
                {},
                { ...campaign.filter, [name]: obj }
            );
            onChange("filter", filter);
            clearTimeout(timerOut);
            timerOut = setTimeout(() => {
                handleRecipients(filter);
            }, 2000);
        }
    });

    const handleRecipients = useCallback(filter => {
        const form = Object.assign(
            {},
            { ...filter, recipientType: campaign.listType }
        );

        dispatch(campaignRecipientsRequest(form)).then(data => {
            onChange("recipients", data);
        });
    });

    const renderLeads = useCallback(() => {
        return (
            <>
                <div className="row">
                    <div className="col pl-2 pb-4">
                        Lead Filters:{" "}
                        <label className="label">
                            {" "}
                            s Results ({campaign.recipients.length})
                        </label>
                    </div>
                </div>
                <div className="row">
                    <div className="floating-label col">
                        <SearchText
                            label="Location"
                            name="location"
                            value={campaign.filter.location}
                            onChange={handleFilterChange}
                        />
                    </div>
                    <div className="floating-label col">
                        <SearchCheckbox
                            label="Status"
                            name="status"
                            options={leadStatuses}
                            field="id"
                            value={campaign.filter.status}
                            onChange={handleChecked}
                            displayField="name"
                        />
                    </div>
                    <div className="floating-label col">
                        <SearchCheckbox
                            label="Gender"
                            name="gender"
                            options={genders}
                            field="name"
                            value={campaign.filter.gender}
                            onChange={handleChecked}
                            displayField="name"
                        />
                    </div>
                    <div className="floating-label col">
                        <SearchCheckbox
                            label="Industry"
                            name="industry"
                            options={industries}
                            field="id"
                            value={campaign.filter.industry}
                            onChange={handleChecked}
                            displayField="name"
                        />
                    </div>
                    <div className="floating-label col">
                        <SearchText
                            label="Offset"
                            name="offset"
                            value={campaign.filter.offset}
                            onChange={handleFilterChange}
                        />
                    </div>
                    <div className="floating-label col">
                        <SearchText
                            label="Limit"
                            name="limits"
                            value={campaign.filter.limits}
                            onChange={handleFilterChange}
                        />
                    </div>
                </div>
            </>
        );
    });

    const renderCompanies = useCallback(() => {
        return (
            <>
                <div className="row">
                    <div className="col pl-2 pb-4">
                        Company Filters:{" "}
                        <label className="label">
                            {" "}
                            Results ({campaign.recipients.length})
                        </label>
                    </div>
                </div>
                <div className="row">
                    <div className="floating-label col">
                        <SearchText
                            label="Location"
                            name="location"
                            value={campaign.filter.location}
                            onChange={handleFilterChange}
                        />
                    </div>
                    <div className="floating-label col">
                        <SearchCheckbox
                            label="Category"
                            name="category"
                            options={companyCategories}
                            field="id"
                            value={campaign.filter.category}
                            onChange={handleChecked}
                            displayField="name"
                        />
                    </div>
                    <div className="floating-label col">
                        <SearchCheckbox
                            label="Type"
                            name="type"
                            options={companyTypes}
                            field="id"
                            value={campaign.filter.type}
                            onChange={handleChecked}
                            displayField="name"
                        />
                    </div>
                    <div className="floating-label col">
                        <SearchCheckbox
                            label="Industry"
                            name="industry"
                            options={industries}
                            field="id"
                            value={campaign.filter.industry}
                            onChange={handleChecked}
                            displayField="name"
                        />
                    </div>
                    <div className="floating-label col">
                        <SearchText
                            label="Offset"
                            name="offset"
                            value={campaign.filter.offset}
                            onChange={handleFilterChange}
                        />
                    </div>
                    <div className="floating-label col">
                        <SearchText
                            label="Limit"
                            name="limits"
                            value={campaign.filter.limits}
                            onChange={handleFilterChange}
                        />
                    </div>
                </div>
            </>
        );
    });

    const renderContacts = useCallback(() => {
        return (
            <>
                <div className="row">
                    <div className="col pl-2 pb-4">
                        Contact Filters:{" "}
                        <label className="label">
                            {" "}
                            Results ({campaign.recipients.length})
                        </label>
                    </div>
                </div>
                <div className="row">
                    <div className="floating-label col">
                        <SearchText
                            label="Location"
                            name="location"
                            value={campaign.filter.location}
                            onChange={handleFilterChange}
                        />
                    </div>
                    <div className="floating-label col">
                        <SearchCheckbox
                            label="Gender"
                            name="gender"
                            options={genders}
                            field="name"
                            value={campaign.filter.gender}
                            onChange={handleChecked}
                            displayField="name"
                        />
                    </div>
                    <div className="floating-label col">
                        <SearchCheckbox
                            label="Category"
                            name="category"
                            options={contactCategories}
                            field="id"
                            value={campaign.filter.category}
                            onChange={handleChecked}
                            displayField="name"
                        />
                    </div>
                    <div className="floating-label col">
                        <SearchCheckbox
                            label="Type"
                            name="type"
                            options={contactTypes}
                            field="id"
                            value={campaign.filter.type}
                            onChange={handleChecked}
                            displayField="name"
                        />
                    </div>
                    <div className="floating-label col">
                        <SearchText
                            label="Offset"
                            name="offset"
                            value={campaign.filter.offset}
                            onChange={handleFilterChange}
                        />
                    </div>
                    <div className="floating-label col">
                        <SearchText
                            label="Limit"
                            name="limits"
                            value={campaign.filter.limits}
                            onChange={handleFilterChange}
                        />
                    </div>
                </div>
            </>
        );
    });

    const renderCampaignLists = useCallback(() => {
        return (
            <>
                <div className="row">
                    <div className="col pl-2 pb-4">
                        Campaign List Filters:{" "}
                        <label className="label">{campaign.list.name}</label>
                    </div>
                </div>
                <div className="row">
                    <div className="floating-label col">
                        <FloatingAutoComplete
                            label="Search Campaign List"
                            name="listId"
                            value={campaign.listId || ""}
                            errors={errors}
                            url="cc/call_campaign_lists/search"
                            dataset="campaign_lists"
                            nameField="id"
                            displayField="name"
                            selectedValue={
                                campaign.list ? campaign.list.name : ""
                            }
                            onChange={handleChange}
                            onChangeItem={list => {
                                setTimeout(() => {
                                    onChange("list", list);
                                }, 200);
                                onChange("listId", list.id);
                            }}
                        />
                    </div>
                </div>
            </>
        );
    });

    const renderRecipients = useCallback(() => {
        switch (campaign.listType.toLowerCase()) {
            case "contact":
                return renderContacts();
                break;
            case "lead":
                return renderLeads();
                break;
            case "company":
                return renderCompanies();
                break;
            case "list":
                return renderCampaignLists();
                break;
        }
    });

    return (
        <form onSubmit={e => onSubmit(e)} className="mt-3">
            <div className="form-row">
                <div className="form-group floating-label col">
                    <FloatingText
                        label="Campaign Title"
                        name="title"
                        value={campaign.title}
                        errors={errors}
                        onChange={handleChange}
                    />
                </div>
            </div>

            <div className="form-row">
                <div className="form-group floating-label col">
                    <FloatingDropdown
                        label="Who do you want to call"
                        name="listType"
                        value={campaign.listType}
                        list={listTypes}
                        errors={errors}
                        field="name"
                        displayField="name"
                        onChange={handleChange}
                    />
                </div>
            </div>

            {renderRecipients()}

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
                        onChange={onChange}
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
