import React, { PureComponent } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ReeValidate from "ree-validate";

import { Modal, Button } from "react-bootstrap";
import { campaignUpdateRequest } from "../../service";

// import
import Form from "./Form";
import { showNotification } from "../../../../../../utils/Notification";

class EditCampaignModal extends PureComponent {
    static displayName = "EditCampaignModal";
    static propTypes = {
        campaign: PropTypes.object.isRequired,
        users: PropTypes.array.isRequired,
        sipExtensions: PropTypes.array.isRequired
    };

    constructor(props) {
        super(props);

        this.validator = new ReeValidate({
            agent: "required",
            gatewayId: "",
            callScript: "required"
        });

        const campaign = this.props.campaign;
        const sipExtensions = this.props.sipExtensions;
        const callGateways = this.props.callGateways;
        const users = this.props.users;
        this.state = {
            campaign,
            sipExtensions,
            callGateways,
            users,
            err: "init",
            errors: this.validator.errors
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const campaign = nextProps.campaign;
        const { users, sipExtensions } = nextProps;

        if (!_.isEqual(this.state.campaign, campaign)) {
            this.setState({ campaign });
        }
        this.setState({
            users,
            sipExtensions
        });
    }

    handleChange(name, value) {
        const { errors } = this.validator;
        const campaign = Object.assign(
            {},
            { ...this.state.campaign, [name]: value }
        );

        this.setState({ campaign });

        errors.remove(name);

        this.validator.validate(name, value).then(() => {
            this.setState({ errors, err: `${name}:${value}` });
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        const campaign = this.state.campaign;
        const { errors } = this.validator;

        this.validator.validateAll(campaign).then(success => {
            if (success) {
                this.setState({ err: "success" });
                this.submit(campaign);
            } else {
                this.setState({ errors, err: "error" });
            }
        });
    }

    submit(campaign) {
        this.props
            .dispatch(campaignUpdateRequest(campaign))
            .then(msg => {
                this.setState({ campaign });
                this.props.onHide();
            })
            .catch(({ error, statusCode }) => {
                const { errors } = this.validator;

                if (statusCode === 422) {
                    _.forOwn(error, (message, field) => {
                        errors.add(field, message);
                    });
                    showNotification("Invalid input", "error");
                }
                this.setState({ errors, campaign, err: "errors" });
            });
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
                            Edit Campaign
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form
                            {...this.state}
                            dispatch={this.props.dispatch}
                            onChange={this.handleChange}
                            onSubmit={this.handleSubmit}
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
        users: state.administration.users || [],
        callGateways: state.cc.callGateways || [],
        sipExtensions: state.cc.sipExtensions || []
    };
};

export default connect(mapStateToProps)(EditCampaignModal);
