import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { campaignListDetachRecipientsRequest } from "../../service";
import CampaignList from "../../../../models/CampaignList";
const displayName = "RecipientList";
const propTypes = {
    campaignList: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
};

const RecipientList = ({ campaignList, dispatch, history }) => {
    const renderLeads = useCallback(() => {
        return (
            <div className="table-responsive">
                <table className="table table-striped table-sm">
                    <thead className="">
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Status</th>
                            <th>Phone</th>
                            <th>Location</th>
                            <th>Source</th>
                            <th>Industry</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {campaignList.recipients.map((lead, index) => {
                            return (
                                <tr key={lead.id}>
                                    <td>{index + 1}</td>
                                    <td>
                                        <Link
                                            className=""
                                            to={`/app/crm/leads/${lead.id}`}
                                        >
                                            {lead.name}
                                        </Link>
                                    </td>
                                    <td>{lead.statusName}</td>
                                    <td>{lead.phone}</td>
                                    <td>{lead.location}</td>
                                    <td>{lead.source}</td>
                                    <td>{lead.industryName}</td>
                                    <td>
                                        <button
                                            type="button"
                                            onClick={e =>
                                                detachRecepient(lead.id)
                                            }
                                            className="btn btn-xs btn-danger"
                                        >
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        );
    });

    const renderCompanies = useCallback(() => {
        return (
            <div className="table-responsive">
                <table className="table table-striped table-sm">
                    <thead className="">
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Category</th>
                            <th>Phone</th>
                            <th>Location</th>
                            <th>Industry</th>
                            <th>Source</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {campaignList.recipients.map((company, index) => {
                            return (
                                <tr key={company.id}>
                                    <td>{index + 1}</td>
                                    <td>
                                        <Link
                                            className=""
                                            to={`/app/crm/companies/${company.id}`}
                                        >
                                            {company.name}
                                        </Link>
                                    </td>
                                    <td>{company.companyTypeName}</td>
                                    <td>{company.companyCategoryName}</td>
                                    <td>{company.phone}</td>
                                    <td>{company.location}</td>
                                    <td>{company.industryName}</td>
                                    <td>{company.source}</td>
                                    <td>
                                        <button
                                            type="button"
                                            onClick={e =>
                                                detachRecepient(company.id)
                                            }
                                            className="btn btn-xs btn-danger"
                                        >
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        );
    });

    const renderContacts = useCallback(() => {
        return (
            <div className="table-responsive">
                <table className="table table-striped table-sm">
                    <thead className="">
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Category</th>
                            <th>Phone</th>
                            <th>Gender</th>
                            <th>Position</th>
                            <th>Location</th>
                            <th>Source</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {campaignList.recipients.map((contact, index) => {
                            return (
                                <tr key={contact.id}>
                                    <td>{index + 1}</td>
                                    <td>
                                        <Link
                                            className=""
                                            to={`/app/crm/contacts/${contact.id}`}
                                        >
                                            {contact.salutationName +
                                                " " +
                                                contact.name}
                                        </Link>
                                    </td>
                                    <td>{contact.contactTypeName}</td>
                                    <td>{contact.contactCategoryName}</td>
                                    <td>{contact.phone}</td>
                                    <td>{contact.gender}</td>
                                    <td>{contact.position}</td>
                                    <td>{contact.location}</td>
                                    <td>{contact.source}</td>
                                    <td>
                                        <button
                                            type="button"
                                            onClick={e =>
                                                detachRecepient(contact.id)
                                            }
                                            className="btn btn-xs btn-danger"
                                        >
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
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
    }, [campaignList, renderCompanies, renderContacts, renderLeads]);

    const detachRecepient = useCallback(
        id => {
            const form = { id: campaignList.id, recipient: id };

            dispatch(campaignListDetachRecipientsRequest(form));
        },
        [dispatch, campaignListDetachRecipientsRequest, CampaignList]
    );

    return (
        <div className="card">
            <div className="card-header">
                <div className="card-title">Recipients</div>
                <div className="heading-elements"></div>
            </div>
            <div className="card-body">
                <div className="row">{renderRecipients()}</div>
            </div>
        </div>
    );
};

RecipientList.displayName = displayName;
RecipientList.propTypes = propTypes;

export default React.memo(RecipientList);
