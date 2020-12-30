// import libs
import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import Form from "./components/Form";
import ReeValidate from "ree-validate";
import { Redirect } from "react-router-dom";
import {
    extensionAddRequest,
    extensionUpdateRequest,
    extensionEditRequest
} from "../service";
import { showNotification } from "../../../../../utils/Notification";
import Extension from "../../../models/Extension";

// import components
import { Link } from "react-router-dom";
import { authPageLoading } from "../../../../auth/store/actions";

class Page extends PureComponent {
    static displayName = "ProductsPage";
    static propTypes = {
        match: PropTypes.object.isRequired,
        extension: PropTypes.object.isRequired,
        users: PropTypes.array.isRequired,
        dispatch: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.validator = new ReeValidate({
            sip: "required|min:3|max:200",
            displayName: "required|min:3|max:200",
            userId: "required",
            gatewayId: ""
        });

        const extension = new Extension({});

        const users = this.props.users;
        this.state = {
            extension: extension.toJson(),
            err: "init",
            errors: this.validator.errors
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const extension = nextProps.extension.toJson();

        if (!_.isEqual(this.state.extension, extension) && !this.state.extension.id) {
            this.setState({ extension });
        }
    }

    componentDidMount() {
        this.props.dispatch(authPageLoading(false));
        this.loadExtension();
    }

    loadExtension() {
        const { match, extension, dispatch } = this.props;

        if (!extension.id ) {
            dispatch(extensionEditRequest(match.params.id)).catch(
                ({ error, statusCode }) => {
                    showNotification(error, "error");
                    if (statusCode == 404) {
                        this.props.history.push("/app/contact-center/sip-extensions");
                    }
                }
            );
        }
    }

    handleChange(name, value) {
        const { errors } = this.validator;
        const extension = Object.assign(
            {},
            { ...this.state.extension, [name]: value }
        );

        this.setState({ extension });

        errors.remove(name);

        this.validator.validate(name, value).then(() => {
            this.setState({ errors, err: `${name}:${value}` });
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        const extension = this.state.extension;
        const { errors } = this.validator;

        this.validator.validateAll(extension).then(success => {
            if (success) {
                this.setState({ err: "success" });
                this.submit(extension);
            } else {
                this.setState({ errors, err: "error" });
            }
        });
    }

    submit(extension) {
        this.props
            .dispatch(extensionUpdateRequest(extension))
            .then(msg => {
                const extension = new Extension({});
                showNotification(msg, "success");
                this.setState({ extension });
                this.props.history.push("/app/contact-center/sip-extensions");
            })
            .catch(({ error, statusCode }) => {
                const { errors } = this.validator;

                if (statusCode === 422) {
                    _.forOwn(error, (message, field) => {
                        errors.add(field, message);
                    });
                    showNotification("Invalid input", "error");
                }
                this.setState({ errors, extension, err: "errors" });
            });
    }

    render() {
        return (
            <main className="page-container" role="main">
                <ol className="breadcrumb">
                    <li>
                        <Link to="/app/contact-center">Contact Center</Link>{" "}
                    </li>
                    <li>
                        <Link to="/app/contact-center/sip-extension">
                            Sip Extension
                        </Link>
                    </li>
                    <li className="active">Edit SIP Account</li>
                </ol>
                <div className="page-content">
                    <div className="card">
                        <div className="card-body">
                            <Form
                                err={this.state.err}
                                errors={this.state.errors}
                                extension={this.state.extension}
                                users={this.props.users}
                                callGateways={this.props.callGateways}
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

export default Page;
