import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { NavLink, Link, Switch, Route, Router } from "react-router-dom";
import {
    leadEditRequest,
    leadRemoveRequest,
    leadMigrateAsCompanyRequest,
    leadMigrateAsContactRequest
} from "../service";
import { feedbackRequest } from "../../../../cc/service";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { showNotification } from "../../../../../utils/Notification";
import { authPageLoading } from "../../../../auth/store/actions";

// import components
import LeadDetails from "./components/Details";
import Conversation from "./components/Conversation";

class Page extends PureComponent {
    static displayName = "LeadPage";
    static propTypes = {
        lead: PropTypes.object.isRequired,
        leadStatuses: PropTypes.array.isRequired,
        match: PropTypes.object.isRequired,
        dispatch: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        const lead = this.props.lead.toJson();
        const leadStatuses = this.props.leadStatuses;
        this.state = {
            lead,
            leadStatuses,
            feedbacks: []
        };
        this.handleRemove = this.handleRemove.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(authPageLoading(false));
        this.loadLead();
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const lead = nextProps.lead.toJson();
        const { leadStatuses } = nextProps;

        if (!_.isEqual(this.state.lead, lead)) {
            this.setState({ lead });
            this.loadData(lead);
        }
        this.setState({ leadStatuses });
    }

    loadLead() {
        const { match, lead, dispatch } = this.props;

        if (!lead.id) {
            dispatch(leadEditRequest(match.params.id)).catch(
                ({ error, statusCode }) => {
                    if (statusCode === 404) {
                        showNotification(error, "error");
                        this.props.history.push(`/app/crm/leads`);
                    }
                }
            );
        }
    }

    loadData(lead) {
        const { match, dispatch } = this.props;

        dispatch(feedbackRequest({ phone: lead.phone, limits: 100 })).then(
            data => {
                this.setState({ feedbacks: data });
            }
        );
    }

    handleRemove(id) {
        this.props.dispatch(leadRemoveRequest(id)).then(() => {
            this.props.history.push(`/app/crm/leads`);
        });
    }

    handleMigrateAsContact = id => {
        this.props.dispatch(leadMigrateAsContactRequest(id)).then(data => {
            this.props.history.push(`/app/crm/contacts/${data.id}`);
        });
    };

    handleMigrateAsCompany = id => {
        this.props.dispatch(leadMigrateAsCompanyRequest(id)).then(data => {
            this.props.history.push(`/app/crm/companies/${data.id}`);
        });
    };

    renderDetails = () => (
        <LeadDetails
            {...this.state}
            handleMigrateAsContact={this.handleMigrateAsContact}
            handleMigrateAsCompany={this.handleMigrateAsCompany}
            handleRemove={this.handleRemove}
        />
    );

    renderConversation = () => (
        <Conversation {...this.state} dispatch={this.props.dispatch} />
    );

    render() {
        return (
            <main className="page-container" role="main">
                <ol className="breadcrumb">
                    <li>
                        <Link to="/app/crm">CRM</Link>
                    </li>
                    <li>
                        <Link to="/app/crm/leads">Leads</Link>
                    </li>
                    <li className="active">Details</li>
                </ol>
                <div className="page-content">
                    <div className="row">
                        <div className="col-xs-12 col-sm-6 col-md-5 col-lg-4 col-xl-3">
                            <div className="card ">
                                <div className="card-img-top">
                                    <div className="text-center mt-2">
                                        {this.state.lead.name}
                                    </div>
                                    {this.state.lead.photo == undefined ? (
                                        <div className="profile-image">
                                            {this.state.lead.initials}
                                        </div>
                                    ) : (
                                        <div className="text-center">
                                            <img
                                                style={{
                                                    width: "150px",
                                                    height: "150px",
                                                    borderRadius: "200px"
                                                }}
                                                className="border border-black rounded-circle img-fluid"
                                                src={this.state.lead.photo}
                                            />
                                        </div>
                                    )}
                                </div>
                                <div className="card-body px-0">
                                    <ul className="navigation">
                                        <li className="navigation-header">
                                            Navigation
                                        </li>

                                        <li>
                                            <NavLink
                                                exact
                                                to={`${this.props.match.url}`}
                                            >
                                                <MoreVertIcon />
                                                Details
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink
                                                to={`${this.props.match.url}/conversations`}
                                            >
                                                <MoreVertIcon />
                                                Conversations
                                            </NavLink>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="col ">
                            <div className="steps">
                                {this.state.leadStatuses
                                    .filter(status => {
                                        return status.initial == 1;
                                    })
                                    .map((status, index) => {
                                        return (
                                            <div key={index} className="step">
                                                <div
                                                    className={
                                                        status.id ==
                                                        this.state.lead
                                                            .leadStatusId
                                                            ? "step__title active"
                                                            : "step__title"
                                                    }
                                                >
                                                    {status.name}
                                                </div>
                                            </div>
                                        );
                                    })}
                                {this.state.leadStatuses
                                    .filter(status => {
                                        return status.progress == 1;
                                    })
                                    .map((status, index) => {
                                        return (
                                            <div key={index} className="step">
                                                <div
                                                    className={
                                                        status.id ==
                                                        this.state.lead
                                                            .leadStatusId
                                                            ? "step__title active"
                                                            : "step__title"
                                                    }
                                                >
                                                    {status.name}
                                                </div>
                                            </div>
                                        );
                                    })}
                                {this.state.leadStatuses
                                    .filter(status => {
                                        return status.success == 1;
                                    })
                                    .map((status, index) => {
                                        return (
                                            <div key={index} className="step">
                                                <div
                                                    className={
                                                        status.id ==
                                                        this.state.lead
                                                            .leadStatusId
                                                            ? "step__title active"
                                                            : "step__title"
                                                    }
                                                >
                                                    {status.name}
                                                </div>
                                            </div>
                                        );
                                    })}
                            </div>
                            <Switch>
                                <Route
                                    exact
                                    path={`${this.props.match.path}`}
                                    render={this.renderDetails}
                                />

                                <Route
                                    exact
                                    path={`${this.props.match.path}/conversations`}
                                    render={this.renderConversation}
                                />
                            </Switch>
                        </div>
                    </div>
                </div>
            </main>
        );
    }
}

export default Page;
