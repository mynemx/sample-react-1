import React, { PureComponent } from "react";
import BrandHeader from "./BrandHeader";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "./Header.css";

import { authToggleSidebar } from "../../modules/auth/store/actions";

import { logout } from "../../modules/auth/service";
import { campaignEditRequest } from "../../modules/cc/service";

import PrivateHeader from "./PrivateHeader";
import PublicHeader from "./PublicHeader";
import CallActivity from "./CallActivity";
import Modal from "../modal";
import { showNotification } from "../../utils/Notification";
import AddFeedbackModal from "../../modules/cc/pages/call_feedbacks/add/AddFeedbackModal";
import CallTransferModal from "./components/CallTransferModal";
import * as actions from "../../modules/cc/store/actions";
import Transformer from "../../utils/Transformer";

function transformResponse(params) {
    return Transformer.fetch(params);
}

class Header extends PureComponent {
    static propTypes = {
        isAuthenticated: PropTypes.bool.isRequired,
        user: PropTypes.object.isRequired,
        dispatch: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        const { user, calls } = this.props;

        this.state = {
            showNavigation: false,
            showDropdown: false,
            user,
            calls: calls,
            socket: this.props.socket,
            sound: this.props.sound,
            isModalOpen: false,
            loadSocket: false,
            isTranferModalOpen: false,
            isCompanyModalOpen: false,
            isContactModalOpen: false,
            isLeadModalOpen: false
        };

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.toggleDropdown = this.toggleDropdown.bind(this);
        this.toggleSidebar = this.toggleSidebar.bind(this);
        this.logout = this.logout.bind(this);
    }

    UNSAFE_componentWillMount() {
        setTimeout(() => {
            this.connectSocket();
        }, 500);
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const { calls, user, socket } = nextProps;
        this.setState({
            calls: calls
        });

        setTimeout(() => {
            this.connectSocket();
        }, 1000);

        this.setState({ socket });
    }

    handleSoftHangup = call => {
        const { socket } = this.state;
        let channel = call.destChannel;

        socket.emit("hangup-channel", {
            channel
        });
    };

    handleHangup = call => {
        const { socket } = this.state;
        let channel =
            call.direction == "IN" && call.destChannel != ""
                ? call.destChannel
                : call.channel;

        socket.emit("hangup-channel", {
            channel
        });
    };

    connectSocket() {
        const { calls, user, socket } = this.props;
        const { loadSocket } = this.state;

        if (user && user.extens && socket !== null && loadSocket == false) {
            user.extens.forEach(element => {
                socket.on("add-call-" + element, data => {
                    this.props.dispatch(
                        actions.addMyCall(transformResponse(data))
                    );
                    if (data.campaign_id !== "" && data.status == "Hangup") {
                        setTimeout(() => {
                            this.props.dispatch(
                                campaignEditRequest(data.campaign_id)
                            );
                        }, 1000);
                    }
                });

                socket.on("outbound-call-" + element, data => {
                    showNotification(
                        `calling ${data.name} ${data.number} from ${data.agent}`,
                        "success"
                    );
                });

                socket.on("callback-" + element, data => {
                    showNotification(`${data.message}`, "callback");
                });

                socket.on("campaign-call-" + element, data => {
                    showNotification(
                        `Campaign calling  ${data.name} ${data.number} from ${data.agent}`,
                        "success"
                    );
                    this.props.dispatch(campaignEditRequest(data.campaign_id));
                });
                socket.on("failed-campaign-" + element, data => {
                    showNotification(`${data.reason} from ${element}`, "error");
                });

                socket.on("hangup-call-" + element, data => {
                    showNotification(
                        `Call ended ${data.name} ${data.number} - ${data.agent}`,
                        "error"
                    );
                });

                socket.on("answered-call-" + element, data => {
                    showNotification(
                        `Call answered ${data.name} ${data.number} - ${data.agent}`,
                        "success"
                    );
                    try {
                        this.props.sound.play();
                    } catch (e) {}
                });
            });

            socket.on("inbound-call", data => {
                showNotification(
                    `Incoming call from ${data.name} ${data.number} last agent - ${data.last_agent}`,
                    "success"
                );
            });

            this.setState({ calls });
            this.setState({ loadSocket: true });
        }
    }

    toggleNavbar() {
        this.setState({
            showNavigation: !this.state.showNavigation
        });
    }

    toggleDropdown() {
        this.setState({
            showDropdown: !this.state.showDropdown
        });
    }

    // event to handle form submit
    toggleSidebar(e) {
        e.preventDefault();
        this.props.dispatch(authToggleSidebar());
    }

    handleModalOpen = call => {
        this.setState((prevState, props) => {
            return { isModalOpen: !prevState.isModalOpen, call };
        });
    };

    handleTransferModalOpen = call => {
        this.setState((prevState, props) => {
            return {
                isTransferModalOpen: !prevState.isTransferModalOpen,
                call
            };
        });
    };

    handleCompanyModalOpen = call => {
        this.setState((prevState, props) => {
            return { isCompanyModalOpen: !prevState.isCompanyModalOpen, call };
        });
    };

    handleContactModalOpen = call => {
        this.setState((prevState, props) => {
            return { isContactModalOpen: !prevState.isContactModalOpen, call };
        });
    };

    handlLeadModalOpen = call => {
        this.setState((prevState, props) => {
            return { isLeadModalOpen: !prevState.isLeadModalOpen, call };
        });
    };

    dismissable = () => {
        this.setState({
            isModalOpen: false,
            isTransferModalOpen: false,
            call: null
        });
    };

    logout(e) {
        e.preventDefault();

        this.props.dispatch(logout());
    }

    render() {
        return (
            <div className="header">
                <BrandHeader
                    toggleSidebar={this.toggleSidebar}
                    isAuthenticated={this.props.isAuthenticated}
                />
                {this.props.isAuthenticated ? (
                    <PrivateHeader
                        user={this.props.user}
                        showNavigation={this.state.showNavigation}
                        toggleDropdown={this.toggleDropdown}
                        showDropdown={this.state.showDropdown}
                        logout={this.logout}
                    />
                ) : (
                    <PublicHeader showNavigation={this.state.showNavigation} />
                )}

                <div
                    className={
                        this.state.showDropdown
                            ? "submenu-container"
                            : "hidemenu-container"
                    }
                >
                    <div className="p-2">
                        <div className="table-responsive">
                            <table
                                className="table table-sm table-hover"
                                style={{
                                    background: "#ffffff53"
                                }}
                            >
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Date</th>
                                        <th>Name</th>
                                        <th>Number</th>
                                        <th>Direction</th>
                                        <th>Duration</th>
                                        <th>Call Status</th>
                                        <th>Last Agent</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.calls.map((call, index) => {
                                        return (
                                            <CallActivity
                                                key={index}
                                                index={index}
                                                handleSoftHangup={
                                                    this.handleSoftHangup
                                                }
                                                handleHangup={this.handleHangup}
                                                handleModalOpen={
                                                    this.handleModalOpen
                                                }
                                                handleTransferModalOpen={
                                                    this.handleTransferModalOpen
                                                }
                                                call={call}
                                            />
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {this.state.call && (
                        <AddFeedbackModal
                            show={this.state.isModalOpen}
                            onHide={this.dismissable}
                            call={this.state.call}
                        />
                    )}

                    {this.state.call && (
                        <CallTransferModal
                            show={this.state.isTransferModalOpen}
                            onHide={this.dismissable}
                            call={this.state.call}
                        />
                    )}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.user,
        isAuthenticated: state.auth.isAuthenticated,
        calls: state.cc.myCalls || [],
        socket: state.cc.socket,
        sound: state.cc.sound
    };
};

export default connect(mapStateToProps)(Header);
