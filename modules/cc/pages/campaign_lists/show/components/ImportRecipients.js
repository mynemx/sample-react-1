import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import SearchText from "../../../../../../utils/SearchText";
import SearchCheckbox from "../../../../../../utils/SearchCheckbox";
import {
    campaignListRecipientsRequest,
    campaignListImportRecipientsRequest
} from "../../service";
import CampaignList from "../../../../models/CampaignList";
const displayName = "ImportRecipients";
const propTypes = {
    dispatch: PropTypes.func.isRequired,
    campaignList: PropTypes.object.isRequired
};

const ImportRecipients = ({
    campaignList,
    contactTypes,
    contactCategories,
    leadStatuses,
    companyTypes,
    industries,
    companyCategories,
    genders = [{ name: "Male" }, { name: "Female" }],
    handleRemove,
    dispatch,
    history
}) => {
    const [filter, setFilter] = useState({
        name: "",
        location: "",
        gender: [],
        type: [],
        industry: [],
        status: [],
        category: [],
        offset: "0",
        limits: "100"
    });
    const [recipients, setRecipients] = useState({
        lists: campaignList.recipients,
        result: [],
        addRecepients: [],
        recipient: []
    });

    const errors = [];
    const handleChange = useCallback((name, value) => {
        const state = Object.assign({}, { ...filter, [name]: value });
        setFilter(state);
    });

    const handleChecked = useCallback((name, value, status) => {
        if (status) {
            const obj = [...filter[name], value];
            const state = Object.assign({}, { ...filter, [name]: obj });
            setFilter(state);
        } else {
            const obj = filter[name].filter(item => item !== value);
            const state = Object.assign({}, { ...filter, [name]: obj });
            setFilter(state);
        }
    });

    const handleAddRecipient = useCallback((name, value, status) => {
        if (status) {
            const obj = [...recipients[name], value];
            const state = Object.assign({}, { ...recipients, [name]: obj });
            setRecipients(state);
        } else {
            const obj = recipients[name].filter(item => item !== value);
            const state = Object.assign({}, { ...recipients, [name]: obj });
            setRecipients(state);
        }
    });

    const removeDublicate = useCallback(data => {
        const result = data;
        for (let el of campaignList.recipients) {
            let index = data.findIndex(s => {
                return s.id == el.id;
            });
            if (index != -1) {
                result.splice(index, 1);
            }
        }
        const state = Object.assign({}, { ...recipients, result });
        setRecipients(state);
    });

    const onSubmit = useCallback(e => {
        e.preventDefault();
        const form = Object.assign(
            {},
            { ...filter, recipientType: campaignList.category }
        );

        dispatch(campaignListRecipientsRequest(form))
            .then(data => {
                removeDublicate(data);
            })
            .catch(({ error, statusCode }) => {});
    });

    const importRecepient = useCallback(e => {
        const form = { id: campaignList.id, recipient: recipients.recipient };

        dispatch(campaignListImportRecipientsRequest(form))
            .then(() => {
                const state = Object.assign({}, { ...recipients, result: [] });
                setRecipients(state);
                history.push(
                    `/app/contact-center/campaign-lists/${campaignList.id}`
                );
            })
            .catch(({ error, statusCode }) => {});
    });

    const renderLeads = useCallback(() => {
        return (
            <>
                <form onSubmit={e => onSubmit(e)}>
                    <div className="row">
                        <div className="floating-label col">
                            <SearchText
                                label="Name/Phonenumber"
                                name="name"
                                value={filter.name}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="floating-label col">
                            <SearchText
                                label="Location"
                                name="location"
                                value={filter.location}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="floating-label col">
                            <SearchCheckbox
                                label="Status"
                                name="status"
                                options={leadStatuses}
                                field="id"
                                value={filter.status}
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
                                value={filter.gender}
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
                                value={filter.industry}
                                onChange={handleChecked}
                                displayField="name"
                            />
                        </div>
                        <div className="floating-label col">
                            <SearchText
                                label="Offset"
                                name="offset"
                                value={filter.offset}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="floating-label col">
                            <SearchText
                                label="Limit"
                                name="limits"
                                value={filter.limits}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="floating-label col">
                            <button
                                type="submit"
                                className="btn btn-sm btn-primary"
                            >
                                Filter
                            </button>
                        </div>
                    </div>
                </form>
                <div className="table-responsive">
                    <table className="table table-striped table-sm">
                        <thead className="">
                            <tr>
                                <th></th>
                                <th>Name</th>
                                <th>Status</th>
                                <th>Phone</th>
                                <th>Gender</th>
                                <th>Location</th>
                                <th>Source</th>
                                <th>Industry</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recipients.result.map((lead, index) => {
                                return (
                                    <tr key={lead.id}>
                                        <td>
                                            <SearchCheckbox
                                                className="mr-0"
                                                label=""
                                                name="recipient"
                                                options={[
                                                    { name: "", value: lead.id }
                                                ]}
                                                field="value"
                                                value={recipients.recipient}
                                                onChange={handleAddRecipient}
                                                displayField="name"
                                            />
                                        </td>
                                        <td>{lead.name}</td>
                                        <td>{lead.statusName}</td>
                                        <td>{lead.phone}</td>
                                        <td>{lead.gender}</td>
                                        <td>{lead.location}</td>
                                        <td>{lead.source}</td>
                                        <td>{lead.industryName}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </>
        );
    });

    const renderCompanies = useCallback(() => {
        return (
            <>
                <form onSubmit={e => onSubmit(e)}>
                    <div className="row">
                        <div className="floating-label col">
                            <SearchText
                                label="Name/Phonenumber"
                                name="name"
                                value={filter.name}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="floating-label col">
                            <SearchText
                                label="Location"
                                name="location"
                                value={filter.location}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="floating-label col">
                            <SearchCheckbox
                                label="Category"
                                name="category"
                                options={companyCategories}
                                field="id"
                                value={filter.category}
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
                                value={filter.industry}
                                onChange={handleChecked}
                                displayField="name"
                            />
                        </div>
                        <div className="floating-label col">
                            <SearchText
                                label="Offset"
                                name="offset"
                                value={filter.offset}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="floating-label col">
                            <SearchText
                                label="Limit"
                                name="limits"
                                value={filter.limits}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="floating-label col">
                            <button
                                type="submit"
                                className="btn btn-sm btn-primary"
                            >
                                Filter
                            </button>
                        </div>
                    </div>
                </form>
                <div className="table-responsive">
                    <table className="table table-striped table-sm">
                        <thead className="">
                            <tr>
                                <th></th>
                                <th>Name</th>
                                <th>Type</th>
                                <th>Category</th>
                                <th>Phone</th>
                                <th>Location</th>
                                <th>Industry</th>
                                <th>Source</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recipients.result.map((company, index) => {
                                return (
                                    <tr key={company.id}>
                                        <td>
                                            <SearchCheckbox
                                                className="mr-0"
                                                label=""
                                                name="recipient"
                                                options={[
                                                    {
                                                        name: "",
                                                        value: company.id
                                                    }
                                                ]}
                                                field="value"
                                                value={recipients.recipient}
                                                onChange={handleAddRecipient}
                                                displayField="name"
                                            />
                                        </td>
                                        <td>{company.name}</td>
                                        <td>{company.companyTypeName}</td>
                                        <td>{company.companyCategoryName}</td>
                                        <td>{company.phone}</td>
                                        <td>{company.location}</td>
                                        <td>{company.industryName}</td>
                                        <td>{company.source}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </>
        );
    });

    const renderContacts = useCallback(() => {
        return (
            <>
                <form onSubmit={e => onSubmit(e)}>
                    <div className="row">
                        <div className="floating-label col">
                            <SearchText
                                label="Name/Phonenumber"
                                name="name"
                                value={filter.name}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="floating-label col">
                            <SearchText
                                label="Location"
                                name="location"
                                value={filter.location}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="floating-label col">
                            <SearchCheckbox
                                label="Gender"
                                name="gender"
                                options={genders}
                                field="name"
                                value={filter.gender}
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
                                value={filter.category}
                                onChange={handleChecked}
                                displayField="name"
                            />
                        </div>
                        <div className="floating-label col">
                            <SearchText
                                label="Offset"
                                name="offset"
                                value={filter.offset}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="floating-label col">
                            <SearchText
                                label="Limit"
                                name="limits"
                                value={filter.limits}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="floating-label col">
                            <button
                                type="submit"
                                className="btn btn-sm btn-primary"
                            >
                                Filter
                            </button>
                        </div>
                    </div>
                </form>

                <div className="table-responsive">
                    <table className="table table-striped table-sm">
                        <thead className="">
                            <tr>
                                <th></th>
                                <th>Name</th>
                                <th>Type</th>
                                <th>Category</th>
                                <th>Phone</th>
                                <th>Gender</th>
                                <th>Position</th>
                                <th>Location</th>
                                <th>Source</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recipients.result.map((contact, index) => {
                                return (
                                    <tr key={contact.id}>
                                        <td>
                                            <SearchCheckbox
                                                className="mr-0"
                                                label=""
                                                name="recipient"
                                                options={[
                                                    {
                                                        name: "",
                                                        value: contact.id
                                                    }
                                                ]}
                                                field="value"
                                                value={recipients.recipient}
                                                onChange={handleAddRecipient}
                                                displayField="name"
                                            />
                                        </td>
                                        <td>
                                            {contact.salutationName +
                                                " " +
                                                contact.name}
                                        </td>
                                        <td>{contact.contactTypeName}</td>
                                        <td>{contact.contactCategoryName}</td>
                                        <td>{contact.phone}</td>
                                        <td>{contact.gender}</td>
                                        <td>{contact.position}</td>
                                        <td>{contact.location}</td>
                                        <td>{contact.source}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </>
        );
    });

    const renderRecipients = useCallback(() => {
        switch (campaignList.category.toLowerCase()) {
            case "contact":
                return renderContacts();
                break;
            case "lead":
                return renderLeads();
                break;
            case "company":
                return renderCompanies();
                break;
        }
    }, [campaignList, renderLeads, renderContacts, renderCompanies]);

    return (
        <div className="card">
            <div className="card-header">
                <div className="card-title">Import Recipients</div>
                <div className="heading-elements">
                    <div className="btn-group btn-sm action-btn">
                        <button
                            type="button"
                            className="btn btn-sm dropdown-toggle"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                        >
                            Menu
                        </button>

                        <div className="dropdown-menu">
                            <Link
                                className="dropdown-item"
                                to={`/app/crm/contacts/edit/${campaignList.id}`}
                            >
                                Edit
                            </Link>
                            <Link
                                className="dropdown-item"
                                to="#"
                                onClick={() => handleRemove(campaignList.id)}
                            >
                                Delete
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card-body">{renderRecipients()}</div>
            <div className="card-footer">
                <div className="form-submit-elements">
                    <button
                        onClick={e => importRecepient()}
                        type="button"
                        className="btn btn-success"
                    >
                        IMPORT RECIPIENTS
                    </button>
                </div>
            </div>
        </div>
    );
};

ImportRecipients.displayName = displayName;
ImportRecipients.propTypes = propTypes;

export default React.memo(ImportRecipients);
