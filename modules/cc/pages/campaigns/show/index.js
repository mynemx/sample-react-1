import { connect } from "react-redux";
import Campaign from "../../../models/Campaign";
import { withRouter } from "react-router-dom";
// import components
import Page from "./Page";

const mapStateToProps = (state, router) => {
    const { params } = router.match;
    const campaign =
        state.cc.callCampaigns.data.find(
            campaign => campaign.id === Number(params.id)
        ) || {};

    return {
        campaign: new Campaign(campaign),
        user: state.user,
        calls: state.cc.callEvents.calls || []
    };
};

export default withRouter(connect(mapStateToProps)(Page));
