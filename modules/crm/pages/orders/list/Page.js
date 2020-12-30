// import libs
import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import {
    orderListRequest,
    orderUpdateRequest,
    orderRemoveRequest
} from "../service";

// import components
import OrderRow from "./components/OrderRow";
import Pagination from "../../../../../utils/Pagination";
import SearchDate from "../../../../../utils/SearchDate";
import SearchDropdown from "../../../../../utils/SearchDropdown";
import SearchText from "../../../../../utils/SearchText";
import SearchCheckbox from "../../../../../utils/SearchCheckbox";
import { Link } from "react-router-dom";
import { authPageLoading } from "../../../../auth/store/actions";
import { userAddRequest } from "../../../../administration/pages/users/service";

class Page extends PureComponent {
    static displayName = "UsersPage";
    static propTypes = {
        orders: PropTypes.array.isRequired,
        dispatch: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            showFilter: false,
            filter: {
                name: "",
                sales_rep_id: '',
                sources: [],
                order_date: '',
                limits: 50
            }
        };

        this.handleChecked = this.handleChecked.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.toggleFilter = this.toggleFilter.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.pageChange = this.pageChange.bind(this);
    }

    componentDidMount() {
        const { dispatch, orders } = this.props;
        dispatch(authPageLoading(false));
        const form = Object.assign(
            {},
            { ...this.state.filter, loader: orders.length < 5 ? true : false }
        );
        dispatch(orderListRequest(form));
    }

    pageChange(pageNumber) {
        const form = Object.assign({}, { ...this.state.filter, pageNumber });
        this.props.dispatch(orderListRequest(form));
        this.setState({ showFilter: false });
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

    handleRemove(id) {
        this.props.dispatch(orderRemoveRequest(id));
    }

    toggleFilter() {
        this.setState({ showFilter: !this.state.showFilter });
    }

    renderFilter() {
        const { filter } = this.state;
        const { users, sources } = this.props;
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
                        label="Sales Rep"
                        name="sales_rep_id"
                        list={users}
                        field="id"
                        displayField="name"
                        value={filter.sales_rep_id}
                        onChange={this.handleChange}
                    />
                </div>
                <div className="floating-label col">
                    <SearchCheckbox
                        label="Source"
                        name="sources"
                        options={sources}
                        field="name"
                        value={filter.sources}
                        onChange={this.handleChecked}
                        displayField="name"
                    />
                </div>
                <div className="floating-label col">
                    <SearchDate
                        label="Month"
                        name="order_date"
                        value={filter.order_date}
                        onChange={this.handleChange}
                    />
                </div>
                <div className="floating-label col">
                    <SearchText
                        label="Limit"
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


    renderOrders() {
        return this.props.orders.map((order, index) => {
            return (
                <OrderRow
                    key={order.id}
                    order={order}
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
                        <Link to="/app/crm">CRM</Link>
                    </li>
                    <li>
                        <Link to="/app/crm/orders">
                            Orders ({this.props.meta.total})
                        </Link>
                    </li>
                </ol>
                <div className="page-content">
                    <div className="card">
                        <div className="card-header">
                            <div className="card-title">
                                Orders({this.props.meta.count})
                            </div>
                            <div className="heading-elements">
                                <Link
                                    to="orders/add"
                                    className="btn btn-primary btn-sm"
                                >
                                    Add Order
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
                                <table className="table table-striped table-sm">
                                    <thead className="">
                                        <tr>
                                            <th>#</th>
                                            <th>Order No</th>
                                            <th>Client Name</th>
                                            <th>Contact Number</th>
                                            <th>Sales Rep</th>
                                            <th>Source</th>
                                            <th>Ordered Date</th>
                                            <th>Status</th>
                                            <th>Price</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>{this.renderOrders()}</tbody>
                                </table>
                            </div>
                        </div>
                        <Pagination
                            meta={this.props.meta}
                            onChange={this.pageChange}
                        />
                    </div>
                </div>
            </main>
        );
    }
}

export default Page;
