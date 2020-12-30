// import libs
import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import Form from "./components/Form";
import ReeValidate from "ree-validate";
import { campaignListUpdateRequest, campaignListEditRequest } from "../service";
import { showNotification } from "../../../../../utils/Notification";

// import components
import { Link } from "react-router-dom";
import { authPageLoading } from "../../../../auth/store/actions";

class Page extends PureComponent {
    static displayName = "EditCampaignListPage";
    static propTypes = {
        campaignList: PropTypes.object.isRequired,
        users: PropTypes.array.isRequired,
        dispatch: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.validator = new ReeValidate({
            name: "required|min:3",
            listType: "required",
            category: "required",
            userId: "required",
            description: ""
        });

        const campaignList = this.props.campaignList.toJson();

        this.state = {
            campaignList,
            err: "init",
            errors: this.validator.errors
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(authPageLoading(false));
        this.loadCampaignList();
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const campaignList = nextProps.campaignList.toJson();

        if (
            !_.isEqual(this.state.campaignList, campaignList) &&
            !this.state.campaignList.id
        ) {
            this.setState({ campaignList });
        }
    }

    loadCampaignList() {
        const { match, campaignList, dispatch } = this.props;

        if (!campaignList.id) {
            dispatch(campaignListEditRequest(match.params.id)).catch(
                ({ error, statusCode }) => {
                    if (statusCode === 404) {
                        showNotification(error, "error");
                        this.props.history.push(
                            `/app/campaignList-center/campaign-lists`
                        );
                    }
                }
            );
        }
    }

    handleChange(name, value) {
        const { errors } = this.validator;
        const campaignList = Object.assign(
            {},
            { ...this.state.campaignList, [name]: value }
        );

        this.setState({ campaignList });

        errors.remove(name);

        this.validator.validate(name, value).then(() => {
            this.setState({ errors, err: `${name}:${value}` });
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        const campaignList = this.state.campaignList;
        const { errors } = this.validator;

        this.validator.validateAll(campaignList).then(success => {
            if (success) {
                this.setState({ err: "success" });
                this.submit(campaignList);
            } else {
                this.setState({ errors, err: "error" });
            }
        });
    }

    submit(campaignList) {
        this.props
            .dispatch(campaignListUpdateRequest(campaignList))
            .then(msg => {
                showNotification(msg, "success");
                this.setState({ campaignList });
                this.props.history.push(
                    `/app/contact-center/campaign-lists/${this.state.campaignList.id}`
                );
            })
            .catch(({ error, statusCode }) => {
                const { errors } = this.validator;

                if (statusCode === 422) {
                    _.forOwn(error, (message, field) => {
                        errors.add(field, message);
                    });
                    showNotification("Invalid input", "error");
                }
                this.setState({ errors, campaignList, err: "errors" });
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
                        <Link to="/app/contact-center/campaign-lists">
                            Campaign Lists
                        </Link>
                    </li>
                    <li className="active">Edit Campaign List</li>
                </ol>
                <div className="page-content">
                    <div className="card">
                        <div className="card-header">
                            <div className="card-title">Edit Campaign List</div>
                            <div className="heading-elements">
                                <Link
                                    to="/app/contact-center/campaign-lists"
                                    className="btn btn-primary btn-sm"
                                >
                                    Campaign Lists
                                </Link>
                                <Link
                                    to={`/app/contact-center/campaign-lists/${this.state.campaignList.id}`}
                                    className="btn btn-primary btn-sm"
                                >
                                    Show Details
                                </Link>
                            </div>
                        </div>
                        <div className="card-body">
                            <Form
                                {...this.state}
                                users={this.props.users}
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
