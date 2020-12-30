import {
    EXTENSION_ADD,
    EXTENSION_UPDATE,
    EXTENSION_REMOVE,
    EXTENSION_LIST,
    GATEWAY_LIST,
    GATEWAY_ADD,
    GATEWAY_UPDATE,
    GATEWAY_REMOVE,
    CAMPAIGN_ADD,
    CAMPAIGN_UPDATE,
    CAMPAIGN_REMOVE,
    CAMPAIGN_LIST,
    CAMPAIGN_LIST_ADD,
    CAMPAIGN_LIST_UPDATE,
    CAMPAIGN_LIST_REMOVE,
    CAMPAIGN_LIST_LIST,
    FEEDBACK_LIST,
    FEEDBACK_ADD,
    FEEDBACK_UPDATE,
    FEEDBACK_REMOVE,
    CALLBACK_LIST,
    CALLBACK_ADD,
    CALLBACK_UPDATE,
    CALLBACK_REMOVE,
    CALL_LOG_LIST,
    CALL_LOG_ADD,
    CALL_LOG_UPDATE,
    SOCKET_INIT,
    CALL_EVENT_LIST,
    CALL_EVENT_ADD,
    CALL_UPDATE,
    CALL_ADD,
    MY_CALL_ADD,
    MY_CALL_LIST,
    MY_CALL_UPDATE,
    MY_CALL_REMOVE
} from "./action-types";

/* Extension */
export function addExtension(payload) {
    return {
        type: EXTENSION_ADD,
        payload
    };
}

export function updateExtension(payload) {
    return {
        type: EXTENSION_UPDATE,
        payload
    };
}

export function removeExtension(payload) {
    return {
        type: EXTENSION_REMOVE,
        payload
    };
}

export function listExtension(payload) {
    return {
        type: EXTENSION_LIST,
        payload
    };
}
/* Gateway */
export function addGateway(payload) {
    return {
        type: GATEWAY_ADD,
        payload
    };
}

export function updateGateway(payload) {
    return {
        type: GATEWAY_UPDATE,
        payload
    };
}

export function removeGateway(payload) {
    return {
        type: GATEWAY_REMOVE,
        payload
    };
}

export function listGateway(payload) {
    return {
        type: GATEWAY_LIST,
        payload
    };
}

/* Campaign */
export function addCampaign(payload) {
    return {
        type: CAMPAIGN_ADD,
        payload
    };
}

export function updateCampaign(payload) {
    return {
        type: CAMPAIGN_UPDATE,
        payload
    };
}

export function removeCampaign(payload) {
    return {
        type: CAMPAIGN_REMOVE,
        payload
    };
}

export function listCampaign(payload) {
    return {
        type: CAMPAIGN_LIST,
        payload
    };
}

/* Campaign List */
export function addCampaignList(payload) {
    return {
        type: CAMPAIGN_LIST_ADD,
        payload
    };
}

export function updateCampaignList(payload) {
    return {
        type: CAMPAIGN_LIST_UPDATE,
        payload
    };
}

export function removeCampaignList(payload) {
    return {
        type: CAMPAIGN_LIST_REMOVE,
        payload
    };
}

export function listCampaignList(payload) {
    return {
        type: CAMPAIGN_LIST_LIST,
        payload
    };
}

/* Feedback  */
export function addFeedback(payload) {
    return {
        type: FEEDBACK_ADD,
        payload
    };
}

export function updateFeedback(payload) {
    return {
        type: FEEDBACK_UPDATE,
        payload
    };
}

export function removeFeedback(payload) {
    return {
        type: FEEDBACK_REMOVE,
        payload
    };
}

export function listFeedback(payload) {
    return {
        type: FEEDBACK_LIST,
        payload
    };
}

/* Callback  */
export function addCallBack(payload) {
    return {
        type: CALLBACK_ADD,
        payload
    };
}

export function updateCallBack(payload) {
    return {
        type: CALLBACK_UPDATE,
        payload
    };
}

export function removeCallBack(payload) {
    return {
        type: CALLBACK_REMOVE,
        payload
    };
}

export function listCallBack(payload) {
    return {
        type: CALLBACK_LIST,
        payload
    };
}

/* Call Log  */
export function addCallLog(payload) {
    return {
        type: CALL_LOG_ADD,
        payload
    };
}

export function updateCallLog(payload) {
    return {
        type: CALL_LOG_UPDATE,
        payload
    };
}

export function listCallLog(payload) {
    return {
        type: CALL_LOG_LIST,
        payload
    };
}

/* Call Event  */
export function addCallEvent(payload) {
    return {
        type: CALL_EVENT_ADD,
        payload
    };
}

export function updateCall(payload) {
    return {
        type: CALL_UPDATE,
        payload
    };
}

export function listCallEvent(payload) {
    return {
        type: CALL_EVENT_LIST,
        payload
    };
}

export function addCall(payload) {
    return {
        type: CALL_ADD,
        payload
    };
}

/* MY Call  */
export function addMyCall(payload) {
    return {
        type: MY_CALL_ADD,
        payload
    };
}

export function updateMyCall(payload) {
    return {
        type: MY_CALL_UPDATE,
        payload
    };
}

export function removeMyCall(payload) {
    return {
        type: MY_CALL_REMOVE,
        payload
    };
}

export function listMyCall(payload) {
    return {
        type: MY_CALL_LIST,
        payload
    };
}

export function initSocket(payload) {
    return {
        type: SOCKET_INIT,
        payload
    };
}
