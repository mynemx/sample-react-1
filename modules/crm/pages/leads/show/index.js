import { connect } from "react-redux";
import Lead from "../../../models/Lead";
import { withRouter } from "react-router-dom";
// import components
import Page from "./Page";

const mapStateToProps = (state, router) => {
    const { params } = router.match;
    const lead =
        state.crm.leads.data.find(lead => lead.id === Number(params.id)) || {};
    const leadStatuses = state.settings.leadStatuses || [];
    return {
        lead: new Lead(lead),
        leadStatuses
    };
};

export default withRouter(connect(mapStateToProps)(Page));
