// import libs
import { connect } from "react-redux";
import AgentFAQTopic from "../../../models/AgentFAQTopic";

// import components
import Page from "./Page";

const mapStateToProps = state => {
    const agentFAQTopics = state.help.agentFAQTopics || [];

    return {
        agentFAQTopics: agentFAQTopics.map(obj => new AgentFAQTopic(obj))
    };
};

export default connect(mapStateToProps)(Page);
