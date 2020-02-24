// import libs
import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import Form from "./components/Form";
import ReeValidate from "ree-validate";
import { leadUpdateRequest, leadEditRequest } from "../service";
import { showNotification } from "../../../../../utils/Notification";
import { authPageLoading } from "../../../../auth/store/actions";

// import components
import { Link } from "react-router-dom";

class Page extends PureComponent {
    static displayName = "EditLeadPage";
    static propTypes = {
        lead: PropTypes.object.isRequired,
        users: PropTypes.array.isRequired,
        industries: PropTypes.array.isRequired,
        leadStatuses: PropTypes.array.isRequired,
        sources: PropTypes.array.isRequired,
        countries: PropTypes.array.isRequired,
        dispatch: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.validator = new ReeValidate({
            name: "required|min:3",
            leadStatusId: "required",
            salesRepId: "required",
            postal: "max:200",
            website: "max:200",
            position: "max:200",
            address: "max:200",
            city: "max:200",
            note: "max:200",
            source: "max:200",
            location: "max:200",
            state: "max:200",
            country: "max:200",
            deliveryAddress: "max:200",
            industryId: "",
            gender: "",
            email: "max:200",
            phone: "min:10|max:16"
        });

        const lead = this.props.lead.toJson();
        const {
            users,
            leadStatuses,
            sources,
            countries,
            industries
        } = this.props;

        this.state = {
            lead,
            leadStatuses,
            gender: [{ name: "Male" }, { name: "Female" }],
            users,
            industries,
            sources,
            countries,
            err: "init",
            errors: this.validator.errors
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(authPageLoading(false));
        this.loadLead();
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const lead = nextProps.lead.toJson();
        const {
            leadStatuses,
            users,
            sources,
            countries,
            industries
        } = nextProps;

        if (!_.isEqual(this.state.lead, lead)) {
            this.setState({ lead });
        }
        this.setState({
            leadStatuses,
            users,
            sources,
            industries,
            countries
        });
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
    handleChange(name, value) {
        const { errors } = this.validator;
        const lead = Object.assign({}, { ...this.state.lead, [name]: value });

        this.setState({ lead });

        errors.remove(name);

        this.validator.validate(name, value).then(() => {
            this.setState({ errors, err: `${name}:${value}` });
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        const lead = this.state.lead;
        const { errors } = this.validator;

        this.validator.validateAll(lead).then(success => {
            if (success) {
                this.setState({ err: "success" });
                this.submit(lead);
            } else {
                this.setState({ errors, err: "error" });
            }
        });
    }

    submit(lead) {
        this.props
            .dispatch(leadUpdateRequest(lead))
            .then(msg => {
                showNotification(msg, "success");
                this.props.history.push(`/app/crm/leads/${this.state.lead.id}`);
            })
            .catch(({ error, statusCode }) => {
                const { errors } = this.validator;

                if (statusCode === 422) {
                    _.forOwn(error, (message, field) => {
                        errors.add(field, message);
                    });
                    showNotification("Invalid input", "error");
                }
                this.setState({ errors, err: "errors", lead });
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
                        <Link to="/app/crm/leads">Leads</Link>
                    </li>
                    <li className="active">Edit Lead</li>
                </ol>
                <div className="page-content">
                    <div className="card">
                        <div className="card-header">
                            <div className="card-title">Edit Lead</div>
                            <div className="heading-elements">
                                <Link
                                    to="/app/crm/leads"
                                    className="btn btn-primary btn-sm"
                                >
                                    leads
                                </Link>
                                <Link
                                    to={`/app/crm/leads/${this.state.lead.id}`}
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

export default React.memo(Page);
