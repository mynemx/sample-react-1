import { connect } from "react-redux";
import CampaignList from "../../../models/CampaignList";
import { withRouter } from "react-router-dom";
// import components
import Page from "./Page";

const mapStateToProps = (state, router) => {
    const { params } = router.match;
    const campaignList =
        state.cc.campaignLists.data.find(
            list => list.id === Number(params.id)
        ) || {};
    const contactCategories = state.settings.contactCategories || [];
    const contactTypes = state.settings.contactTypes || [];
    const leadStatuses = state.settings.leadStatuses || [];
    const companyCategories = state.settings.companyCategories || [];
    const industries = state.settings.industries || [];
    const companyTypes = state.settings.companyTypes || [];
    const sources = state.settings.sources || [];
    return {
        campaignList: new CampaignList(campaignList),
        companyCategories,
        companyTypes,
        contactCategories,
        contactTypes,
        leadStatuses,
        industries,
        sources
    };
};

export default withRouter(connect(mapStateToProps)(Page));
