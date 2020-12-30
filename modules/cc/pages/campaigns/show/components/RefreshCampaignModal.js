import React, { PureComponent } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ReeValidate from "ree-validate";

import { Modal, Button } from "react-bootstrap";
import { campaignRestartRequest } from "../../service";

// import
import RefreshForm from "./RefreshForm";

class RefreshCampaignModal extends PureComponent {
    static displayName = "RefreshCampaignModal";
    static propTypes = {
        campaign: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);

        this.validator = new ReeValidate({
            listType: "required",
            selectedFew: "",
            actions: "",
            callStatus: ""
        });

        const campaign = this.props.campaign;
        this.state = {
            campaign,
            rerun: {
                listType: "",
                actions: [],
                callStatus: [],
                selectedFew: []
            },
            err: "init",
            errors: this.validator.errors
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const campaign = nextProps.campaign;

        if (!_.isEqual(this.state.campaign, campaign)) {
            this.setState({ campaign });
        }
    }
    handleChange(name, value) {
        const { errors } = this.validator;
        const rerun = Object.assign({}, { ...this.state.rerun, [name]: value });

        this.setState({ rerun });

        errors.remove(name);

        this.validator.validate(name, value).then(() => {
            this.setState({ errors, err: `${name}:${value}` });
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        const rerun = this.state.rerun;
        const { errors } = this.validator;

        this.validator.validateAll(rerun).then(success => {
            if (success) {
                this.setState({ err: "success" });
                this.submit({ ...rerun, id: this.state.campaign.id });
            } else {
                this.setState({ errors, err: "error" });
            }
        });
    }

    submit(rerun) {
        this.props
            .dispatch(campaignRestartRequest(rerun))
            .then(() => {
                this.setState({ rerun });
                this.props.onHide();
            })
            .catch(({ error, statusCode }) => {
                const { errors } = this.validator;

                if (statusCode === 422) {
                    _.forOwn(error, (message, field) => {
                        errors.add(field, message);
                    });
                }
                this.setState({ errors, err: "errors" });
            });
    }

    render() {
        return (
            <>
                <Modal
                    show={this.props.show}
                    onHide={this.props.onHide}
                    campaign={this.props.campaign}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title
                            style={{ fontSize: "1em" }}
                            id="contained-modal-title-vcenter"
                        >
                            Re Run Campaign
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <RefreshForm
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
        users: state.administration.users || []
    };
};

export default connect(mapStateToProps)(RefreshCampaignModal);
