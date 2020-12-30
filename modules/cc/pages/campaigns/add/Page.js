// import libs
import React, { Component, PureComponent } from "react";
import PropTypes from "prop-types";
import Form from "./components/Form";
import ReeValidate from "ree-validate";
import { campaignAddRequest } from "../service";
import { showNotification } from "../../../../../utils/Notification";

// import components
import { Link } from "react-router-dom";
import { authPageLoading } from "../../../../auth/store/actions";

class Page extends PureComponent {
    static displayName = "UsersPage";
    static propTypes = {
        campaign: PropTypes.object.isRequired,
        users: PropTypes.array.isRequired,
        contactCategories: PropTypes.array.isRequired,
        contactTypes: PropTypes.array.isRequired,
        companyCategories: PropTypes.array.isRequired,
        companyTypes: PropTypes.array.isRequired,
        industries: PropTypes.array.isRequired,
        sources: PropTypes.array.isRequired,
        sipExtensions: PropTypes.array.isRequired,
        leadStatuses: PropTypes.array.isRequired,
        dispatch: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.validator = new ReeValidate({
            title: "required|min:3",
            listType: "required",
            filter: "required",
            listId: "",
            gatewayId: "",
            list: "",
            agent: "required",
            recipients: "",
            callScript: "required"
        });

        const campaign = this.props.campaign.toJson();

        this.state = {
            campaign,
            err: "init",
            errors: this.validator.errors
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(authPageLoading(false));
    }

    handleChange(name, value) {
        const { errors } = this.validator;
        const campaign = Object.assign(
            {},
            { ...this.state.campaign, [name]: value }
        );

        this.setState({ campaign });

        errors.remove(name);

        this.validator.validate(name, value).then(() => {
            this.setState({ errors, err: `${name}:${value}` });
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        const campaign = this.state.campaign;
        const { errors } = this.validator;

        this.validator.validateAll(campaign).then(success => {
            if (success) {
                this.setState({ err: "success" });
                this.submit(campaign);
            } else {
                this.setState({ errors, err: "error" });
            }
        });
    }

    submit(campaign) {
        this.props
            .dispatch(campaignAddRequest(campaign))
            .then(msg => {
                showNotification(msg, "success");
                this.setState({ campaign });
                this.props.history.push("/app/contact-center/campaigns");
            })
            .catch(({ error, statusCode }) => {
                const { errors } = this.validator;

                if (statusCode === 422) {
                    _.forOwn(error, (message, field) => {
                        errors.add(field, message);
                    });
                    showNotification("Invalid input", "error");
                }
                this.setState({ errors, campaign, err: "errors" });
            });
    }

    render() {
        return (
            <main className="page-container" role="main">
                <ol className="breadcrumb">
                    <li>
                        <Link to="/app/contact-center">Contact Center</Link>
                    </li>
                    <li>
                        <Link to="/app/contact-center/campaigns">
                            Campaigns
                        </Link>
                    </li>
                    <li className="active">Add Campaign</li>
                </ol>
                <div className="page-content">
                    <div className="card">
                        <div className="card-header">
                            <div className="card-title">Add Campaign</div>
                            <div className="heading-elements">
                                <Link
                                    to="/app/contact-center/campaigns"
                                    className="btn btn-primary btn-sm"
                                >
                                    Campaigns
                                </Link>
                            </div>
                        </div>
                        <div className="card-body">
                            <Form
                                campaign={this.state.campaign}
                                errors={this.state.errors}
                                err={this.state.err}
                                contactTypes={this.props.contactTypes}
                                companyTypes={this.props.companyTypes}
                                callGateways={this.props.callGateways}
                                users={this.props.users}
                                contactCategories={this.props.contactCategories}
                                industries={this.props.industries}
                                sources={this.props.sources}
                                companyCategories={this.props.companyCategories}
                                sipExtensions={this.props.sipExtensions}
                                leadStatuses={this.props.leadStatuses}
                                dispatch={this.props.dispatch}
                                onChange={this.handleChange}
                                onSubmit={this.handleSubmit}
                            />
                        </div>
                    </div>
                </div>
            </main>
        );
    }
}

export default React.memo(Page);
