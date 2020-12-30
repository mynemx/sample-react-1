// import libs
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import CampaignList from "../../../models/CampaignList";

// import components
import Page from "./Page";

const mapStateToProps = (state, router) => {
    //   const {data, ...meta} = state.administration.users
    const { params } = router.match;
    const campaignList =
        state.cc.campaignLists.data.find(
            campaign => campaign.id === Number(params.id)
        ) || {};
    const users = state.administration.users;

    return {
        campaignList: new CampaignList(campaignList),
        users
    };
};

export default withRouter(connect(mapStateToProps)(Page));
