import { connect } from "react-redux";
import Contact from "../../../models/Contact";
import { withRouter } from "react-router-dom";
// import components
import Page from "./Page";

const mapStateToProps = (state, router) => {
    const { params } = router.match;
    const contact =
        state.crm.contacts.data.find(
            contact => contact.id === Number(params.id)
        ) || {};
    return {
        contact: new Contact(contact)
    };
};

export default withRouter(connect(mapStateToProps)(Page));
