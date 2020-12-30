import {
    CALL_SUMMARY,
    GATEWAY_SUMMARY,
    AGENT_SUMMARY,
    AGENT_KPI,
    ORDER_SUMMARY,
    FEEDBACK_SUMMARY,
    CALL_MONTHLY_SUMMARY,
    CALL_FEEDBACK_SUMMARY
} from "./action-types";
import { array } from "prop-types";

const initialState = {
    callSummary: {
        startDate: "",
        endDate: "",
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
    gatewaySummary: {
        startDate: "",
        endDate: "",

        sumOfOutboundInSeconds: 0,
		sumOfOutbound: "00:00:00",
		noOfOutboundCalls: 0,
		noOfSuccessfullOutboundCalls: 0,
		noOfUnansweredOutboundCalls: 0,
		noOfFailedOutboundCalls: 0,
		noOfOutboundCallsOutsideBusinessHours: 0,
		outboundCost: 0.00,
			
		averageOutboundSeconds: 0,
		averageOutbound: "00:00:00",
		longestTalkTimeOutboundInSeconds: 0,
		longestTalkTimeOutbound: "00:00:00",

		sumOfInboundInSeconds: 0,
		sumOfInbound: "00:00:00",
		noOfInboundCalls: 0,
		noOfSuccessfullInboundCalls: 0,
		noOfUnansweredInboundCalls: 0,
		noOfFailedInboundCalls: 0,
		noOfInboundCallsOutsideBusinessHours: 0,
		noOfInboundCallsAbandonedOutsideBusinessHours: 0,

		averageInboundSeconds: 0,
		averageInbound: "00:00:00",
		longestTalkTimeInboundInSeconds: 0,
		longestTalkTimeInbound: "00:00:00",
        calls: [],
        days: [],
    },
    agentSummary: {
        startDate: "",
        endDate: "",

        sumOfOutboundInSeconds: 0,
		sumOfOutbound: "00:00:00",
		noOfOutboundCalls: 0,
		noOfSuccessfullOutboundCalls: 0,
		noOfUnansweredOutboundCalls: 0,
		noOfFailedOutboundCalls: 0,
		noOfOutboundCallsOutsideBusinessHours: 0,
		outboundCost: 0.00,
			
		averageOutboundSeconds: 0,
		averageOutbound: "00:00:00",
		longestTalkTimeOutboundInSeconds: 0,
		longestTalkTimeOutbound: "00:00:00",

		sumOfInboundInSeconds: 0,
		sumOfInbound: "00:00:00",
		noOfInboundCalls: 0,
		noOfSuccessfullInboundCalls: 0,
		noOfUnansweredInboundCalls: 0,
		noOfFailedInboundCalls: 0,
		noOfInboundCallsOutsideBusinessHours: 0,
		noOfInboundCallsAbandonedOutsideBusinessHours: 0,

		averageInboundSeconds: 0,
		averageInbound: "00:00:00",
		longestTalkTimeInboundInSeconds: 0,
		longestTalkTimeInbound: "00:00:00",
        calls: [],
        orders: [],
        days: [],
    },
    agentKPI: {
        startDate: "",
        endDate: "",
        agentSummaries:[]
    },
    orderSummary: {
        startDate: "",
        endDate: "",
        amountOrders: 0,
        totalOrders: 0,
        soldOrders: 0,
        soldAmount: 0,
        orderPerDay: [],
        orderPerWeek: [],
        orderPerSource: [],
        weeks: []
    },
    callFeedbackSummary: {
        startDate: "",
        endDate: "",
        actions: [],
        feedbackChart: []
    },
    callMonthlySummary:{
        startDate: "",
        endDate: "",
        months: [],
        outboundCost: 0,
        timeOutboundSeconds: "00:00:00",
    },
    feedbackSummary: {
        startDate: "",
        endDate: "",
        actions: [],
        feedbackChart: []
    }
};

const reducer = (state = initialState, { type, payload = null }) => {
    switch (type) {
        case CALL_SUMMARY:
            return callSummary(state, payload);
        case GATEWAY_SUMMARY:
            return gatewaySummary(state, payload);
        case AGENT_SUMMARY:
            return agentSummary(state, payload);
        case AGENT_KPI:
            return agentKPI(state, payload);
        case ORDER_SUMMARY:
            return orderSummary(state, payload);
        case CALL_FEEDBACK_SUMMARY:
            return callFeedbackSummary(state, payload);
        case CALL_MONTHLY_SUMMARY:
            return callMonthlySummary(state, payload);
        case FEEDBACK_SUMMARY:
            return feedbackSummary(state, payload);
        default:
            return state;
    }
};

/* Company */

function stats(state, payload) {
    return payload;
}

function callSummary(state, payload) {
    const callSummary = payload;
    return Object.assign({}, state, { callSummary });
}

function gatewaySummary(state, payload) {
    const gatewaySummary = payload;
    return Object.assign({}, state, { gatewaySummary });
}

function agentSummary(state, payload) {
    const agentSummary = payload;
    return Object.assign({}, state, { agentSummary });
}

function agentKPI(state, payload) {
    const agentKPI = payload;
    return Object.assign({}, state, { agentKPI });
}

function orderSummary(state, payload) {
    const orderSummary = payload;
    return Object.assign({}, state, { orderSummary });
}

function callFeedbackSummary(state, payload) {
    const callFeedbackSummary = payload;
    return Object.assign({}, state, { callFeedbackSummary });
}

function callMonthlySummary(state, payload) {
    const callMonthlySummary = payload;
    return Object.assign({}, state, { callMonthlySummary });
}

function feedbackSummary(state, payload) {
    const feedbackSummary = payload;
    return Object.assign({}, state, { feedbackSummary });
}

export default reducer;
