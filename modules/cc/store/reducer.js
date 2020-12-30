import socketIOClient from "socket.io-client";
import * as actions from "./actions";
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
    FEEDBACK_ADD,
    FEEDBACK_UPDATE,
    FEEDBACK_REMOVE,
    FEEDBACK_LIST,
    CALLBACK_ADD,
    CALLBACK_UPDATE,
    CALLBACK_REMOVE,
    CALLBACK_LIST,
    CALL_LOG_ADD,
    CALL_LOG_UPDATE,
    CALL_LOG_LIST,
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
import { array, object } from "prop-types";
import store from "../../../store";
import Transformer from "../../../utils/Transformer";

const rootUrl = document.querySelector("body").getAttribute("data-root-url");

let notificationSound = new Audio(`${rootUrl}/sound/notification.ogg`);
notificationSound.load();

// const socketUrl = window.location.hostname + ":8001";
const socketUrl = "wemy.techmadeeazy.com" + ":8001";
// const socketUrl = "wemy-sip.techmadeeazy.com" + ":8001";
// const socketUrl = "18.134.63.171" + ":8001";
const socket = socketIOClient(socketUrl);

function transformResponse(params) {
    return Transformer.fetch(params);
}

const initialState = {
    sipExtensions: [],
    callGateways: [],
    callCampaigns: {
        data: [],
        meta: {}
    },
    campaignLists: {
        data: [],
        meta: {}
    },
    callFeedbacks: {
        data: [],
        meta: {}
    },
    callBacks: {
        data: [],
        meta: {}
    },
    callLogs: {
        data: [],
        meta: {}
    },
    myCalls: [],
    callEvents: {
        calls: [],
        agents: [],
        campaign: [],
        amiEvents: []
    },
    socket: null,
    sound: notificationSound
};

socket.on("notifications", data => {
    setTimeout(() => {
        let user = store.getState().user;
        if (user) {
            if (
                user.roles.find(
                    obj => obj.name.toLowerCase() === "admininistrator"
                ) ||
                user.roles.find(obj => obj.name.toLowerCase() === "supervisor")
            ) {
                store.dispatch(actions.listCallEvent(transformResponse(data)));
            }

            let calls =
                data.calls.filter(call => {
                    return (
                        user.extens.find(obj => obj === call.agent) ||
                        call.agent == ""
                    );
                }) || [];

            if (calls.length > 0) {
                store.dispatch(actions.listMyCall(transformResponse(calls)));
            }
        }
    }, 1000);
});

socket.on("add-call-event", data => {
    let user = store.getState().user;
    if (user) {
        if (
            user.roles.find(
                obj => obj.name.toLowerCase() === "admininistrator"
            ) ||
            user.roles.find(obj => obj.name.toLowerCase() === "supervisor")
        ) {
            store.dispatch(actions.addCallEvent(data));
        }
    }
});

socket.on("add-call", data => {
    let user = store.getState().user;
    if (user) {
        if (
            user.roles.find(
                obj => obj.name.toLowerCase() === "admininistrator"
            ) ||
            user.roles.find(obj => obj.name.toLowerCase() === "supervisor")
        ) {
            store.dispatch(actions.addCall(transformResponse(data)));
        }

        if (
            (data.direction == "IN" && data.agent == "") ||
            data.agent == null
        ) {
            store.dispatch(actions.addMyCall(transformResponse(data)));
        } else if (data.direction == "IN" && data.agent !== "") {
            if (user.extens.find(obj => obj === data.agent)) {
                store.dispatch(actions.addMyCall(transformResponse(data)));
            } else {
                store.dispatch(
                    actions.removeMyCall(transformResponse(data.id))
                );
            }
        } else {
            if (user.extens.find(obj => obj === data.agent)) {
                store.dispatch(actions.addMyCall(transformResponse(data)));
            } else {
                store.dispatch(
                    actions.removeMyCall(transformResponse(data.id))
                );
            }
        }
    }
});

socket.on("update-call", data => {
    store.dispatch(actions.updateCall(data));
});

socket.on("connect", () => {
    store.dispatch(actions.initSocket(socket));
});

const reducer = (state = initialState, { type, payload = null }) => {
    switch (type) {
        case EXTENSION_ADD:
            return addExtension(state, payload);
        case EXTENSION_UPDATE:
            return updateExtension(state, payload);
        case EXTENSION_REMOVE:
            return removeExtension(state, payload);
        case EXTENSION_LIST:
            return listExtension(state, payload);
        case GATEWAY_ADD:
            return addGateway(state, payload);
        case GATEWAY_UPDATE:
            return updateGateway(state, payload);
        case GATEWAY_REMOVE:
            return removeGateway(state, payload);
        case GATEWAY_LIST:
            return listGateway(state, payload);
        case CAMPAIGN_ADD:
            return addCampaign(state, payload);
        case CAMPAIGN_UPDATE:
            return updateCampaign(state, payload);
        case CAMPAIGN_REMOVE:
            return removeCampaign(state, payload);
        case CAMPAIGN_LIST:
            return listCampaign(state, payload);
        case CAMPAIGN_LIST_ADD:
            return addCampaignList(state, payload);
        case CAMPAIGN_LIST_UPDATE:
            return updateCampaignList(state, payload);
        case CAMPAIGN_LIST_REMOVE:
            return removeCampaignList(state, payload);
        case CAMPAIGN_LIST_LIST:
            return listCampaignList(state, payload);
        case FEEDBACK_ADD:
            return addFeedback(state, payload);
        case FEEDBACK_UPDATE:
            return updateFeedback(state, payload);
        case FEEDBACK_REMOVE:
            return removeFeedback(state, payload);
        case FEEDBACK_LIST:
            return listFeedback(state, payload);
        case CALLBACK_ADD:
            return addCallBack(state, payload);
        case CALLBACK_UPDATE:
            return updateCallBack(state, payload);
        case CALLBACK_REMOVE:
            return removeCallBack(state, payload);
        case CALLBACK_LIST:
            return listCallBack(state, payload);

        case CALL_LOG_ADD:
            return addCallLog(state, payload);
        case CALL_LOG_UPDATE:
            return updateCallLog(state, payload);
        case CALL_LOG_LIST:
            return listCallLog(state, payload);
        case CALL_EVENT_ADD:
            return addCallEvent(state, payload);
        case CALL_UPDATE:
            return updateCall(state, payload);
        case CALL_ADD:
            return addCall(state, payload);
        case CALL_EVENT_LIST:
            return listCallEvent(state, payload);
        case MY_CALL_ADD:
            return addMyCall(state, payload);
        case MY_CALL_UPDATE:
            return updateMyCall(state, payload);
        case MY_CALL_REMOVE:
            return removeMyCall(state, payload);
        case MY_CALL_LIST:
            return listMyCall(state, payload);

        case SOCKET_INIT:
            return initSocket(state, payload);
        default:
            return state;
    }
};

/* Extension */

function addExtension(state, payload) {
    const sipExtension = state.sipExtensions.find(obj => obj.id === payload.id);

    if (!sipExtension) {
        const sipExtensions = [...state.sipExtensions, payload];
        return Object.assign({}, state, { sipExtensions });
    }

    return updateExtension(state, payload);
}

function updateExtension(state, payload) {
    const sipExtensions = state.sipExtensions.map(obj => {
        if (obj.id === payload.id) {
            return { ...obj, ...payload };
        }
        return obj;
    });

    return Object.assign({}, state, { sipExtensions });
}

function removeExtension(state, id) {
    const sipExtensions = state.sipExtensions.filter(obj => obj.id !== id);

    return Object.assign({}, state, { sipExtensions });
}

function listExtension(state, payload) {
    const sipExtensions = payload.map(obj => {
        return obj;
    });
    return Object.assign({}, state, { sipExtensions });
}

/* Gateway */

function addGateway(state, payload) {
    const callGateway = state.callGateways.find(obj => obj.id === payload.id);

    if (!callGateway) {
        const callGateways = [...state.callGateways, payload];
        return Object.assign({}, state, { callGateways });
    }

    return updateGateway(state, payload);
}

function updateGateway(state, payload) {
    const callGateways = state.callGateways.map(obj => {
        if (obj.id === payload.id) {
            return { ...obj, ...payload };
        }
        return obj;
    });

    return Object.assign({}, state, { callGateways });
}

function removeGateway(state, id) {
    const callGateways = state.callGateways.filter(obj => obj.id !== id);

    return Object.assign({}, state, { callGateways });
}

function listGateway(state, payload) {
    const callGateways = payload.map(obj => {
        return obj;
    });
    return Object.assign({}, state, { callGateways });
}

/* callCampaigns */

function addCampaign(state, payload) {
    const callCampaign = state.callCampaigns.data.find(
        obj => obj.id === payload.id
    );

    if (!callCampaign) {
        const data = [...state.callCampaigns.data, payload];
        const callCampaigns = Object.assign({}, state.callCampaigns, { data });
        return Object.assign({}, state, { callCampaigns });
    }

    return updateCampaign(state, payload);
}

function updateCampaign(state, payload) {
    const data = state.callCampaigns.data.map(obj => {
        if (obj.id === payload.id) {
            return { ...obj, ...payload };
        }
        return obj;
    });

    const callCampaigns = Object.assign({}, state.callCampaigns, { data });
    return Object.assign({}, state, { callCampaigns });
}

function removeCampaign(state, id) {
    const data = state.callCampaigns.data.filter(obj => obj.id !== id);

    const callCampaigns = Object.assign({}, state.callCampaigns, { data });
    return Object.assign({}, state, { callCampaigns });
}

function listCampaign(state, payload) {
    const callCampaigns = payload;
    return Object.assign({}, state, { callCampaigns });
}

/* Campaign List */

function addCampaignList(state, payload) {
    const campaignList = state.campaignLists.data.find(
        obj => obj.id === payload.id
    );

    if (!campaignList) {
        const data = [...state.campaignLists.data, payload];
        const campaignLists = Object.assign({}, state.campaignLists, { data });
        return Object.assign({}, state, { campaignLists });
    }

    return updateCampaignList(state, payload);
}

function updateCampaignList(state, payload) {
    const data = state.campaignLists.data.map(obj => {
        if (obj.id === payload.id) {
            return { ...obj, ...payload };
        }
        return obj;
    });

    const campaignLists = Object.assign({}, state.campaignLists, { data });
    return Object.assign({}, state, { campaignLists });
}

function removeCampaignList(state, id) {
    const data = state.campaignLists.data.filter(obj => obj.id !== id);

    const campaignLists = Object.assign({}, state.campaignLists, { data });
    return Object.assign({}, state, { campaignLists });
}

function listCampaignList(state, payload) {
    const campaignLists = payload;
    return Object.assign({}, state, { campaignLists });
}

/* Feedback */

function addFeedback(state, payload) {
    const callFeedback = state.callFeedbacks.data.find(
        obj => obj.id === payload.id
    );

    if (!callFeedback) {
        const data = [...state.callFeedbacks.data, payload];
        const callFeedbacks = Object.assign({}, state.callFeedbacks, { data });
        return Object.assign({}, state, { callFeedbacks });
    }

    return updateFeedback(state, payload);
}

function updateFeedback(state, payload) {
    const data = state.callFeedbacks.data.map(obj => {
        if (obj.id === payload.id) {
            return { ...obj, ...payload };
        }
        return obj;
    });

    const callFeedbacks = Object.assign({}, state.callFeedbacks, { data });
    return Object.assign({}, state, { callFeedbacks });
}

function removeFeedback(state, id) {
    const data = state.callFeedbacks.data.filter(obj => obj.id !== id);

    const callFeedbacks = Object.assign({}, state.callFeedbacks, { data });
    return Object.assign({}, state, { callFeedbacks });
}

function listFeedback(state, payload) {
    const callFeedbacks = payload;
    return Object.assign({}, state, { callFeedbacks });
}

/* CallBack */

function addCallBack(state, payload) {
    const callBack = state.callBacks.data.find(obj => obj.id === payload.id);

    if (!callBack) {
        const data = [...state.callBacks.data, payload];
        const callBacks = Object.assign({}, state.callBacks, { data });
        return Object.assign({}, state, { callBacks });
    }

    return updateCallBack(state, payload);
}

function updateCallBack(state, payload) {
    const data = state.callBacks.data.map(obj => {
        if (obj.id === payload.id) {
            return { ...obj, ...payload };
        }
        return obj;
    });

    const callBacks = Object.assign({}, state.callBacks, { data });
    return Object.assign({}, state, { callBacks });
}

function removeCallBack(state, id) {
    const data = state.callBacks.data.filter(obj => obj.id !== id);

    const callBacks = Object.assign({}, state.callBacks, { data });
    return Object.assign({}, state, { callBacks });
}

function listCallBack(state, payload) {
    const callBacks = payload;
    return Object.assign({}, state, { callBacks });
}

/* CALL LOGS */

function addCallLog(state, payload) {
    const callLog = state.callLogs.data.find(obj => obj.id === payload.id);

    if (!callLog) {
        const data = [...state.callLogs.data, payload];
        const callLogs = Object.assign({}, state.callLogs, { data });
        return Object.assign({}, state, { callLogs });
    }

    return updateCallLog(state, payload);
}

function updateCallLog(state, payload) {
    const data = state.callLogs.data.map(obj => {
        if (obj.id === payload.id) {
            return { ...obj, ...payload };
        }
        return obj;
    });

    const callLogs = Object.assign({}, state.callLogs, { data });
    return Object.assign({}, state, { callLogs });
}

function listCallLog(state, payload) {
    const callLogs = payload;
    return Object.assign({}, state, { callLogs });
}

/* My Calls */

function addMyCall(state, payload) {
    const call = state.myCalls.find(obj => obj.id === payload.id);

    if (!call) {
        const myCalls = [payload, ...state.myCalls];
        return Object.assign({}, state, { myCalls });
    }

    return updateMyCall(state, payload);
}

function updateMyCall(state, payload) {
    const myCalls = state.myCalls.map(obj => {
        if (obj.id === payload.id) {
            return { ...obj, ...payload };
        }
        return obj;
    });

    return Object.assign({}, state, { myCalls });
}

function listMyCall(state, payload) {
    const myCalls = payload;
    return Object.assign({}, state, { myCalls });
}

function removeMyCall(state, id) {
    const myCalls = state.myCalls.filter(obj => obj.id !== id);

    return Object.assign({}, state, { myCalls });
}

/* Call Event */

function addCallEvent(state, payload) {
    const amiEvents = [payload, ...state.callEvents.amiEvents];
    const callEvents = Object.assign({}, state.callEvents, {
        amiEvents
    });
    return Object.assign({}, state, { callEvents });
}

function addCall(state, payload) {
    const call = state.callEvents.calls.find(obj => obj.id === payload.id);

    if (!call) {
        const calls = [payload, ...state.callEvents.calls];
        const callEvents = Object.assign({}, state.callEvents, { calls });
        return Object.assign({}, state, { callEvents });
    }

    return updateCall(state, payload);
}

function updateCall(state, payload) {
    const calls = state.callEvents.calls.map(obj => {
        if (obj.id === payload.id) {
            return { ...obj, ...payload };
        }
        return obj;
    });

    const callEvents = Object.assign({}, state.callEvents, { calls });
    return Object.assign({}, state, { callEvents });
}

function removeCallEvent(state, payload) {
    // const callEvents = state.callEvents.filter(obj => obj.id !== id);
    // socket.emit("remove-list", { uuid: callEvents.uuid, list: callEvent.list });

    // return Object.assign({}, state, { callEvents });
    return state;
}

function listCallEvent(state, payload) {
    const callEvents = payload;
    return Object.assign({}, state, { callEvents });
}

function initSocket(state, payload) {
    const socket = payload;
    return Object.assign({}, state, { socket });
}

export default reducer;
