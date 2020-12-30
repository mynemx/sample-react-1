// import libs
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import CampaignList from "../../../models/CampaignList";

// import components
import Page from "./Page";

const mapStateToProps = state => {
    const campaignList = new CampaignList({});
    const users = state.administration.users;

    return {
        campaignList,
        users
    };
};

export default withRouter(connect(mapStateToProps)(Page));
