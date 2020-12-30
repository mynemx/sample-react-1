// import libs
import { connect } from "react-redux";
import CampaignList from "../../../models/CampaignList";

// import components
import Page from "./Page";

const mapStateToProps = state => {
    const { data, meta } = state.cc.campaignLists;

    return {
        campaignLists: data.map(obj => new CampaignList(obj)),
        meta: Object.assign({}, meta)
    };
};

export default connect(mapStateToProps)(Page);
