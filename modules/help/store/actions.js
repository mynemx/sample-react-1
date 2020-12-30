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

/* Agent FAQ */
export function addAgentFAQ(payload) {
    return {
        type: AGENT_FAQ_ADD,
        payload
    };
}

export function updateAgentFAQ(payload) {
    return {
        type: AGENT_FAQ_UPDATE,
        payload
    };
}

export function removeAgentFAQ(payload) {
    return {
        type: AGENT_FAQ_REMOVE,
        payload
    };
}

export function listAgentFAQ(payload) {
    return {
        type: AGENT_FAQ_LIST,
        payload
    };
}

/* Agent FAQ */
export function addAgentFAQTopic(payload) {
    return {
        type: AGENT_FAQ_TOPIC_ADD,
        payload
    };
}

export function updateAgentFAQTopic(payload) {
    return {
        type: AGENT_FAQ_TOPIC_UPDATE,
        payload
    };
}

export function removeAgentFAQTopic(payload) {
    return {
        type: AGENT_FAQ_TOPIC_REMOVE,
        payload
    };
}

export function listAgentFAQTopic(payload) {
    return {
        type: AGENT_FAQ_TOPIC_LIST,
        payload
    };
}


