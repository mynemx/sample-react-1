import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Company from "../../../models/Company";

// import components
import Page from "./Page";

const mapStateToProps = (state, router) => {
    const { params } = router.match;
    const company =
        state.crm.companies.data.find(
            company => company.id === Number(params.id)
        ) || {};
    return {
        company: new Company(company)
    };
};

export default withRouter(connect(mapStateToProps)(Page));
