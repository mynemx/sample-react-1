// import libs
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import AgentFAQTopic from "../../../models/AgentFAQTopic";

// import components
import Page from "./Page";

const mapStateToProps = (state, router) => {
    const { params } = router.match;
    const agentFAQTopic = state.help.agentFAQTops.find(topic => topic.id === Number(params.id));

    return {
        agentFAQTopic: new AgentFAQTopic(agentFAQTopic),
    };
};

export default withRouter(connect(mapStateToProps)(Page));
