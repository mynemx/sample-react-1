import React, { PureComponent } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { NavLink, Link, Switch, Route, Router } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import { callInfoRequest } from "../../../service";

// import
import CallDetail from "./component/Details";
import ClientForm from "./component/Form";
import FeedbackForm from "./component/AddFeedbackForm";
import Conversation from "./component/Conversation";

class AddCallFeedbackModal extends PureComponent {
    static displayName = "AddCallFeedbackModal";
    static propTypes = {
        call: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);

        const call = this.props.call;
        const users = this.props.users;
        this.state = {
            call,
            users,
            mode: "call",
            duration: 0,
            contactType: "",
            client: null,
            conversations: [],
            socket: this.props.socket,
            feedback: {
                phonenumber: call.number,
                name: call.name,
                agent: call.agent,
                action: "",
                direction: call.direction,
                campaignId: call.campaignId,
                recipientId: call.recipientId,
                recipientType: this.getRecipient(call.recipientType),
                campaignNumberId: call.campaignNumberId
            }
        };
    }

    componentWillMount() {
        this.loadData(this.props.call);
    }

    getDuration(call) {
        if (
            call.answerTime !== "" &&
            (call.callStatus == "Up" || call.callStatus == "Hold")
        ) {
            let countDownDate = new Date(call.answerTime).getTime();
            // Update the count down every 1 second
            let duration = 0;
            setInterval(() => {
                let now = new Date().getTime();
                duration = now - countDownDate;
                if (duration < 0) {
                    clearInterval(x);
                    this.setState({ duration: 0 });
                } else {
                    this.setState({
                        duration
                    });
                }
            }, 1000);
            return this.formatDuration(this.state.duration);
        } else {
            return this.formatDuration(call.billsecs);
        }
    }

    updateConversation = feedback => {
        this.setState({
            mode: "conversations",
            conversations: [feedback, ...this.state.conversations]
        });
    };

    formatDuration(duration) {
        const hours = Math.floor(duration / (1000 * 60 * 60));
        const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((duration % (1000 * 60)) / 1000);

        return `${hours}:${minutes}:${seconds}`;
    }

    changeDisplay = (e, mode) => {
        e.preventDefault();
        this.setState({
            mode
        });
    };

    loadData(call) {
        const { dispatch } = this.props;
        dispatch(
            callInfoRequest({
                contactId: call.contactId,
                contactType: call.contactType,
                phone: call.number
            })
        ).then(data => {
            this.setState({
                client: data.client || {},
                contactType: data.contactType,
                conversations: data.feedbacks,
                feedback: Object.assign(
                    {},
                    {
                        ...this.state.feedback,
                        recipientId: data.recipientId,
                        recipientType: this.getRecipient(data.recipientType)
                    }
                )
            });
        });
    }

    getRecipient(str) {
        switch (str.toLowerCase()) {
            case "contact":
            case "contacts":
            case "appmodelscontact":
            case "app\\models\\contact":
                return "App\\Models\\Contact";
                break;
            case "company":
            case "companies":
            case "appmodelscompany":
            case "app\\models\\company":
                return "App\\Models\\Company";
                break;
            case "lead":
            case "leads":
            case "appmodelslead":
            case "app\\models\\lead":
                return "App\\Models\\Lead";
                break;

            default:
                return null;
                break;
        }
    }
    renderContent() {
        switch (this.state.mode.toLowerCase()) {
            case "call":
                return <CallDetail {...this.state} />;
            case "client":
                return (
                    <ClientForm
                        {...this.state}
                        dispatch={this.props.dispatch}
                    />
                );

            case "conversation":
                return <Conversation {...this.state} />;
            case "feedback":
                return (
                    <FeedbackForm
                        {...this.state}
                        updateConversation={this.updateConversation}
                        dispatch={this.props.dispatch}
                    />
                );
        }
    }

    render() {
        return (
            <>
                <Modal
                    show={this.props.show}
                    onHide={this.props.onHide}
                    call={this.props.call}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title
                            style={{ fontSize: "1em" }}
                            id="contained-modal-title-vcenter"
                        >
                            Call Feedbacks
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ul className="nav nav-tabs justify-content-start mb-2">
                            <li className="nav-item">
                                <NavLink
                                    className="nav-link"
                                    activeClassName={
                                        this.state.mode == "call"
                                            ? "active"
                                            : ""
                                    }
                                    to="#"
                                    onClick={e => this.changeDisplay(e, "call")}
                                >
                                    Call Details
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink
                                    className="nav-link"
                                    activeClassName={
                                        this.state.mode == "client"
                                            ? "active"
                                            : ""
                                    }
                                    to="#"
                                    onClick={e =>
                                        this.changeDisplay(e, "client")
                                    }
                                >
                                    Client Details
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink
                                    className="nav-link"
                                    activeClassName={
                                        this.state.mode == "conversation"
                                            ? "active"
                                            : ""
                                    }
                                    to="#"
                                    onClick={e =>
                                        this.changeDisplay(e, "conversation")
                                    }
                                >
                                    Previous Conversation
                                </NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink
                                    className="nav-link"
                                    activeClassName={
                                        this.state.mode == "feedback"
                                            ? "active"
                                            : ""
                                    }
                                    to="#"
                                    onClick={e =>
                                        this.changeDisplay(e, "feedback")
                                    }
                                >
                                    Add Call Feedback
                                </NavLink>
                            </li>
                        </ul>
                        {this.renderContent()}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.props.onHide}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        users: state.administration.users || []
    };
};

export default connect(mapStateToProps)(AddCallFeedbackModal);
