// import libs
import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import SearchText from "../../../../../utils/SearchText";
import SearchCheckbox from "../../../../../utils/SearchCheckbox";
import { leadListRequest, leadRemoveRequest } from "../service";

// import components
import LeadRow from "./components/LeadRow";
import Pagination from "../../../../../utils/Pagination";
import { Link } from "react-router-dom";

class Page extends PureComponent {
    static displayName = "UsersPage";
    static propTypes = {
        leads: PropTypes.array.isRequired,
        dispatch: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            showFilter: false,
            gender: [{ name: "Male" }, { name: "Female" }],
            loading: true,
            filter: {
                name: "",
                location: "",
                status: [],
                gender: [],
                user: [],
                industry: [],
                source: [],
                limits: 100
            }
        };

        this.handleChecked = this.handleChecked.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.toggleFilter = this.toggleFilter.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.pageChange = this.pageChange.bind(this);
    }

    componentDidMount() {
        const { dispatch, leads } = this.props;
        const form = Object.assign(
            {},
            { ...this.state.filter, loader: leads.length < 5 ? true : false }
        );
        dispatch(leadListRequest(form));
    }

    pageChange(pageNumber) {
        const form = Object.assign({}, { ...this.state.filter, pageNumber });
        this.props.dispatch(leadListRequest(form));
        this.setState({ showFilter: false });
    }

    handleRemove(id) {
        this.props.dispatch(leadRemoveRequest(id));
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

    toggleFilter() {
        this.setState({ showFilter: !this.state.showFilter });
    }

    renderFilter() {
        const { filter, gender } = this.state;
        const { users, leadStatuses, sources, industries } = this.props;
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
                        label="Lead Status"
                        name="status"
                        options={leadStatuses}
                        field="id"
                        value={filter.status}
                        onChange={this.handleChecked}
                        displayField="name"
                    />
                </div>
                <div className="floating-label col">
                    <SearchCheckbox
                        label="User"
                        name="user"
                        options={users}
                        field="id"
                        value={filter.user}
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
                    <SearchCheckbox
                        label="Source"
                        name="source"
                        options={sources}
                        field="name"
                        value={filter.source}
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

    renderLeads() {
        return this.props.leads.map((lead, index) => {
            return (
                <LeadRow
                    key={index}
                    lead={lead}
                    index={index}
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
                        <Link to="/app/crm">CRM</Link>
                    </li>
                    <li>
                        <Link to="/app/crm/leads">
                            leads({this.props.meta.total})
                        </Link>
                    </li>
                </ol>
                <div className="page-content">
                    <div className="card">
                        <div className="card-header">
                            <div className="card-title">
                                Leads({this.props.meta.count})
                            </div>
                            <div className="heading-elements">
                                <Link
                                    to="/app/crm/leads/add"
                                    className="btn btn-primary btn-sm"
                                >
                                    Add Lead
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
                                <table className="table table-striped table-sm">
                                    <thead className="">
                                        <tr>
                                            <th>#</th>
                                            <th>Name</th>
                                            <th>Status</th>
                                            <th>Phone</th>
                                            <th>Email</th>
                                            <th>Gender</th>
                                            <th>Location</th>
                                            <th>Source</th>
                                            <th>Industry</th>
                                            <th>Sales Rep</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>{this.renderLeads()}</tbody>
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
