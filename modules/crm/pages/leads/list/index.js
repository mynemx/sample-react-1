// import libs
import { connect } from "react-redux";
import Lead from "../../../models/Lead";

// import components
import Page from "./Page";

const mapStateToProps = state => {
    //   const {data, ...meta} = state.administration.users
    const { data, meta } = state.crm.leads;

    return {
        leads: data.map(lead => new Lead(lead)),
        leadStatuses: state.settings.leadStatuses || [],
        sources: state.settings.sources || [],
        industries: state.settings.industries || [],
        users: state.administration.users || [],
        meta: Object.assign({}, meta)
    };
};

export default connect(mapStateToProps)(Page);
