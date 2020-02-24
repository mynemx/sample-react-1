import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { NavLink, Link, Switch, Route, Router } from "react-router-dom";
import { contactEditRequest, contactRemoveRequest } from "../service";
import { orderRequest } from "../../../service";
import { feedbackRequest } from "../../../../cc/service";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { showNotification } from "../../../../../utils/Notification";
import { authPageLoading } from "../../../../auth/store/actions";

// import components
import ContactDetails from "./components/Details";
import ContactList from "./components/ContactList";
import OrderList from "./components/OrderList";
import Conversation from "./components/Conversation";
import Contact from "../../../models/Contact";
import Order from "../../../models/Order";

class Page extends PureComponent {
    static displayName = "UsersPage";
    static propTypes = {
        contact: PropTypes.object.isRequired,
        match: PropTypes.object.isRequired,
        dispatch: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        const contact = this.props.contact.toJson();
        this.state = {
            contact,
            orders: [],
            feedbacks: []
        };
        this.handleRemove = this.handleRemove.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(authPageLoading(false));
        this.loadContact();
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const contact = nextProps.contact.toJson();

        if (!_.isEqual(this.state.contact, contact) && !this.state.contact.id) {
            this.setState({ contact });
            this.loadData(contact);
        }
    }

    loadContact() {
        const { match, contact, dispatch } = this.props;

        if (!contact.id) {
            dispatch(contactEditRequest(match.params.id)).catch(
                ({ error, statusCode }) => {
                    if (statusCode === 404) {
                        showNotification(error, "error");
                        this.props.history.push(`/app/crm/contacts`);
                    }
                }
            );
        }
    }

    loadData(contact) {
        const { match, dispatch } = this.props;

        dispatch(
            orderRequest({ contactId: match.params.id, limits: 100 })
        ).then(data => {
            this.setState({ orders: data.map(order => new Order(order)) });
        });
        dispatch(feedbackRequest({ phone: contact.phone, limits: 100 })).then(
            data => {
                this.setState({ feedbacks: data });
            }
        );
    }

    handleRemove(id) {
        this.props.dispatch(contactRemoveRequest(id)).then(() => {
            this.props.history.push(`/app/crm/contacts`);
        });
    }

    renderDetails = () => (
        <ContactDetails {...this.state} handleRemove={this.handleRemove} />
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
                        <Link to="/app/crm/contacts">Contacts</Link>
                    </li>
                    <li className="active">Details</li>
                </ol>
                <div className="page-content">
                    <div className="row">
                        <div className="col-xs-12 col-sm-5 col-md-4 col-lg-3">
                            <div className="card ">
                                <div className="card-img-top">
                                    <div className="text-center mt-2">
                                        {this.state.contact.name}
                                    </div>
                                    {this.state.contact.photo == undefined ? (
                                        <div className="profile-image">
                                            {this.state.contact.initials}
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
                                                src={this.state.contact.photo}
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
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="col-xs-12 col-sm-7 col-md-8 col-lg-9">
                            <Switch>
                                <Route
                                    exact
                                    path={`${this.props.match.path}`}
                                    render={this.renderDetails}
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
