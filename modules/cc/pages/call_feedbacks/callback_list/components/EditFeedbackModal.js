import React, { PureComponent } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Modal, Button } from "react-bootstrap";

// import
import FeedbackForm from "./EditFeedbackForm";

class EditFeedbackModal extends PureComponent {
    static displayName = "EditFeedbackModal";
    static propTypes = {
        feedback: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);

        const feedback = this.props.feedback;
        const sipExtensions = this.props.sipExtensions;
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
                        <FeedbackForm
                            sipExtensions={this.props.sipExtensions}
                            feedback={this.props.feedback}
                            dispatch={this.props.dispatch}
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
        sipExtensions: state.cc.sipExtensions || []
    };
};

export default connect(mapStateToProps)(EditFeedbackModal);
