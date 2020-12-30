// import libs
import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import Form from "./components/Form";
import ReeValidate from "ree-validate";
import { orderUpdateRequest, orderEditRequest } from "../service";
import { showNotification } from "../../../../../utils/Notification";

// import components
import { Link } from "react-router-dom";
import { authPageLoading } from "../../../../auth/store/actions";

class Page extends PureComponent {
    static displayName = "UsersPage";
    static propTypes = {
        orderStatuses: PropTypes.array.isRequired,
        users: PropTypes.array.isRequired,
        match: PropTypes.object.isRequired,
        dispatch: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.validator = new ReeValidate({
            name: "required|min:3",
            salesRepId: "required",
            category: "required",
            orderedDate: "required",
            contactId: "",
            companyId: "",
            orderStatusId: "",
            product: "",
            source: "",
            items: "",
            clientName: "",
            deliveryAddress: "max:200",
            contactNumber: "min:10|max:16"
        });

        const order = this.props.order.toJson();
        const { users, orderStatuses } = this.props;
        const sourceList = [
            {name: "Cold customer"},
            {name: "Existing customer "},
            {name: "Inbound cold customer "},
            {name: "Inbound existing customer"},
        ];
        this.state = {
            order,
            users,
            orderStatuses,
            sourceList,
            err: "init",
            errors: this.validator.errors
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const order = nextProps.order.toJson();
        const { orderStatuses, users } = nextProps;

        if (!_.isEqual(this.state.order, order) && !this.state.order.id) {
            this.setState({ order });
        }
        this.setState({
            users,
            orderStatuses
        });
    }

    componentDidMount() {
        this.props.dispatch(authPageLoading(false));
        this.loadOrder();
    }

    loadOrder() {
        const { match, order, dispatch } = this.props;

        if (!order.id) {
            dispatch(orderEditRequest(match.params.id)).catch(
                ({ error, statusCode }) => {
                    showNotification(error, "error");
                    if (statusCode == 404) {
                        this.props.history.push("/app/crm/orders");
                    }
                }
            );
        }
    }

    handleChange(name, value) {
        const { errors } = this.validator;
        const order = Object.assign({}, { ...this.state.order, [name]: value });

        this.setState({ order });

        if (name == "category") {
            errors.remove("companyId");
            errors.remove("contactId");
        }
        errors.remove(name);

        this.validator.validate(name, value).then(() => {
            this.setState({ errors, err: `${name}` });
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        const order = this.state.order;
        const { errors } = this.validator;

        this.validator.validateAll(order).then(success => {
            if (success && order.items.length > 0) {
                this.setState({ err: "success" });
                this.submit(order);
            } else if (order.items.length < 1) {
                showNotification("Order Item can not be empty", "error");
            } else {
                this.setState({ errors, err: "error" });
            }
        });
    }

    submit(order) {
        this.props
            .dispatch(orderUpdateRequest(order))
            .then(msg => {
                showNotification(msg, "success");
                this.props.history.push("/app/crm/orders");
            })
            .catch(({ error, statusCode }) => {
                const { errors } = this.validator;

                if (statusCode === 422) {
                    _.forOwn(error, (message, field) => {
                        errors.add(field, message);
                    });
                    showNotification("Invalid input", "error");
                }
                this.setState({ errors, order, err: "errors" });
            });
    }

    render() {
        return (
            <main className="page-container" role="main">
                <ol className="breadcrumb">
                    <li>
                        <Link to="/app/crm">CRM</Link>
                    </li>
                    <li>
                        <Link to="/app/crm/orders">Orders</Link>
                    </li>
                    <li className="active">Edit Order</li>
                </ol>
                <div className="page-content">
                    <div className="card">
                        <div className="card-header">
                            <div className="card-title"> Edit Order </div>{" "}
                            <div className="heading-elements">
                                <Link
                                    to="/app/crm/orders"
                                    className="btn btn-primary btn-sm"
                                >
                                    Orders
                                </Link>
                                <Link
                                    to={`/app/crm/orders/${this.state.order.id}`}
                                    className="btn btn-primary btn-sm"
                                >
                                    Show Details
                                </Link>
                            </div>
                        </div>
                        <div className="card-body">
                            <Form
                                {...this.state}
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
