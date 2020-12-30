import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { NavLink, Link, Switch, Route, Router } from "react-router-dom";
import { campaignListEditRequest, campaignListRemoveRequest } from "../service";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { showNotification } from "../../../../../utils/Notification";

// import components
import ContactList from "./components/ContactList";
import ImportRecipients from "./components/ImportRecipients";
import { authPageLoading } from "../../../../auth/store/actions";

class Page extends PureComponent {
    static displayName = "CampaignlistPage";
    static propTypes = {
        campaignList: PropTypes.object.isRequired,
        match: PropTypes.object.isRequired,
        dispatch: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        const campaignList = this.props.campaignList.toJson();
        const {
            sources,
            contactCategories,
            contactTypes,
            companyCategories,
            leadStatuses,
            industries,
            companyTypes
        } = this.props;
        this.state = {
            campaignList,
            sources,
            contactCategories,
            contactTypes,
            companyCategories,
            leadStatuses,
            industries,
            companyTypes
        };
        this.handleRemove = this.handleRemove.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(authPageLoading(false));
        this.loadCampaignList();
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const campaignList = nextProps.campaignList.toJson();
        const {
            sources,
            contactCategories,
            contactTypes,
            companyCategories,
            leadStatuses,
            industries,
            companyTypes
        } = nextProps;
        if (!_.isEqual(this.state.campaignList, campaignList)) {
            this.setState({ campaignList });
        }
        this.setState({
            sources,
            contactCategories,
            contactTypes,
            companyCategories,
            industries,
            leadStatuses,
            companyTypes
        });
    }

    loadCampaignList() {
        const { match, campaignList, dispatch } = this.props;

        if (!campaignList.id) {
            dispatch(campaignListEditRequest(match.params.id)).catch(
                ({ error, statusCode }) => {
                    if (statusCode === 404) {
                        showNotification(error, "error");
                        this.props.history.push(
                            `/app/contact-center/campaign-lists`
                        );
                    }
                }
            );
        }
    }
    handleRemove(id) {
        this.props.dispatch(campaignListRemoveRequest(id)).then(() => {
            this.props.history.push(`/app/contact-center/campaign-lists`);
        });
    }
    render() {
        return (
            <main className="page-container" role="main">
                <ol className="breadcrumb">
                    <li>
                        <Link to="/app/contact-center">Contact Center</Link>
                    </li>
                    <li>
                        <Link to="/app/contact-center/campaign-lists">
                            Campaign Lists
                        </Link>
                    </li>
                    <li className="active">Details</li>
                </ol>
                <div className="page-content">
                    <div className="row">
                        <div className="col-xs-12 col-sm-5 col-md-4 col-lg-3">
                            <div className="card ">
                                <div className="card-img-top">
                                    <div className="text-justify pl-3 mt-2">
                                        <label className="label">Name: </label>
                                        {` ${this.state.campaignList.name}`}
                                    </div>
                                    <div className="text-justify pl-3 mt-2">
                                        <label className="label">
                                            Contacts:
                                        </label>
                                        {` ${this.state.campaignList.recipients.length}`}
                                    </div>
                                    <div className="text-justify pl-3 mt-2">
                                        <label className="label">Type: </label>
                                        {` ${this.state.campaignList.listType}`}
                                    </div>
                                    <div className="text-justify pl-3 mt-2">
                                        <label className="label">
                                            Category:
                                        </label>
                                        {` ${this.state.campaignList.category}`}
                                    </div>
                                    <div className="text-justify pl-3 mt-2">
                                        <label className="label">
                                            Description:
                                        </label>
                                        {` ${this.state.campaignList.description}`}
                                    </div>
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
                                                Recipients
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink
                                                to={`${this.props.match.url}/import-recipients`}
                                            >
                                                <MoreVertIcon />
                                                Import Recipients
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
                                            <ContactList
                                                {...this.state}
                                                dispatch={this.props.dispatch}
                                                history={this.props.history}
                                            />
                                        );
                                    }}
                                />
                                <Route
                                    exact
                                    path={`${this.props.match.path}/import-recipients`}
                                    render={() => {
                                        return (
                                            <ImportRecipients
                                                {...this.state}
                                                dispatch={this.props.dispatch}
                                                history={this.props.history}
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

export default React.memo(Page);
