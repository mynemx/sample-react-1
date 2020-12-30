// import libs
import React, { Component } from "react";
import PropTypes from "prop-types";
import Form from "./components/Form";
import ReeValidate from "ree-validate";
import { contactUpdateRequest, contactEditRequest } from "../service";
import { showNotification } from "../../../../../utils/Notification";
import Company from "../../../models/Company";

// import components
import { Link } from "react-router-dom";

class Page extends Component {
    static displayName = "EditCompanyPage";
    static propTypes = {
        contact: PropTypes.object.isRequired,
        companies: PropTypes.array.isRequired,
        users: PropTypes.array.isRequired,
        contactCategories: PropTypes.array.isRequired,
        contactTypes: PropTypes.array.isRequired,
        sources: PropTypes.array.isRequired,
        salutations: PropTypes.array.isRequired,
        countries: PropTypes.array.isRequired,
        dispatch: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.validator = new ReeValidate({
            name: "required|min:3",
            salutationId: "required",
            contactTypeId: "required",
            contactCategoryId: "required",
            salesRepId: "required",
            postal: "max:200",
            website: "max:200",
            gender: "max:200",
            position: "max:200",
            address: "max:200",
            city: "max:200",
            dateOfBirth: "max:200",
            note: "max:200",
            source: "max:200",
            location: "max:200",
            state: "max:200",
            country: "max:200",
            companyId: "",
            deliveryAddress: "max:200",
            industryId: "required",
            email: "required|min:10",
            phone: "required|min:10|max:16"
        });

        const contact = this.props.contact.toJson();
        const {
            users,
            companies,
            contactCategories,
            salutations,
            contactTypes,
            sources,
            countries
        } = this.props;

        this.state = {
            contact,
            contactTypes,
            users,
            contactCategories,
            sources,
            companies,
            salutations,
            countries,
            errors: this.validator.errors
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    UNSAFE_componentWillMount() {
        this.loadContact();
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const contact = nextProps.contact.toJson();
        const {
            users,
            salutations,
            contactCategories,
            contactTypes,
            sources,

            countries,
            companies
        } = nextProps;

        if (!_.isEqual(this.state.contact, contact)) {
            this.setState({ contact });
        }
        this.setState({
            contactTypes,
            users,
            contactCategories,
            sources,
            salutations,
            countries,
            companies
        });
    }

    loadContact() {
        const { match, contact, dispatch } = this.props;

        if (!contact.id) {
            dispatch(contactEditRequest(match.params.id)).catch(
                ({ error, statusCode }) => {
                    if (statusCode === 404) {
                        showNotification(error, "error");
                        this.props.history.push(`/app/crm/contacts`);
                    }
                }
            );
        }
    }
    handleChange(name, value) {
        const { errors } = this.validator;
        const contact = Object.assign(
            {},
            { ...this.state.contact, [name]: value }
        );

        this.setState({ contact });

        errors.remove(name);

        this.validator.validate(name, value).then(() => {
            this.setState({ errors });
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        const contact = this.state.contact;
        const { errors } = this.validator;

        this.validator.validateAll(contact).then(success => {
            if (success) {
                this.submit(contact);
            } else {
                this.setState({ errors });
            }
        });
    }

    submit(contact) {
        this.props
            .dispatch(contactUpdateRequest(contact))
            .then(msg => {
                showNotification(msg, "success");
                this.setState({ contact });
                this.props.history.push(
                    `/app/crm/contacts/${this.state.contact.id}`
                );
            })
            .catch(({ error, statusCode }) => {
                const { errors } = this.validator;

                if (statusCode === 422) {
                    _.forOwn(error, (message, field) => {
                        errors.add(field, message);
                    });
                    showNotification("Invalid input", "error");
                }
                this.setState({ errors });
            });
    }

    render() {
        return (
            <main className="page-container" role="main">
                <ol className="breadcrumb">
                    <li>
                        <Link to="/app/crm">CRM</Link>
                    </li>
                    <li>
                        <Link to="/app/crm/contacts">Contacts</Link>
                    </li>
                    <li className="active">Edit Contact</li>
                </ol>
                <div className="page-content">
                    <div className="card">
                        <div className="card-header">
                            <div className="card-title">Edit Contact</div>
                            <div className="heading-elements">
                                <Link
                                    to="/app/crm/contacts"
                                    className="btn btn-primary btn-sm"
                                >
                                    Contacts
                                </Link>
                                <Link
                                    to={`/app/crm/contacts/${this.state.contact.id}`}
                                    className="btn btn-primary btn-sm"
                                >
                                    Show Details
                                </Link>
                            </div>
                        </div>
                        <div className="card-body">
                            <Form
                                {...this.state}
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

export default Page;
