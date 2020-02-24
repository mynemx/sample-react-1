// import libs
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Contact from "../../../models/Contact";

// import components
import Page from "./Page";

const mapStateToProps = (state, router) => {
    //   const {data, ...meta} = state.administration.users
    const { params } = router.match;
    const contact =
        state.crm.contacts.data.find(
            contact => contact.id === Number(params.id)
        ) || {};
    const users = state.administration.users;
    const departments = state.settings.departments || [];
    const contactCategories = state.settings.contactCategories || [];
    const contactTypes = state.settings.contactTypes || [];
    const sources = state.settings.sources || [];
    const salutations = state.settings.salutations || [];
    const countries = state.settings.countries || [];

    return {
        contact: new Contact(contact),
        users,
        departments,
        contactCategories,
        contactTypes,
        sources,
        countries,
        salutations
    };
};

export default withRouter(connect(mapStateToProps)(Page));
