import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { NavLink, Link, Switch, Route, Router } from "react-router-dom";
import {
    campaignEditRequest,
    campaignRemoveRequest,
    campaignStopRequest,
    campaignDequeueRequest,
    campaignQueueRequest,
    campaignStateRequest,
    campaignReportRequest
} from "../service";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { showNotification } from "../../../../../utils/Notification";

// import components
import CampaignActivity from "./components/Details";
import CalledRecipients from "./components/CalledRecipients";
import PendingRecipients from "./components/PendingRecipients";
import EditCampaignModal from "./components/EditCampaignModal";
import RefreshCampaignModal from "./components/RefreshCampaignModal";

class Page extends PureComponent {
    static displayName = "UsersPage";
    static propTypes = {
        campaign: PropTypes.object.isRequired,
        match: PropTypes.object.isRequired,
        dispatch: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        const campaign = this.props.campaign.toJson();
        const { user, calls } = this.props;
        this.timerOut = null;

        this.state = {
            campaign,
            user,
            isEditModalOpen: false,
            isRefreshModalOpen: false,
            loadSocket: false,
            calledRecipients: campaign.calledRecipients,
            pendingRecipients: campaign.pendingRecipients,
            calls: calls.filter(call => {
                return (
                    user.extens.find(obj => obj === call.agent) &&
                    call.campaignId === this.props.match.params.id &&
                    call.status != "hangup"
                );
            }),
            url: "",
            status: [],
            summary: { calls: [], actions: [] }
        };
        this.handleRemove = this.handleRemove.bind(this);
    }

    componentDidMount() {
        this.loadContact();
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const campaign = nextProps.campaign.toJson();
        const { calls, user } = nextProps;

        if (
            !_.isEqual(this.state.campaign, campaign) &&
            !this.state.campaign.id
        ) {
            this.setState({
                campaign,
                pendingRecipients: campaign.pendingRecipients,
                calledRecipients: campaign.calledRecipients
            });
        }
        if (
            (!_.isEqual(
                this.state.calledRecipients,
                campaign.calledRecipients
            ) &&
                !_.isEqual(
                    this.state.pendingRecipients,
                    campaign.pendingRecipients
                )) ||
            !_.isEqual(this.state.campaign.recipients, campaign.recipients)
        ) {
            this.setState({
                campaign,
                pendingRecipients: campaign.pendingRecipients,
                calledRecipients: campaign.calledRecipients
            });
        }

        if (!_.isEqual(this.state.calls, calls)) {
            this.setState({
                calls: calls.filter(call => {
                    return (
                        call.campaignId === this.props.match.params.id &&
                        call.status != "hangup"
                    );
                })
            });
        }

        this.loadData(campaign);

        setTimeout(() => {
            this.connectSocket();
        }, 1000);
    }

    loadContact() {
        const { match, campaign, dispatch } = this.props;

        if (!campaign.id || campaign.recipients.length == 0) {
            dispatch(campaignEditRequest(match.params.id)).catch(
                ({ error, statusCode }) => {
                    if (statusCode === 404) {
                        showNotification(error, "error");
                        this.props.history.push(
                            `/app/contact-center/campaigns`
                        );
                    }
                }
            );
        } else {
            this.loadData(campaign);
        }
    }

    connectSocket() {
        const { calls, user } = this.props;

        if (user && user.extens) {
            const campaignCalls = calls.filter(call => {
                return (
                    user.extens.find(obj => obj === call.agent) &&
                    call.campaignId === this.props.match.params.id &&
                    call.status != "hangup"
                );
            });
            if (!_.isEqual(this.state.calls, campaignCalls)) {
                this.setState({
                    calls: campaignCalls
                });
            }
        }
    }

    loadData(campaign) {
        const { dispatch } = this.props;
        dispatch(
            campaignReportRequest({
                campaignId: campaign.id
            })
        ).then(data => {
            this.setState({
                summary: data,
                status: data.calls
            });
        });
    }

    handleEditModalOpen = () => {
        this.setState((prevState, props) => {
            return { isEditModalOpen: !prevState.isEditModalOpen };
        });
    };

    handleRefreshModalOpen = () => {
        this.setState((prevState, props) => {
            return { isRefreshModalOpen: !prevState.isRefreshModalOpen };
        });
    };

    dismissable = () => {
        this.setState({
            isEditModalOpen: false,
            isRefreshModalOpen: false
        });
    };

    handleState = isActive => {
        const { dispatch } = this.props;
        const { campaign } = this.state;
        dispatch(campaignStateRequest({ ...campaign, isActive }));
    };

    handleStop = () => {
        const { dispatch } = this.props;
        const { campaign } = this.state;
        dispatch(campaignStopRequest(campaign));
    };

    renderCampaignActivity = () => (
        <CampaignActivity
            campaign={this.state.campaign}
            status={this.state.status}
            summary={this.state.summary}
            calls={this.state.calls}
            handleEditModalOpen={this.handleEditModalOpen}
            handleRefreshModalOpen={this.handleRefreshModalOpen}
            handleState={this.handleState}
            handleStop={this.handleStop}
            dispatch={this.props.dispatch}
            history={this.props.history}
            handleRemove={this.handleRemove}
        />
    );

    renderPendingRecipients = () => (
        <PendingRecipients
            recipients={this.state.pendingRecipients}
            handleDequeue={this.handleDequeue}
        />
    );

    renderCalledRecipients = () => (
        <CalledRecipients
            recipients={this.state.calledRecipients}
            handleQueue={this.handleQueue}
        />
    );

    handleQueue = recipient => {
        const { dispatch } = this.props;
        dispatch(campaignQueueRequest(recipient));
    };

    handleDequeue = recipient => {
        const { dispatch } = this.props;
        dispatch(campaignDequeueRequest(recipient));
    };

    handleRemove(id) {
        this.props.dispatch(campaignRemoveRequest(id)).then(() => {
            this.props.history.push(`/app/contact-center/campaigns`);
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
                        <Link to="/app/contact-center/campaigns">
                            Campaigns
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
                                        <label className="label">Title: </label>
                                        {` ${this.state.campaign.title}`}
                                    </div>
                                    <div className="text-justify pl-3 mt-2">
                                        <label className="label">Agent:</label>
                                        {` ${this.state.campaign.agent}`}
                                    </div>
                                    <div className="text-justify pl-3 mt-2">
                                        <label className="label">Type: </label>
                                        {` ${this.state.campaign.listType}`}
                                    </div>
                                    <div className="text-justify pl-3 mt-2">
                                        <label className="label">Status:</label>
                                        {this.state.campaign.isActive
                                            ? "Active"
                                            : "Paused"}
                                    </div>
                                    <div className="text-justify pl-3 mt-2">
                                        <label className="label">
                                            Completed:
                                        </label>
                                        {this.state.campaign.isComplete
                                            ? "Yes"
                                            : "No"}
                                    </div>
                                    <div className="text-justify pl-3 mt-2">
                                        <label className="label">
                                            Number Lines:{" "}
                                        </label>
                                        {` ${this.state.campaign.recipientsCount}`}
                                    </div>
                                    <div className="text-justify pl-3 mt-2">
                                        <label className="label">
                                            Queued:{" "}
                                        </label>
                                        {` ${this.state.campaign.pendingRecipientsCount}`}
                                    </div>
                                    <div className="text-justify pl-3 mt-2">
                                        <label className="label">
                                            Called:{" "}
                                        </label>
                                        {` ${this.state.campaign.calledRecipientsCount}`}
                                    </div>
                                    <div className="text-justify pl-3 mt-2">
                                        <label className="label">
                                            Call Script:
                                        </label>
                                        {` ${this.state.campaign.callScript}`}
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
                                                Activity
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink
                                                to={`${this.props.match.url}/called-recipients`}
                                            >
                                                <MoreVertIcon />
                                                Called Recipients
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink
                                                to={`${this.props.match.url}/pending-recipients`}
                                            >
                                                <MoreVertIcon />
                                                Pending Recipients
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
                                    render={this.renderCampaignActivity}
                                />
                                <Route
                                    exact
                                    path={`${this.props.match.path}/called-recipients`}
                                    render={this.renderCalledRecipients}
                                />
                                <Route
                                    exact
                                    path={`${this.props.match.path}/pending-recipients`}
                                    render={this.renderPendingRecipients}
                                />
                            </Switch>
                            <EditCampaignModal
                                show={this.state.isEditModalOpen}
                                onHide={this.dismissable}
                                campaign={this.state.campaign}
                            />
                            <RefreshCampaignModal
                                show={this.state.isRefreshModalOpen}
                                onHide={this.dismissable}
                                campaign={this.state.campaign}
                            />
                        </div>
                    </div>
                </div>
            </main>
        );
    }
}

export default React.memo(Page);
