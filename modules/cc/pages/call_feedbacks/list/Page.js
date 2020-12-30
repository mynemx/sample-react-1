// import libs
import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import SearchText from "../../../../../utils/SearchText";
import SearchCheckbox from "../../../../../utils/SearchCheckbox";
import SearchDate from "../../../../../utils/SearchDate";
import { feedbackListRequest } from "../service";

// import components
import TableRow from "./components/TableRow";
import Pagination from "../../../../../utils/Pagination";
import { Link } from "react-router-dom";
import { authPageLoading } from "../../../../auth/store/actions";

class Page extends PureComponent {
    static displayName = "CallFeedbackPage";
    static propTypes = {
        callFeedbacks: PropTypes.array.isRequired,
        dispatch: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            showFilter: false,
            columns: [],
            actions: [
                { name: "Ordered" },
                { name: "In Stock" },
                { name: "Prospect" },
                { name: "Consented" },
                { name: "Non-committal" },
                { name: "Call back" },
                { name: "No answer" },
                { name: "Number busy" },
                { name: "Hung up" },
                { name: "Not Available" },
                { name: "Failed Connection" },
                { name: "Wrong Number" },
                { name: "Answering Machine" },
                { name: "Not Interested" },
                { name: "Abject Refusal" },
                { name: "Language Barrier" }
            ],
            direction: [{ name: "IN" }, { name: "OUT" }],
            filter: {
                name: "",
                action: [],
                direction: [],
                user: [],
                phone: "",
                date: moment(new Date()).format("YYYY-MM-DD"),
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
        const { dispatch } = this.props;
        dispatch(authPageLoading(false));
        const form = Object.assign(
            {},
            {
                ...this.state.filter,
                loader: this.props.callFeedbacks.length < 5 ? true : false
            }
        );
        dispatch(feedbackListRequest(form));
    }

    handleRemove(id) {
        // this.props.dispatch(campaignListRemoveRequest(id));
    }

    pageChange(pageNumber = 1) {
        const form = Object.assign({}, { ...this.state.filter, pageNumber });
        this.props.dispatch(feedbackListRequest(form));
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
        return this.props.callFeedbacks.map((callFeedback, index) => {
            return (
                <TableRow
                    key={callFeedback.id}
                    callFeedback={callFeedback}
                    index={index}
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
                        label="Name"
                        name="name"
                        value={filter.name}
                        onChange={this.handleChange}
                    />
                </div>

                <div className="floating-label col">
                    <SearchCheckbox
                        label="Direction"
                        name="direction"
                        options={this.state.direction}
                        field="name"
                        value={filter.direction}
                        onChange={this.handleChecked}
                        displayField="name"
                    />
                </div>
                <div className="floating-label col">
                    <SearchCheckbox
                        label="Action"
                        name="action"
                        options={this.state.actions}
                        field="name"
                        value={filter.action}
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
                    <SearchDate
                        label="Date"
                        name="date"
                        value={filter.date}
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
                        <Link to="/app/contact-center/call-feedbacks">
                            {" "}
                            Call Feedbacks ({this.props.meta.total})
                        </Link>
                    </li>
                </ol>
                <div className="page-content">
                    <div className="card">
                        <div className="card-header">
                            <div className="card-title">
                                Call Feedbacks({this.props.meta.count})
                            </div>
                            <div className="heading-elements">
                                <button
                                    className="btn btn-primary btn-sm"
                                    onClick={e => this.toggleFilter()}
                                >
                                    Filter
                                </button>
                            </div>
                        </div>
                        <div className="card-body p0">
                            {this.state.showFilter ? this.renderFilter() : ""}
                            <div className="table-responsive">
                                <table className="table table-hover table-sm">
                                    <thead className="">
                                        <tr>
                                            <th>#</th>
                                            <th>Name</th>
                                            <th>Number</th>
                                            <th>Direction</th>
                                            <th>User</th>
                                            <th>Response</th>
                                            <th>Response Details</th>
                                            <th>Response Schedule</th>
                                            <th>Date</th>
                                            <th>Action</th>
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

export default React.memo(Page);
