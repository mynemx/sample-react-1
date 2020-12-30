// import libs
import { connect } from "react-redux";
import Campaign from "../../../models/Campaign";

// import components
import Page from "./Page";

const mapStateToProps = state => {
    const users = state.administration.users;
    const { data, meta } = state.cc.callCampaigns;

    return {
        campaigns: data.map(campaign => new Campaign(campaign)),
        meta: Object.assign({}, meta),
        users
    };
};

export default connect(mapStateToProps)(Page);
