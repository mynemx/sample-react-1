import * as actions from "./actions";
import {
    AGENT_FAQ_LIST,
    AGENT_FAQ_ADD,
    AGENT_FAQ_UPDATE,
    AGENT_FAQ_REMOVE,
    AGENT_FAQ_TOPIC_LIST,
    AGENT_FAQ_TOPIC_ADD,
    AGENT_FAQ_TOPIC_UPDATE,
    AGENT_FAQ_TOPIC_REMOVE,
} from "./action-types";

const initialState = {
    agentFAQTopics: [],
    agentFAQs: {
        data: [],
        meta: {}
    },
};

const reducer = (state = initialState, { type, payload = null }) => {
    switch (type) {
        case AGENT_FAQ_ADD:
            return addAgentFAQ(state, payload);
        case AGENT_FAQ_UPDATE:
            return updateAgentFAQ(state, payload);
        case AGENT_FAQ_REMOVE:
            return removeAgentFAQ(state, payload);
        case AGENT_FAQ_LIST:
            return listAgentFAQ(state, payload);
        case AGENT_FAQ_TOPIC_ADD:
            return addAgentFAQTopic(state, payload);
        case AGENT_FAQ_TOPIC_UPDATE:
            return updateAgentFAQTopic(state, payload);
        case AGENT_FAQ_TOPIC_REMOVE:
            return removeAgentFAQTopic(state, payload);
        case AGENT_FAQ_TOPIC_LIST:
            return listAgentFAQTopic(state, payload);
        default:
            return state;
    }
};

/* Extension */

function addAgentFAQ(state, payload) {
    
    const agentFAQs = state.agentFAQs.data.find(
        obj => obj.id === payload.id
    );

    if (!agentFAQs) {
        const data = [...state.agentFAQs.data, payload];
        const agentFAQs = Object.assign({}, state.agentFAQs, { data });
        return Object.assign({}, state, { agentFAQs });
    }

    return updateAgentFAQ(state, payload);
}

function updateAgentFAQ(state, payload) {

    const data = state.agentFAQs.data.map(obj => {
        if (obj.id === payload.id) {
            return { ...obj, ...payload };
        }
        return obj;
    });

    const agentFAQs = Object.assign({}, state.agentFAQs, { data });
    return Object.assign({}, state, { agentFAQs });
}

function removeAgentFAQ(state, id) {

    const agentFAQs = Object.assign({}, state.agentFAQs, { data });
    return Object.assign({}, state, { agentFAQs });
}

function listAgentFAQ(state, payload) {

    const agentFAQs = payload;
    return Object.assign({}, state, { agentFAQs });
}


function addAgentFAQTopic(state, payload) {
    

    const agentFAQTopic = state.agentFAQTopics.find(obj => obj.id === payload.id);

    if (!agentFAQTopic) {
        const agentFAQTopics = [...state.agentFAQTopics, payload];
        return Object.assign({}, state, { agentFAQTopics });
    }


    return updateAgentFAQTopic(state, payload);
}

function updateAgentFAQTopic(state, payload) {
    const agentFAQTopics = state.agentFAQTopics.map(obj => {
        if (obj.id === payload.id) {
            return { ...obj, ...payload };
        }
        return obj;
    });

    return Object.assign({}, state, { agentFAQTopics });
}

function removeAgentFAQTopic(state, id) {
    const agentFAQTopics = state.agentFAQTopics.filter(obj => obj.id !== id);

    return Object.assign({}, state, { agentFAQTopics });
}

function listAgentFAQTopic(state, payload) {
    const agentFAQTopics = payload.map(obj => {
        return obj;
    });
    return Object.assign({}, state, { agentFAQTopics });

}





export default reducer;
