// import libs
import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import ReeValidate from "ree-validate";
import {
    categoryAddRequest,
    categoryListRequest,
    categoryUpdateRequest,
    categoryRemoveRequest
} from "../service";

import ProductCategory from "../../../models/ProductCategory";
import { showNotification } from "../../../../../utils/Notification";

// import components
import Form from "./components/Form";
import CategoryRow from "./components/CategoryRow";
import Pagination from "../../../../../utils/Pagination";
import { Link } from "react-router-dom";

class Page extends PureComponent {
    static displayName = "UsersPage";
    static propTypes = {
        productCategories: PropTypes.array.isRequired,
        dispatch: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        const category = this.props.category.toJson();

        this.validator = new ReeValidate({
            name: "required|min:3",
            parentCategoryId: ""
        });

        this.state = {
            editMode: false,
            category,
            err: "init",
            errors: this.validator.errors
        };
        this.handleRemove = this.handleRemove.bind(this);
        this.pageChange = this.pageChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleClearMode = this.handleClearMode.bind(this);
    }

    componentDidMount() {
        const { dispatch } = this.props;

        dispatch(categoryListRequest({}));
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const category = nextProps.category.toJson();
        const productCategories = nextProps.productCategories;

        if (
            !_.isEqual(this.state.category, category) &&
            !this.state.category.id
        ) {
            this.setState({ category });
        }
    }

    pageChange(pageNumber) {
        this.props.dispatch(categoryListRequest({ pageNumber }));
    }

    handleEdit(category) {
        this.setState({ editMode: true, category });
    }

    handleClearMode(e) {
        // e.preventDefault();
        let errors = this.state.errors;
        errors.items = [];
        const category = new ProductCategory({});
        this.setState({ editMode: false, category });
    }

    handleChange(name, value) {
        const { errors } = this.validator;
        const category = Object.assign(
            {},
            { ...this.state.category, [name]: value }
        );

        this.setState({ category });

        errors.remove(name);
        this.validator.validate(name, value).then(() => {
            this.setState({ errors, err: `${name}:${value}` });
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        const category = this.state.category;
        const { errors } = this.validator;
        this.validator.validateAll(category).then(success => {
            if (success) {
                let err = "success";
                this.setState({ err });
                this.submit(category);
            } else {
                let err = "error";
                this.setState({ errors, err });
            }
        });
    }

    submit(category) {
        this.props
            .dispatch(
                category.id
                    ? categoryUpdateRequest(category)
                    : categoryAddRequest(category)
            )
            .then(msg => {
                this.handleClearMode();
                showNotification(msg, "success");
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
                this.setState({ errors, err, category });
            });
    }

    handleRemove(id) {
        this.props.dispatch(categoryRemoveRequest(id));
    }

    renderCategories() {
        return this.props.productCategories.map((category, index) => {
            return (
                <CategoryRow
                    key={index}
                    category={category}
                    index={index}
                    handleRemove={this.handleRemove}
                    handleEdit={this.handleEdit}
                />
            );
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
                        <Link to="/app/company/administration/product-categories">
                            Product Categories
                        </Link>{" "}
                    </li>
                </ol>
                <div className="page-content">
                    <div className="card">
                        <div className="card-header">
                            <div className="card-title">Product Categories</div>
                            <div className="heading-elements"></div>
                        </div>
                        <div className="card-body">
                            <div className="table-responsive">
                                <ul className="list-group">
                                    <li className="list-group-item pb-0">
                                        <Form
                                            err={this.state.err}
                                            editMode={this.state.editMode}
                                            category={this.state.category}
                                            errors={this.state.errors}
                                            productCategories={
                                                this.props.productCategories
                                            }
                                            onClearMode={this.handleClearMode}
                                            onChange={this.handleChange}
                                            onSubmit={this.handleSubmit}
                                        />
                                    </li>
                                    {this.renderCategories()}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        );
    }
}

export default Page;
