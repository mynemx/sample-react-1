// import libs
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Lead from "../../../models/Lead";

// import components
import Page from "./Page";

const mapStateToProps = state => {
    const lead = new Lead({});
    const users = state.administration.users;
    const leadStatuses = state.settings.leadStatuses || [];
    const sources = state.settings.sources || [];
    const countries = state.settings.countries || [];
    const industries = state.settings.industries || [];

    return {
        lead,
        users,
        leadStatuses,
        sources,
        countries,
        industries
    };
};

export default withRouter(connect(mapStateToProps)(Page));
