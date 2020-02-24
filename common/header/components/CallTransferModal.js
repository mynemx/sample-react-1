import React, { PureComponent } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Modal, Button } from "react-bootstrap";

// import
import CallTransferForm from "./TransferForm";

class CallTransferModal extends PureComponent {
    static displayName = "CallTransferModal";
    static propTypes = {
        call: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);

        const call = this.props.call;
        const sipExtensions = this.props.sipExtensions;
        this.state = {
            sipExtensions,
            call
        };
    }

    handleTransfer = call => {
        const { socket } = this.props;
        if (
            call.direction == "IN" &&
            (call.status == "Up" || call.status == "Hold")
        ) {
            socket.emit("transfer-channel", {
                exten: call.agent,
                channel: `Sip/${call.channel}`
            });
            this.props.onHide();
        } else if (
            call.direction == "OUT" &&
            (call.status == "Up" || call.status == "Hold")
        ) {
            socket.emit("transfer-channel", {
                exten: call.agent,
                channel: `Sip/${call.destChannel}`
            });
            this.props.onHide();
        }
    };

    UNSAFE_componentWillMount() {}

    render() {
        return (
            <>
                <Modal
                    show={this.props.show}
                    onHide={this.props.onHide}
                    call={this.props.call}
                    size="sm"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title
                            style={{ fontSize: "1em" }}
                            id="contained-modal-title-vcenter"
                        >
                            Call Transfer
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <CallTransferForm
                            {...this.state}
                            handleTransfer={this.handleTransfer}
                            dismiss={this.props.onHide}
                        />
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
        sipExtensions: state.cc.sipExtensions || [],
        socket: state.cc.socket
    };
};

export default connect(mapStateToProps)(CallTransferModal);
