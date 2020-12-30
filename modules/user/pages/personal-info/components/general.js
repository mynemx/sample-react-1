import React, { Component } from "react";
import { userInfo } from "os";
import { Link } from "react-router-dom";
import VpnKeyOutlinedIcon from "@material-ui/icons/VpnKeyOutlined";
import { showNotification } from "../../../../../utils/Notification";
import ReeValidate from "ree-validate";

// components
import ContactInfo from "./contact-info";
import EditContactInfo from "./edit-contact-info";
import OverlayBox from "../../../../../common/overlay-box";
import ProfilePicture from "./profile-picture";
import ChangePasswordForm from "./ChangePassword";
import TaskSummary from "./user-task-summary";
import { userUpdateRequest } from "../../../service";

class GeneralInfo extends Component {
    constructor(props) {
        super(props);

        this.contactValidator = new ReeValidate({
            firstName: "required|min:3|max:200",
            lastName: "required|min:3|max:200",
            secondName: "min:3|max:200",
            departmentId: "numeric",
            dob: "max:200",
            email: "required|email|max:200",
            gender: "required|min:3|max:200",
            maritalStatus: "required|min:3|max:200",
            phone: "min:8|numeric|max:15",
            mobile: "min:8|numeric|max:15",
            ext: "min:3|numeric|max:6"
        });

        const user = this.props.user.toJson();

        this.state = {
            user,
            departments: [],
            contactform: false,
            changePassword: false,
            contacterrors: this.contactValidator.errors
        };
        this.editContactInfo = this.editContactInfo.bind(this);
        this.handleContactChange = this.handleContactChange.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleContactSubmit = this.handleContactSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        const user = nextProps.user.toJson();
        const departments = nextProps.departments;

        if (!_.isEqual(this.state.user, user)) {
            this.setState({ user });
        }
        this.setState({ departments });
    }

    editContactInfo(e) {
        e.preventDefault();
        this.setState({ contactform: !this.state.contactform });
    }

    handleChangePassword() {
        this.setState({ changePassword: !this.state.changePassword });
    }

    handleContactChange(name, value) {
        const { errors } = this.contactValidator;
        const { departments } = this.state;

        this.setState({ user: { ...this.state.user, [name]: value } });
        if (name == "departmentId") {
            const department = departments.find(
                department => department.id == value
            );

            this.setState({
                user: { ...this.state.user, department: department }
            });
        }
        errors.remove(name);

        this.contactValidator.validate(name, value).then(() => {
            this.setState({ contacterrors: errors });
        });
    }

    handleContactSubmit(e) {
        e.preventDefault();
        const user = this.state.user;
        const { errors } = this.contactValidator;

        this.contactValidator.validateAll(user).then(success => {
            if (success) {
                this.submitContact(user);
            } else {
                this.setState({ contacterrors: errors });
            }
        });
    }

    submitContact(user) {
        this.props
            .dispatch(userUpdateRequest(user))
            .then(msg => {
                showNotification(msg, "success");
                this.setState({ contactform: !this.state.contactform });
            })
            .catch(({ error, statusCode }) => {
                const { errors } = this.contactValidator;

                if (statusCode === 422) {
                    _.forOwn(error, (message, field) => {
                        errors.add(field, message);
                    });
                    showNotification("Invalid input", "error");
                } else {
                    showNotification("Invalid input", "error");
                }

                this.setState({ contacterrors: errors });
            });
    }
    render() {
        const { user, departments } = this.state;
        return (
            <>
                <ol className="breadcrumb">
                    <li>Personal Info</li>
                </ol>
                <div className="page-content">
                    <div className="row">
                        <div className="col-xs-12 col-sm-6 col-md-5 col-lg-4 col-xl-3">
                            <div
                                className="card bg-light-ash"
                                style={{
                                    borderRadius: "0.9rem"
                                    // backgroundColor: "#E2E7EA"
                                }}
                            >
                                <div className="card-body">
                                    <ProfilePicture user={user} />
                                </div>
                            </div>

                            <div className="card mt-2">
                                <div className="card-header">My tasks</div>
                                <div className="card-body">
                                    <TaskSummary user={user} />
                                </div>
                            </div>
                        </div>
                        <div className="col ">
                            <div className="card">
                                <div className="card-header">
                                    <h5 className="card-title">
                                        Contact Information
                                    </h5>
                                    <div className="heading-elements">
                                        <button
                                            className="btn "
                                            onClick={this.editContactInfo}
                                        >
                                            {this.state.contactform
                                                ? "Cancel"
                                                : "Edit"}
                                        </button>
                                    </div>
                                </div>
                                <div className="card-body max-height-500">
                                    {this.state.contactform ? (
                                        <EditContactInfo
                                            {...user}
                                            departments={departments}
                                            errors={this.state.contacterrors}
                                            handleChange={
                                                this.handleContactChange
                                            }
                                            handleSubmit={
                                                this.handleContactSubmit
                                            }
                                            handleCancel={this.editContactInfo}
                                        />
                                    ) : (
                                        <ContactInfo user={user} />
                                    )}
                                </div>
                            </div>

                            <div className="card mt-2">
                                <div className="card-header">
                                    Change Password
                                </div>
                                <div className="card-body">
                                    <div className="d-flex align-items-stretch p-0">
                                        <div className="p-3">
                                            <div className="align-middle rounded-circle border border-info p-3 ">
                                                <VpnKeyOutlinedIcon className="text-info" />
                                            </div>
                                        </div>
                                        <div className="text-justify p-3 flex-grow-1 align-self-stretch">
                                            {this.state.changePassword ? (
                                                <ChangePasswordForm
                                                    dispatch={
                                                        this.props.dispatch
                                                    }
                                                    onChange={
                                                        this
                                                            .handleChangePassword
                                                    }
                                                />
                                            ) : (
                                                <>
                                                    <div className="text-default ">
                                                        We recommend you change
                                                        your password once in
                                                        every 6 months. For
                                                        security measures.
                                                    </div>
                                                    <button
                                                        className="btn btn-outline-secondary "
                                                        onClick={
                                                            this
                                                                .handleChangePassword
                                                        }
                                                    >
                                                        Change your password
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default GeneralInfo;
