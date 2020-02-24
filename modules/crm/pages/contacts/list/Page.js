// import libs
import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import SearchText from "../../../../../utils/SearchText";
import SearchCheckbox from "../../../../../utils/SearchCheckbox";
import {
    contactListRequest,
    contactMigrateAsCompanyRequest,
    contactMigrateAsLeadRequest,
    contactRemoveRequest
} from "../service";

// import components
import ContactRow from "./components/ContactRow";
import Pagination from "../../../../../utils/Pagination";
import { Link } from "react-router-dom";

class Page extends PureComponent {
    static displayName = "ContactsPage";
    static propTypes = {
        contacts: PropTypes.array.isRequired,
        dispatch: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            showFilter: false,
            loading: true,
            gender: [{ name: "Male" }, { name: "Female" }],
            filter: {
                name: "",
                location: "",
                category: [],
                type: [],
                gender: [],
                source: [],
                limits: 200
            }
        };

        this.handleChecked = this.handleChecked.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.toggleFilter = this.toggleFilter.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.pageChange = this.pageChange.bind(this);
    }

    componentDidMount() {
        const { dispatch, contacts } = this.props;

        const form = Object.assign(
            {},
            { ...this.state.filter, loader: contacts.length < 5 ? true : false }
        );
        dispatch(contactListRequest(form));
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        this.setState({ location: false });
    }

    pageChange(pageNumber = 1) {
        const form = Object.assign({}, { ...this.state.filter, pageNumber });
        this.props.dispatch(contactListRequest(form));
        this.setState({ showFilter: false });
    }

    handleRemove(id) {
        this.props.dispatch(contactRemoveRequest(id));
    }

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

    handleMigrateAsLead = id => {
        this.props.dispatch(contactMigrateAsLeadRequest(id)).then(data => {});
    };

    handleMigrateAsCompany = id => {
        this.props
            .dispatch(contactMigrateAsCompanyRequest(id))
            .then(data => {});
    };

    toggleFilter() {
        this.setState({ showFilter: !this.state.showFilter });
    }

    renderFilter() {
        const { filter, gender } = this.state;
        const { contactTypes, contactCategories, sources } = this.props;
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
                        options={contactTypes}
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
                        options={contactCategories}
                        field="id"
                        value={filter.category}
                        onChange={this.handleChecked}
                        displayField="name"
                    />
                </div>
                <div className="floating-label col">
                    <SearchCheckbox
                        label="Gender"
                        name="gender"
                        options={gender}
                        field="name"
                        value={filter.gender}
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

    renderContacts() {
        return this.props.contacts.map((contact, index) => {
            return (
                <ContactRow
                    key={contact.id}
                    contact={contact}
                    index={index}
                    handleMigrateAsCompany={this.handleMigrateAsCompany}
                    handleMigrateAsLead={this.handleMigrateAsLead}
                    handleRemove={this.handleRemove}
                />
            );
        });
    }

    render() {
        return (
            <main className="page-container" role="main">
                <ol className="breadcrumb">
                    <li>
                        <Link to="/app/crm"> CRM </Link>
                    </li>
                    <li className="active">
                        <Link to="/app/crm/contacts">
                            {" "}
                            Contacts ({this.props.meta.total})
                        </Link>
                    </li>
                </ol>
                <div className="page-content">
                    <div className="card">
                        <div className="card-header">
                            <div className="card-title">
                                Contacts ({this.props.meta.count})
                            </div>
                            <div className="heading-elements">
                                <Link
                                    to="contacts/add"
                                    className="btn btn-primary btn-sm"
                                >
                                    Add Contact
                                </Link>

                                <button
                                    className="btn btn-primary btn-sm"
                                    onClick={e => this.toggleFilter()}
                                >
                                    Filter
                                </button>
                            </div>
                        </div>
                        <div className="card-body">
                            {this.state.showFilter ? this.renderFilter() : ""}
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
                                            <th>Gender</th>
                                            <th>Position</th>
                                            <th>Location</th>
                                            <th>Sales Rep</th>
                                            <th>Source</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>{this.renderContacts()}</tbody>
                                </table>
                            </div>
                            <Pagination
                                meta={this.props.meta}
                                onChange={this.pageChange}
                            />
                        </div>
                    </div>
                </div>
            </main>
        );
    }
}

export default React.memo(Page);
