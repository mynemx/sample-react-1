// import libs
import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import SearchText from "../../../../../utils/SearchText";
import SearchCheckbox from "../../../../../utils/SearchCheckbox";
import { campaignListListRequest, campaignListRemoveRequest } from "../service";

// import components
import TableRow from "./components/TableRow";
import Pagination from "../../../../../utils/Pagination";
import { Link } from "react-router-dom";
import { authPageLoading } from "../../../../auth/store/actions";

class Page extends PureComponent {
    static displayName = "ContactsPage";
    static propTypes = {
        campaignLists: PropTypes.array.isRequired,
        dispatch: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            showFilter: false,
            filter: {
                name: "",
                location: "",
                category: [],
                type: [],
                industry: [],
                limits: 50
            }
        };

        this.handleChecked = this.handleChecked.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.toggleFilter = this.toggleFilter.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.pageChange = this.pageChange.bind(this);
    }

    componentDidMount() {
        const { dispatch, campaignLists } = this.props;
        dispatch(authPageLoading(false));
        const form = Object.assign(
            {},
            {
                ...this.state.filter,
                loader: campaignLists.length < 5 ? true : false
            }
        );
        dispatch(campaignListListRequest(form));
    }

    handleRemove(id) {
        this.props.dispatch(campaignListRemoveRequest(id));
    }

    pageChange(pageNumber = 1) {
        const form = Object.assign({}, { ...this.state.filter, pageNumber });
        this.props.dispatch(campaignListListRequest(form));
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

    renderTableRows() {
        return this.props.campaignLists.map((campaignList, index) => {
            return (
                <TableRow
                    key={campaignList.id}
                    campaignList={campaignList}
                    index={index}
                    handleRemove={this.handleRemove}
                />
            );
        });
    }

    renderFilter() {
        const { filter } = this.state;
        return (
            <div className="row">
                <div className="floating-label col">
                    <SearchText
                        label="Name"
                        name="name"
                        value={filter.name}
                        onChange={this.handleChange}
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
                        <Link to="/app/contact-center/campaign-lists">
                            {" "}
                            Campaign List ({this.props.meta.total})
                        </Link>
                    </li>
                </ol>
                <div className="page-content">
                    <div className="card">
                        <div className="card-header">
                            <div className="card-title">
                                Campaign Lists ({this.props.meta.count})
                            </div>
                            <div className="heading-elements">
                                <Link
                                    to="campaign-lists/add"
                                    className="btn btn-primary btn-sm"
                                >
                                    Add Campaign List
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
                                            <th>Description</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>{this.renderTableRows()}</tbody>
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

export default Page;
