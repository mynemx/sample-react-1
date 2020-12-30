// import libs
import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import SearchText from "../../../../../utils/SearchText";
import SearchDropdown from "../../../../../utils/SearchDropdown";
import SearchCheckbox from "../../../../../utils/SearchCheckbox";
import { campaignListRequest, campaignRemoveRequest } from "../service";

// import components
import TableRow from "./components/TableRow";
import Pagination from "../../../../../utils/Pagination";
import { Link } from "react-router-dom";
import { authPageLoading } from "../../../../auth/store/actions";

class Page extends PureComponent {
    static displayName = "CampaignsPage";
    static propTypes = {
        campaigns: PropTypes.array.isRequired,
        dispatch: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            showFilter: false,
            listTypes: [
                { name: "Company" },
                { name: "Contact" },
                { name: "Lead" },
                { name: "List" }
            ],
            filter: {
                name: "",
                listType: "",
                user: [],
                limits: 20
            }
        };

        this.handleChecked = this.handleChecked.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.toggleFilter = this.toggleFilter.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.pageChange = this.pageChange.bind(this);
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(authPageLoading(false));
        const form = Object.assign(
            {},
            {
                ...this.state.filter,
                loader: false
            }
        );
        dispatch(campaignListRequest(form));
    }

    handleRemove(id) {
        this.props.dispatch(campaignRemoveRequest(id));
    }

    pageChange(pageNumber = 1) {
        const form = Object.assign({}, { ...this.state.filter, pageNumber });
        this.props.dispatch(campaignListRequest(form));
        this.setState({ showFilter: false });
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

    renderCampaigns() {
        return this.props.campaigns.map((campaign, index) => {
            return (
                <TableRow
                    key={campaign.id}
                    campaign={campaign}
                    index={index}
                    handleRemove={this.handleRemove}
                />
            );
        });
    }
    renderFilter() {
        const { filter } = this.state;
        const { users } = this.props;
        return (
            <div className="row">
                <div className="floating-label col">
                    <SearchText
                        label="Title"
                        name="title"
                        value={filter.title}
                        onChange={this.handleChange}
                    />
                </div>

                <div className="floating-label col">
                    <SearchDropdown
                        label="Recipient Type"
                        name="listType"
                        value={filter.listType}
                        displayField="name"
                        field="name"
                        list={this.state.listTypes}
                        onChange={this.handleChange}
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
    render() {
        return (
            <main className="page-container" role="main">
                <ol className="breadcrumb">
                    <li>
                        <Link to="/app/contact-center"> Contact Center </Link>
                    </li>
                    <li className="active">
                        <Link to="/app/contact-center/campaigns">
                            {" "}
                            Campaigns ({this.props.meta.total})
                        </Link>
                    </li>
                </ol>
                <div className="page-content">
                    <div className="card">
                        <div className="card-header">
                            <div className="card-title">
                                Campaigns ({this.props.meta.count})
                            </div>
                            <div className="heading-elements">
                                <Link
                                    to="campaigns/add"
                                    className="btn btn-primary btn-sm"
                                >
                                    Add Campaign
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
                                            <th>Title</th>
                                            <th>Type</th>
                                            <th>Recipient Type</th>
                                            <th>Agent</th>
                                            <th>Recipients</th>
                                            <th>Called</th>
                                            <th>Pending</th>
                                            <th>Status</th>
                                            <th>Completion Status</th>
                                            <th>Sales Rep</th>
                                            <th>Date</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>{this.renderCampaigns()}</tbody>
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
