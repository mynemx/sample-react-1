import React, { Component } from "react";
import PropTypes from "prop-types";
import { NavLink, Link, Switch, Route, Router } from "react-router-dom";
import { companyEditRequest, companyRemoveRequest } from "../service";
import { contactRequest } from "../../../service";
import { feedbackRequest } from "../../../../cc/service";
import MoreVertIcon from "@material-ui/icons/MoreVert";

// import components
import CompanyDetails from "./components/CompanyDetails";
import ContactList from "./components/ContactList";
import { showNotification } from "../../../../../utils/Notification";

class Page extends Component {
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

    UNSAFE_componentWillMount() {
        this.loadCompany();
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const company = nextProps.company.toJson();

        if (!_.isEqual(this.state.company, company)) {
            this.setState({ company });
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
            dispatch(
                contactRequest({ companyId: company.id, limits: 100 })
            ).then(data => {
                this.setState({ contact: data });
            });
        }
    }
    handleRemove(id) {
        this.props.dispatch(companyRemoveRequest(id)).then(() => {
            this.props.history.push("/app/crm/companies");
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

                        <div className="col-xs-12 col-sm-7 col-md-8 col-lg-9 ">
                            <Switch>
                                <Route
                                    exact
                                    path={`${this.props.match.path}`}
                                    render={() => {
                                        return (
                                            <CompanyDetails
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
                                        return (
                                            <ContactList
                                                {...this.state}
                                                dispatch={this.props.dispatch}
                                            />
                                        );
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
