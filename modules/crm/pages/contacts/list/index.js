// import libs
import { connect } from "react-redux";
import Contact from "../../../models/Contact";

// import components
import Page from "./Page";

const mapStateToProps = state => {
    //   const {data, meta} = state.administration.users
    const { data, meta } = state.crm.contacts;
    const contactCategories = state.settings.contactCategories || [];
    const contactTypes = state.settings.contactTypes || [];
    const sources = state.settings.sources || [];

    return {
        contacts: data.map(contact => new Contact(contact)),
        meta: Object.assign({}, meta),
        contactCategories,
        contactTypes,
        sources
    };
};

export default connect(mapStateToProps)(Page);
