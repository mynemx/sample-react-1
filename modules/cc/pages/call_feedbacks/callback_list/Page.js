// import libs
import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import SearchText from "../../../../../utils/SearchText";
import SearchCheckbox from "../../../../../utils/SearchCheckbox";
import SearchDate from "../../../../../utils/SearchDate";
import { feedbackCallbacksRequest, feedbackRemoveRequest } from "../service";

// import components
import TableRow from "./components/TableRow";
import EditFeedbackModal from "./components/EditFeedbackModal";
import Pagination from "../../../../../utils/Pagination";
import { Link } from "react-router-dom";
import { authPageLoading } from "../../../../auth/store/actions";

class Page extends PureComponent {
    static displayName = "CallFeedbackPage";
    static propTypes = {
        callBacks: PropTypes.array.isRequired,
        dispatch: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            showFilter: false,
            user: this.props.user,
            socket: this.props.socket,
            feedback: null,
            direction: [{ name: "IN" }, { name: "OUT" }],
            isModalOpen: false,
            filter: {
                name: "",
                user: [],
                direction: [],
                actionSchedule: "",
                limits: 200
            }
        };

        this.handleChecked = this.handleChecked.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.toggleFilter = this.toggleFilter.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.pageChange = this.pageChange.bind(this);
    }

    componentWillMount() {
        const { dispatch, user } = this.props;
        dispatch(authPageLoading(false));
        this.loadCallback(user);
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const user = nextProps.user;
        if (!_.isEqual(this.state.user, user)) {
            this.setState({ user });
            if (user) {
                this.loadCallback(user);
            }
        }
    }

    loadCallback(user) {
        if (user.id) {
            if (
                user.roles.find(
                    obj => obj.name.toLowerCase() === "admininistrator"
                ) ||
                user.roles.find(obj => obj.name.toLowerCase() === "supervisor")
            ) {
                const filter = Object.assign(
                    {},
                    {
                        ...this.state.filter,
                        loader: this.props.callBacks.length < 5 ? true : false
                    }
                );
                this.props.dispatch(feedbackCallbacksRequest(filter));
            } else {
                const filter = Object.assign(
                    {},
                    {
                        ...this.state.filter,
                        user: [user.id],
                        loader: this.props.callBacks.length < 5 ? true : false
                    }
                );
                this.setState({ filter });
                this.props.dispatch(feedbackCallbacksRequest(filter));
            }
        }
    }

    handleRemove(id) {
        this.props.dispatch(feedbackRemoveRequest(id));
    }

    pageChange(pageNumber = 1) {
        const form = Object.assign({}, { ...this.state.filter, pageNumber });
        this.props.dispatch(feedbackCallbacksRequest(form));
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

    handleModalOpen = feedback => {
        this.setState((prevState, props) => {
            return { isModalOpen: !prevState.isModalOpen, feedback };
        });
    };

    dismissable = () => {
        this.setState({
            isModalOpen: false,
            feedback: null
        });
    };

    toggleFilter() {
        this.setState({ showFilter: !this.state.showFilter });
    }

    handleCall = feedback => {
        const { socket } = this.props;
        const call = {
            number: feedback.phonenumber,
            name: feedback.name,
            agent: feedback.agent,
            channel: `Sip/${feedback.agent}`
        };
        socket.emit("call-channel", call);
    };

    renderTableRows() {
        return this.props.callBacks.map((callFeedback, index) => {
            return (
                <TableRow
                    key={callFeedback.id}
                    callFeedback={callFeedback}
                    user={this.props.user}
                    handleRemove={this.handleRemove}
                    handleCall={this.handleCall}
                    handleModalOpen={this.handleModalOpen}
                    index={index}
                />
            );
        });
    }

    renderFilter() {
        const { filter, direction } = this.state;
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
                        options={direction}
                        field="id"
                        value={filter.direction}
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
                        label="Action Schedule"
                        name="actionSchedule"
                        value={filter.actionSchedule}
                        onChange={this.handleChange}
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
                        <Link to="/app/contact-center/call-backs">
                            {" "}
                            Callback Diary ({this.props.meta.total})
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

                            {this.state.feedback && (
                                <EditFeedbackModal
                                    show={this.state.isModalOpen}
                                    onHide={this.dismissable}
                                    feedback={this.state.feedback}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </main>
        );
    }
}

export default React.memo(Page);
