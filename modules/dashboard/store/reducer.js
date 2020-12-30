import {
    USER_CALL_SUMMARY,
    USER_ORDER_SUMMARY,
    DASHBOARD
} from "./action-types";
import { array } from "prop-types";

const initialState = {
    callSummary: {
        sumedOutboundSeconds: 0,
        sumedOutboundCalls: 0,
        averageOutboundSeconds: "00:00:00",
        outboundCost: 0,
        timeOutboundSeconds: "00:00:00",
        sumedInboundSeconds: 0,
        timeInboundSeconds: "00:00:00",
        sumedInboundCalls: 0,
        averageInboundSeconds: "",
        userChart: [],
        calls: [],
        callInbound: []
    },
    orderSummary: {
        amountOrders: 0,
        totalOrders: 0,
        soldOrders: 0,
        soldAmount: 0,
        userOrder: []
    }
};

const reducer = (state = initialState, { type, payload = null }) => {
    switch (type) {
        case DASHBOARD:
            return dashboard(state, payload);
        case USER_CALL_SUMMARY:
            return callSummary(state, payload);
        case USER_ORDER_SUMMARY:
            return orderSummary(state, payload);
        default:
            return state;
    }
};

/* Company */

function dashboard(state, payload) {
    return payload;
}

function callSummary(state, payload) {
    const callSummary = payload;
    return Object.assign({}, state, { callSummary });
}

function orderSummary(state, payload) {
    const orderSummary = payload;
    return Object.assign({}, state, { orderSummary });
}

export default reducer;
