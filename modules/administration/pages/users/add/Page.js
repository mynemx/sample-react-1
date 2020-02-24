// import libs
import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import Form from "./components/Form";
import ReeValidate from "ree-validate";
import { userAddRequest } from "../service";
import { showNotification } from "../../../../../utils/Notification";

// import components
import { Link } from "react-router-dom";
import { authPageLoading } from "../../../../auth/store/actions";

class Page extends PureComponent {
    static displayName = "UsersPage";
    static propTypes = {
        user: PropTypes.object.isRequired,
        departments: PropTypes.array.isRequired,
        dispatch: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.validator = new ReeValidate({
            firstName: "required|min:3",
            lastName: "required|min:3",
            secondName: "min:3|max:200",
            email: "required|min:10",
            departmentId: "required",
            jobTitle: "required|min:3",
            gender: "required",
            roleIds: "",
            password: "required|min:6|max:25",
            passwordConfirmation: "required|confirmed:password"
        });

        const user = this.props.user.toJson();

        this.state = {
            user,
            gender: [{ name: "Male" }, { name: "Female" }],
            err: "init",
            errors: this.validator.errors
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(authPageLoading(false));
    }

    handleChange(name, value) {
        const { errors } = this.validator;
        const user = Object.assign({}, { ...this.state.user, [name]: value });

        this.setState({ user });

        errors.remove(name);

        this.validator.validate(name, value).then(() => {
            let err = `${name}:${value}`;
            this.setState({ errors, err });
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        const user = this.state.user;
        const { errors } = this.validator;

        this.validator.validateAll(user).then(success => {
            if (success) {
                let err = "success";
                this.setState({ err });
                this.submit(user);
            } else {
                let err = "error";
                this.setState({ errors, err });
            }
        });
    }

    submit(user) {
        this.props
            .dispatch(userAddRequest(user))
            .then(msg => {
                showNotification(msg, "success");
                this.setState({ user });
                this.props.history.push("/app/company/administration/users");
            })
            .catch(({ error, statusCode }) => {
                const { errors } = this.validator;
                let err = "errors";
                if (statusCode === 422) {
                    _.forOwn(error, (message, field) => {
                        errors.add(field, message);
                    });
                    showNotification("Invalid input", "error");
                }
                this.setState({ errors, err, user });
            });
    }

    render() {
        return (
            <main className="page-container" role="main">
                <ol className="breadcrumb">
                    <li>
                        <Link to="/app/company/administration">
                            Administration
                        </Link>{" "}
                    </li>
                    <li>
                        <Link to="/app/company/administration/users">
                            Users
                        </Link>
                    </li>
                    <li className="active">Add Users</li>
                </ol>
                <div className="page-content">
                    <div className="card">
                        <div className="card-header">
                            <div className="card-title">Add User</div>
                            <div className="heading-elements">
                                <Link
                                    className="btn btn-sm btn-primary"
                                    to="/app/company/administration/users"
                                >
                                    Users
                                </Link>
                            </div>
                        </div>
                        <div className="card-body">
                            <Form
                                err={this.state.err}
                                user={this.state.user}
                                gender={this.state.gender}
                                errors={this.state.errors}
                                departments={this.props.departments}
                                roles={this.props.roles}
                                onChange={this.handleChange}
                                onSubmit={this.handleSubmit}
                            />
                        </div>
                    </div>
                </div>
            </main>
        );
    }
}

export default React.memo(Page);
