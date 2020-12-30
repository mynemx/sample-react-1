import React, { Component } from "react";
import PropTypes from "prop-types";
import { NavLink, Link, Switch, Route, Router } from "react-router-dom";
import { contactEditRequest, contactRemoveRequest } from "../service";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { showNotification } from "../../../../../utils/Notification";

// import components
import ContactDetails from "./components/Details";
import ContactList from "./components/ContactList";

class Page extends Component {
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
            contact
        };
        this.handleRemove = this.handleRemove.bind(this);
    }

    UNSAFE_componentWillMount() {
        this.loadContact();
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const contact = nextProps.contact.toJson();

        if (!_.isEqual(this.state.contact, contact)) {
            this.setState({ contact });
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
    handleRemove(id) {
        this.props.dispatch(contactRemoveRequest(id)).then(() => {
            this.props.history.push(`/app/crm/contacts`);
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
                        <Link to="/app/crm/contacts">Contacts</Link>
                    </li>
                    <li className="active">Details</li>
                </ol>
                <div className="page-content">
                    <div className="row">
                        <div className="col-xs-12 col-sm-6 col-md-5 col-lg-4 col-xl-3">
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
                                                to={`${this.props.match.url}/contacts`}
                                            >
                                                <MoreVertIcon />
                                                Other Contacts
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
                                                to={`${this.props.match.url}/campaign-lists`}
                                            >
                                                <MoreVertIcon />
                                                Campaigns List
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

                        <div className="col ">
                            <Switch>
                                <Route
                                    exact
                                    path={`${this.props.match.path}`}
                                    render={() => {
                                        return (
                                            <ContactDetails
                                                {...this.state}
                                                handleRemove={this.handleRemove}
                                            />
                                        );
                                    }}
                                />

                                <Route
                                    exact
                                    path={`${this.props.match.path}/contacts`}
                                    render={() => {
                                        return <ContactList {...this.state} />;
                                    }}
                                />
                            </Switch>
                        </div>
                    </div>
                </div>
            </main>
        );
    }
}

export default Page;
