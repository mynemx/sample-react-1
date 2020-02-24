// import libs
import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import moment from "moment";

// import components
import List from "./components/List";
import { Link, NavLink, Switch, Route } from "react-router-dom";

class Page extends PureComponent {
    static displayName = "CompaniesPage";
    static propTypes = {
        companies: PropTypes.array.isRequired,
        dispatch: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <main className="page-container" role="main">
                <ol className="breadcrumb">
                    <li>
                        <Link to="/app/crm"> CRM </Link>
                    </li>
                    <li>
                        <Link to="/app/crm/companies">
                            {" "}
                            Companies ({this.props.meta.total}){" "}
                        </Link>
                    </li>
                </ol>
                <div className="page-content">
                    <ul className="nav nav-tabs justify-content-start mb-2">
                        <li className="nav-item">
                            <NavLink
                                className="nav-link"
                                exact
                                activeClassName="active"
                                to="/app/crm/companies"
                            >
                                All
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                className="nav-link"
                                exact
                                activeClassName="active"
                                to="/app/crm/companies/archives"
                            >
                                Archives
                            </NavLink>
                        </li>
                    </ul>
                    {<List {...this.props} />}
                </div>
            </main>
        );
    }
}

export default Page;
