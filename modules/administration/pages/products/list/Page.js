// import libs
import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import {
    productListRequest,
    productUpdateRequest,
    productRemoveRequest
} from "../service";

// import components
import ProductRow from "./components/ProductRow";
import Pagination from "../../../../../utils/Pagination";
import { Link } from "react-router-dom";
import SearchText from "../../../../../utils/SearchText";
import SearchDropdown from "../../../../../utils/SearchDropdown";

class Page extends PureComponent {
    static displayName = "UsersPage";
    static propTypes = {
        products: PropTypes.array.isRequired,
        productCategories: PropTypes.array.isRequired,
        dispatch: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            showFilter: false,
            filter: {
                name: "",
                category: "",
                limits: 200
            }
        };

        this.handleChecked = this.handleChecked.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.toggleFilter = this.toggleFilter.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.pageChange = this.pageChange.bind(this);
    }

    componentDidMount() {
        const { dispatch } = this.props;

        dispatch(productListRequest({}));
    }

    pageChange(pageNumber) {
        const form = Object.assign({}, { ...this.state.filter, pageNumber });
        this.props.dispatch(productListRequest(form));
        this.setState({ showFilter: false });
    }

    handleRemove(id) {
        this.props.dispatch(productRemoveRequest(id));
    }

    handleChange(name, value) {
        const filter = Object.assign(
            {},
            { ...this.state.filter, [name]: value }
        );
        this.setState({ filter });
    }

    handleChecked(name, value, status) {
        if (status) {
            const obj = [...this.state.filter[name], value];
            const filter = Object.assign(
                {},
                { ...this.state.filter, [name]: obj }
            );
            this.setState({ filter });
        } else {
            const obj = this.state.filter[name].filter(item => item !== value);
            const filter = Object.assign(
                {},
                { ...this.state.filter, [name]: obj }
            );
            this.setState({ filter });
        }
    }

    toggleFilter() {
        this.setState({ showFilter: !this.state.showFilter });
    }

    renderFilter() {
        const { filter } = this.state;
        const { productCategories } = this.props;
        return (
            <div className="row">
                <div className="floating-label col">
                    <SearchText
                        label="Name"
                        name="name"
                        value={filter.name}
                        onChange={this.handleChange}
                    />
                </div>

                <div className="floating-label col">
                    <SearchDropdown
                        label="Product Category"
                        name="category"
                        list={productCategories}
                        field="id"
                        value={filter.category}
                        onChange={this.handleChange}
                        displayField="name"
                    />
                </div>
                <div className="floating-label col">
                    <SearchText
                        label="Limits"
                        name="limits"
                        value={filter.limits}
                        onChange={this.handleChange}
                    />
                </div>

                <div className="floating-label col">
                    <button
                        onClick={e => this.pageChange(1)}
                        type="button"
                        className="btn btn-sm btn-primary"
                    >
                        Filter
                    </button>
                </div>
            </div>
        );
    }

    renderProducts() {
        return this.props.products.map((product, index) => {
            return (
                <ProductRow
                    key={index}
                    product={product}
                    index={index}
                    handleRemove={this.handleRemove}
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
                        <Link to="/app/company/administration/products">
                            Products ({this.props.meta.total})
                        </Link>
                    </li>
                </ol>
                <div className="page-content">
                    <div className="card">
                        <div className="card-header ">
                            <h5 className="card-title ">
                                Products({this.props.meta.count})
                            </h5>
                            <div className="heading-elements">
                                <Link
                                    to="products/add"
                                    className="btn btn-success btn-sm"
                                >
                                    Add Product
                                </Link>
                                <button
                                    className="btn btn-primary btn-sm"
                                    onClick={e => this.toggleFilter()}
                                >
                                    Filter
                                </button>
                            </div>
                        </div>
                        <div className="card-body">
                            {this.state.showFilter ? this.renderFilter() : ""}
                            <div className="table-responsive">
                                <table className="table table-hover table-sm">
                                    <thead className="">
                                        <tr>
                                            <th>#</th>
                                            <th>Name</th>
                                            <th>Category</th>
                                            <th>Description</th>
                                            <th>Price</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>{this.renderProducts()}</tbody>
                                </table>
                            </div>
                            <Pagination
                                meta={this.props.meta}
                                onChange={this.pageChange}
                            />
                        </div>
                    </div>
                </div>
            </main>
        );
    }
}

export default Page;
