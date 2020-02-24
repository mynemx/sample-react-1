// import libs
import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import Form from "./components/Form";
import ReeValidate from "ree-validate";
import { contactUpdateRequest, contactEditRequest } from "../service";
import { showNotification } from "../../../../../utils/Notification";
import Company from "../../../models/Company";
import { authPageLoading } from "../../../../auth/store/actions";

// import components
import { Link } from "react-router-dom";

class Page extends PureComponent {
    static displayName = "EditCompanyPage";
    static propTypes = {
        contact: PropTypes.object.isRequired,
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
            email: "",
            phone: "required|min:10|max:16"
        });

        const contact = this.props.contact.toJson();

        this.state = {
            contact,
            err: "init",
            errors: this.validator.errors
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(authPageLoading(false));
        this.loadContact();
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const contact = nextProps.contact.toJson();

        if (!_.isEqual(this.state.contact, contact) && !this.state.contact.id) {
            this.setState({ contact });
        }
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
            this.setState({ errors, err: `${name}:${value}` });
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        const contact = this.state.contact;
        const { errors } = this.validator;

        this.validator.validateAll(contact).then(success => {
            if (success) {
                this.setState({ err: "success" });
                this.submit(contact);
            } else {
                this.setState({ errors, err: "error" });
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
                this.setState({ errors, contact, err: "errors" });
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
                                contact={this.state.contact}
                                contactTypes={this.props.contactTypes}
                                users={this.props.users}
                                contactCategories={this.props.contactCategories}
                                sources={this.props.sources}
                                salutations={this.props.salutations}
                                countries={this.props.countries}
                                err={this.state.err}
                                errors={this.state.errors}
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
