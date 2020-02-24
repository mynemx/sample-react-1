// import libs
import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Modal, Button } from "react-bootstrap";
import Form from "./components/Form";
import ReeValidate from "ree-validate";
import { companyAddRequest } from "../service";
import { showNotification } from "../../../../../utils/Notification";
import Company from "../../../models/Company";

// import components
import { Link } from "react-router-dom";

class AddCompanyModal extends Component {
    static displayName = "UsersPage";
    static propTypes = {
        company: PropTypes.object.isRequired,
        users: PropTypes.array.isRequired,
        companyCategories: PropTypes.array.isRequired,
        companyTypes: PropTypes.array.isRequired,
        sources: PropTypes.array.isRequired,
        currencies: PropTypes.array.isRequired,
        employeeSizes: PropTypes.array.isRequired,
        countries: PropTypes.array.isRequired,
        industries: PropTypes.array.isRequired,
        dispatch: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.validator = new ReeValidate({
            name: "required|min:3",
            companyTypeId: "required",
            companyCategoryId: "required",
            salesRepId: "required",
            currencyId: "required",
            companySize: "",
            postal: "max:200",
            website: "max:200",
            address: "max:200",
            city: "max:200",
            note: "max:200",
            source: "max:200",
            location: "max:200",
            state: "max:200",
            country: "max:200",
            deliveryAddress: "max:200",
            industryId: "required",
            email: "required|min:10",
            phone: "required|min:10|max:16"
        });

        const company = this.props.company.toJson();
        const {
            users,
            employeeSizes,
            companyCategories,
            companyTypes,
            sources,
            industries,
            countries,
            currencies
        } = this.props;

        this.state = {
            company,
            companyTypes,
            users,
            companyCategories,
            sources,
            employeeSizes,
            industries,
            countries,
            currencies,
            errors: this.validator.errors
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const company = nextProps.company.toJson();
        const {
            users,
            employeeSizes,
            companyCategories,
            companyTypes,
            sources,
            industries,
            countries,
            currencies
        } = nextProps;

        if (!_.isEqual(this.state.company, company)) {
            this.setState({ company });
        }
        this.setState({
            companyTypes,
            users,
            companyCategories,
            sources,
            employeeSizes,
            countries,
            industries,
            currencies
        });
    }

    handleChange(name, value) {
        const { errors } = this.validator;
        const company = Object.assign(
            {},
            { ...this.state.company, [name]: value }
        );

        this.setState({ company });

        errors.remove(name);

        this.validator.validate(name, value).then(() => {
            this.setState({ errors });
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        const company = this.state.company;
        const { errors } = this.validator;

        this.validator.validateAll(company).then(success => {
            if (success) {
                this.submit(company);
            } else {
                this.setState({ errors });
            }
        });
    }

    submit(company) {
        this.props
            .dispatch(companyAddRequest(company))
            .then(msg => {
                const company = new Company({});
                showNotification(msg, "success");
                this.setState({ company });
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
            <Modal
                show={this.props.show}
                onHide={this.props.onHide}
                call={this.props.call}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title
                        style={{ fontSize: "1em" }}
                        id="contained-modal-title-vcenter"
                    >
                        Call Feedbacks
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form
                        {...this.state}
                        onChange={this.handleChange}
                        onSubmit={this.handleSubmit}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

const mapStateToProps = state => {
    //   const {data, ...meta} = state.administration.users
    const company = new Company({});
    const users = state.administration.users;
    const departments = state.settings.departments || [];
    const companyCategories = state.settings.companyCategories || [];
    const companyTypes = state.settings.companyTypes || [];
    const sources = state.settings.sources || [];
    const currencies = state.settings.currencies || [];
    const employeeSizes = state.settings.employeeSizes || [];
    const countries = state.settings.countries || [];
    const industries = state.settings.industries || [];

    return {
        company,
        users,
        departments,
        companyCategories,
        companyTypes,
        sources,
        currencies,
        industries,
        countries,
        employeeSizes
    };
};

export default connect(mapStateToProps)(AddCompanyModal);
