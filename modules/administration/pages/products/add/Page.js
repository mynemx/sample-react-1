// import libs
import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import Form from "./components/Form";
import ReeValidate from "ree-validate";
import { Redirect } from "react-router-dom";
import {
    productAddRequest,
    productUpdateRequest,
    productEditRequest
} from "../service";
import { showNotification } from "../../../../../utils/Notification";
import Product from "../../../models/Product";

// import components
import { Link } from "react-router-dom";
import { authPageLoading } from "../../../../auth/store/actions";

class Page extends PureComponent {
    static displayName = "ProductsPage";
    static propTypes = {
        match: PropTypes.object.isRequired,
        product: PropTypes.object.isRequired,
        currencies: PropTypes.array.isRequired,
        productCategories: PropTypes.array.isRequired,
        dispatch: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.validator = new ReeValidate({
            name: "required|min:3|max:200",
            description: "required|min:3|max:200",
            currencyId: "required",
            productCategoryId: "required",
            price: "required|max:20"
        });

        const product = this.props.product.toJson();

        this.state = {
            product,
            err: "init",
            errors: this.validator.errors
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const product = nextProps.product.toJson();

        if (!_.isEqual(this.state.product, product) && !this.state.product.id) {
            this.setState({ product });
        }
    }

    componentDidMount() {
        this.props.dispatch(authPageLoading(false));
        this.loadProduct();
    }

    loadProduct() {
        const { match, product, dispatch } = this.props;

        if (product.id == null || product.id == undefined || product.id == "") {
            if (match.params.id != undefined) {
                dispatch(productEditRequest(match.params.id));
            }
        }
    }

    handleChange(name, value) {
        const { errors } = this.validator;
        const product = Object.assign(
            {},
            { ...this.state.product, [name]: value }
        );

        this.setState({ product });

        errors.remove(name);

        this.validator.validate(name, value).then(() => {
            let err = `${name}:${value}`;
            this.setState({ errors, err });
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        const product = this.state.product;
        const { errors } = this.validator;

        this.validator.validateAll(product).then(success => {
            if (success) {
                let err = "success";
                this.setState({ err });
                this.submit(product);
            } else {
                let err = "error";
                this.setState({ errors, err });
            }
        });
    }

    submit(product) {
        this.props
            .dispatch(
                product.id != undefined && product.id != ""
                    ? productUpdateRequest(product)
                    : productAddRequest(product)
            )
            .then(msg => {
                const product = new Product({});
                showNotification(msg, "success");
                this.setState({ product });
                this.props.history.push("/app/company/administration/products");
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
                this.setState({ errors, err, product });
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
                        <Link to="/app/company/administration/products">
                            Products
                        </Link>
                    </li>
                    <li className="active">
                        {this.state.product.id ? "Edit Product" : "Add Product"}
                    </li>
                </ol>
                <div className="page-content">
                    <div className="card">
                        <div className="card-body">
                            <Form
                                product={this.state.product}
                                err={this.state.err}
                                errors={this.state.errors}
                                productCategories={this.props.productCategories}
                                currencies={this.props.currencies}
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
