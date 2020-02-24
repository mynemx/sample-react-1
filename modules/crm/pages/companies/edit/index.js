// import libs
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Company from "../../../models/Company";

// import components
import Page from "./Page";

const mapStateToProps = (state, router) => {
    //   const {data, ...meta} = state.administration.users
    const { params } = router.match;
    const company =
        state.crm.companies.data.find(
            company => company.id === Number(params.id)
        ) || {};
    const users = state.administration.users;
    const departments = state.settings.departments || [];
    const companyCategories = state.settings.companyCategories || [];
    const companyTypes = state.settings.companyTypes || [];
    const sources = state.settings.sources || [];
    const currencies = state.settings.currencies || [];
    const employeeSizes = state.settings.employeeSizes || [];
    const countries = state.settings.countries || [];
    const industries = state.settings.industries || [];

    return {
        company: new Company(company),
        users,
        departments,
        companyCategories,
        companyTypes,
        sources,
        currencies,
        industries,
        countries,
        employeeSizes
    };
};

export default withRouter(connect(mapStateToProps)(Page));
