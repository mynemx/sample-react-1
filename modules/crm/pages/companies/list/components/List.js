// import libs
import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import ReeValidate from "ree-validate";
import SearchText from "../../../../../../utils/SearchText";
import SearchCheckbox from "../../../../../../utils/SearchCheckbox";
import {
    companyListRequest,
    companyArchiveRequest,
    companyMigrateAsContactRequest,
    companyMigrateAsLeadRequest,
    companyRemoveRequest
} from "../../service";

// import components
import CompanyRow from "./CompanyRow";
import Form from "./Form";
import Pagination from "../../../../../../utils/Pagination";
import { Link } from "react-router-dom";
import { authPageLoading } from "../../../../../auth/store/actions";

class List extends PureComponent {
    static displayName = "CompaniesPage";
    static propTypes = {
        companies: PropTypes.array.isRequired,
        dispatch: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.validator = new ReeValidate({
            name: "required|min:3"
        });

        this.state = {
            showFilter: false,
            showImport: false,
            mode: "",
            filter: {
                name: "",
                location: "",
                category: [],
                type: [],
                industry: [],
                limits: 200
            }
        };

        this.handleChecked = this.handleChecked.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleArchive = this.handleArchive.bind(this);
        this.toggleFilter = this.toggleFilter.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.pageChange = this.pageChange.bind(this);
    }

    componentDidMount() {
        const { dispatch, companies } = this.props;
        const form = Object.assign(
            {},
            {
                ...this.state.filter,
                loader: companies.length < 5 ? true : false
            }
        );
        dispatch(companyListRequest(form));
    }

    pageChange(pageNumber = 1) {
        const form = Object.assign({}, { ...this.state.filter, pageNumber });

        this.props.dispatch(companyListRequest(form));
        this.setState({ showFilter: false, mode: "" });
    }

    handleRemove(id) {
        this.props.dispatch(companyRemoveRequest(id));
    }

    handleArchive(id) {
        this.props.dispatch(companyArchiveRequest(id));
    }

    handleMigrateAsContact = id => {
        this.props
            .dispatch(companyMigrateAsContactRequest(id))
            .then(data => {});
    };

    handleMigrateAsLead = id => {
        this.props.dispatch(companyMigrateAsLeadRequest(id)).then(data => {});
    };

    handleChange(name, value) {
        const filter = Object.assign(
            {},
            { ...this.state.filter, [name]: value }
        );
        this.setState({ filter });
    }

    handleChecked(name, value, status) {
        if (status) {
            const obj = [...this.state.filter[name], value];
            const filter = Object.assign(
                {},
                { ...this.state.filter, [name]: obj }
            );
            this.setState({ filter });
        } else {
            const obj = this.state.filter[name].filter(item => item !== value);
            const filter = Object.assign(
                {},
                { ...this.state.filter, [name]: obj }
            );
            this.setState({ filter });
        }
    }

    toggleFilter() {
        const mode = !this.state.showFilter ? "filter" : "";
        this.setState({
            showFilter: !this.state.showFilter,
            showImport: false,
            mode
        });
    }

    toggleImport() {
        const mode = !this.state.showImport ? "import" : "";
        this.setState({
            showImport: !this.state.showImport,
            showFilter: false,
            mode
        });
    }

    renderCompanies() {
        return this.props.companies.map((company, index) => {
            return (
                <CompanyRow
                    key={company.id}
                    company={company}
                    index={index}
                    handleMigrateAsContact={this.handleMigrateAsContact}
                    handleMigrateAsLead={this.handleMigrateAsLead}
                    handleRemove={this.handleRemove}
                    handleArchive={this.handleArchive}
                />
            );
        });
    }

    renderFilter() {
        const { filter } = this.state;
        const { companyTypes, companyCategories, industries } = this.props;
        return (
            <div className="row">
                <div className="floating-label col">
                    <SearchText
                        label="Name/Phonenumber"
                        name="name"
                        value={filter.name}
                        onChange={this.handleChange}
                    />
                </div>

                <div className="floating-label col">
                    <SearchText
                        label="Location"
                        name="location"
                        value={filter.location}
                        onChange={this.handleChange}
                    />
                </div>
                <div className="floating-label col">
                    <SearchCheckbox
                        label="Type"
                        name="type"
                        options={companyTypes}
                        field="id"
                        value={filter.type}
                        onChange={this.handleChecked}
                        displayField="name"
                    />
                </div>
                <div className="floating-label col">
                    <SearchCheckbox
                        label="Category"
                        name="category"
                        options={companyCategories}
                        field="id"
                        value={filter.category}
                        onChange={this.handleChecked}
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
                        onChange={this.handleChecked}
                        displayField="name"
                    />
                </div>
                <div className="floating-label col">
                    <SearchText
                        label="Limit"
                        name="limits"
                        value={filter.limits}
                        onChange={this.handleChange}
                    />
                </div>
                <div className="floating-label col">
                    <button
                        onClick={e => this.pageChange(1)}
                        type="button"
                        className="btn btn-sm btn-primary"
                    >
                        Filter
                    </button>
                </div>
            </div>
        );
    }

    topRender() {
        switch (this.state.mode) {
            case "filter":
                return this.renderFilter();
                break;
            case "import":
                return <Form {...this.props} />;
                break;
            default:
                return "";
                break;
        }
    }

    render() {
        return (
            <div className="card">
                <div className="card-header">
                    <div className="card-title">
                        Companies ({this.props.meta.count})
                    </div>
                    <div className="heading-elements">
                        <Link
                            to="companies/add"
                            className="btn btn-primary btn-sm"
                        >
                            Add Company
                        </Link>
                        <button
                            className="btn btn-primary btn-sm"
                            onClick={e => this.toggleFilter()}
                        >
                            Filter
                        </button>
                        <button
                            className="btn btn-primary btn-sm"
                            onClick={e => this.toggleImport()}
                        >
                            Import
                        </button>
                    </div>
                </div>
                <div className="card-body">
                    {this.topRender()}
                    <div className="table-responsive">
                        <table className="table table-hover table-sm">
                            <thead className="">
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Type</th>
                                    <th>Category</th>
                                    <th>Phone</th>
                                    <th>Email</th>
                                    <th>Location</th>
                                    <th>Sales Rep</th>
                                    <th>Industry</th>
                                    <th>Source</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>{this.renderCompanies()}</tbody>
                        </table>
                    </div>
                    <Pagination
                        meta={this.props.meta}
                        onChange={this.pageChange}
                    />
                </div>
            </div>
        );
    }
}

export default List;
