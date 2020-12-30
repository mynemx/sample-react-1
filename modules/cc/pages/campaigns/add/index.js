// import libs
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Campaign from "../../../models/Campaign";

// import components
import Page from "./Page";

const mapStateToProps = state => {
    //   const {data, ...meta} = state.administration.users
    const campaign = new Campaign({});
    const users = state.administration.users;
    const contactCategories = state.settings.contactCategories || [];
    const contactTypes = state.settings.contactTypes || [];
    const companyCategories = state.settings.companyCategories || [];
    const leadStatuses = state.settings.leadStatuses || [];
    const companyTypes = state.settings.companyTypes || [];
    const industries = state.settings.industries || [];
    const sipExtensions = state.cc.sipExtensions || [];
    const sources = state.settings.sources || [];
    const callGateways = state.cc.callGateways || [];

    return {
        campaign,
        users,
        contactCategories,
        contactTypes,
        companyCategories,
        leadStatuses,
        industries,
        companyTypes,
        sipExtensions,
        callGateways,
        sources
    };
};

export default withRouter(connect(mapStateToProps)(Page));
