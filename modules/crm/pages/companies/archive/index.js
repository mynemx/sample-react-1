// import libs
import { connect } from "react-redux";
import Company from "../../../models/Company";

// import components
import Page from "./Page";

const mapStateToProps = state => {
    const { data, meta } = state.crm.companies;
    const companyCategories = state.settings.companyCategories || [];
    const companyTypes = state.settings.companyTypes || [];
    const sources = state.settings.sources || [];
    const industries = state.settings.industries || [];

    return {
        companies: data.map(company => new Company(company)),
        meta: Object.assign({}, meta),
        companyCategories,
        companyTypes,
        sources,
        industries
    };
};

export default connect(mapStateToProps)(Page);
