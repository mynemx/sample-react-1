import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { NavLink, Link, Switch, Route, Router } from "react-router-dom";
import { companyEditRequest, companyRemoveRequest } from "../service";
import { contactRequest, orderRequest } from "../../../service";
import { feedbackRequest } from "../../../../cc/service";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { authPageLoading } from "../../../../auth/store/actions";

// import components
import CompanyDetails from "./components/CompanyDetails";
import ContactList from "./components/ContactList";
import OrderList from "./components/OrderList";
import Conversation from "./components/Conversation";
import { showNotification } from "../../../../../utils/Notification";
import Contact from "../../../models/Contact";
import Order from "../../../models/Order";

class Page extends PureComponent {
    static displayName = "UsersPage";
    static propTypes = {
        company: PropTypes.object.isRequired,
        match: PropTypes.object.isRequired,
        dispatch: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        const company = this.props.company.toJson();
        this.state = {
            company,
            contacts: [],
            orders: [],
            feedbacks: [],
            calls: []
        };

        this.handleRemove = this.handleRemove.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(authPageLoading(false));
        this.loadCompany();
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const company = nextProps.company.toJson();

        if (!_.isEqual(this.state.company, company) && !this.state.company.id) {
            this.setState({ company });
            this.loadData(company);
        }
    }

    loadCompany() {
        const { match, company, dispatch } = this.props;

        if (!company.id) {
            dispatch(companyEditRequest(match.params.id)).catch(
                ({ error, statusCode }) => {
                    showNotification(error, "error");
                    if (statusCode == 404) {
                        this.props.history.push("/app/crm/companies");
                    }
                }
            );
        }
        this.loadData(company);
    }

    loadData(company) {
        const { match, dispatch } = this.props;

        dispatch(
            contactRequest({ companyId: match.params.id, limits: 100 })
        ).then(data => {
            this.setState({
                contacts: data.map(contact => new Contact(contact))
            });
        });
        dispatch(
            orderRequest({ companyId: match.params.id, limits: 100 })
        ).then(data => {
            this.setState({ orders: data.map(order => new Order(order)) });
        });
        dispatch(feedbackRequest({ phone: company.phone, limits: 100 })).then(
            data => {
                this.setState({ feedbacks: data });
            }
        );
    }

    handleRemove(id) {
        this.props.dispatch(companyRemoveRequest(id)).then(() => {
            this.props.history.push("/app/crm/companies");
        });
    }

    renderDetails = () => (
        <CompanyDetails {...this.state} handleRemove={this.handleRemove} />
    );

    renderContact = () => (
        <ContactList {...this.state} dispatch={this.props.dispatch} />
    );

    renderConversation = () => (
        <Conversation {...this.state} dispatch={this.props.dispatch} />
    );

    renderOrder = () => (
        <OrderList {...this.state} dispatch={this.props.dispatch} />
    );

    render() {
        return (
            <main className="page-container" role="main">
                <ol className="breadcrumb">
                    <li>
                        <Link to="/app/crm">CRM</Link>
                    </li>
                    <li>
                        <Link to="/app/crm/companies">Companies</Link>
                    </li>
                    <li className="active">Details</li>
                </ol>
                <div className="page-content">
                    <div className="row">
                        <div className="col-xs-12 col-sm-5 col-md-4 col-lg-3 ">
                            <div className="card ">
                                <div className="card-img-top">
                                    <div className="text-center h4 mt-2">
                                        {this.state.company.name}
                                    </div>
                                    {this.state.company.logo == undefined ? (
                                        <div className="profile-image my-1">
                                            {this.state.company.initials}
                                        </div>
                                    ) : (
                                        <div className="text-center">
                                            <img
                                                style={{
                                                    width: "150px",
                                                    height: "150px",
                                                    borderRadius: "200px"
                                                }}
                                                className="border border-black rounded-circle img-fluid"
                                                src={this.state.company.logo}
                                            />
                                        </div>
                                    )}
                                </div>
                                <div className="card-body px-0">
                                    <ul className="navigation">
                                        <li className="navigation-header">
                                            Navigation
                                        </li>

                                        <li>
                                            <NavLink
                                                exact
                                                to={`${this.props.match.url}`}
                                            >
                                                <MoreVertIcon />
                                                Details
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink
                                                to={`${this.props.match.url}/contacts`}
                                            >
                                                <MoreVertIcon />
                                                Contacts
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink
                                                to={`${this.props.match.url}/orders`}
                                            >
                                                <MoreVertIcon />
                                                Orders
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink
                                                to={`${this.props.match.url}/conversations`}
                                            >
                                                <MoreVertIcon />
                                                Conversations
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink
                                                to={`${this.props.match.url}/calls`}
                                            >
                                                <MoreVertIcon />
                                                Calls
                                            </NavLink>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="col-xs-12 col-sm-7 col-md-8 col-lg-9 ">
                            <Switch>
                                <Route
                                    exact
                                    path={`${this.props.match.path}`}
                                    render={this.renderDetails}
                                />

                                <Route
                                    exact
                                    path={`${this.props.match.path}/contacts`}
                                    render={this.renderContact}
                                />
                                <Route
                                    exact
                                    path={`${this.props.match.path}/orders`}
                                    render={this.renderOrder}
                                />
                                <Route
                                    exact
                                    path={`${this.props.match.path}/conversations`}
                                    render={this.renderConversation}
                                />
                            </Switch>
                        </div>
                    </div>
                </div>
            </main>
        );
    }
}

export default React.memo(Page);
