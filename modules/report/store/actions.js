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

/* Call Summary */
export function callSummary(payload) {
    return {
        type: CALL_SUMMARY,
        payload
    };
}

/* Gateway Summary */
export function gatewaySummary(payload) {
    return {
        type: GATEWAY_SUMMARY,
        payload
    };
}

/* Agent Summary */
export function agentSummary(payload) {
    return {
        type: AGENT_SUMMARY,
        payload
    };
}

/* AGENT KPI */
export function agentKPI(payload) {
    return {
        type: AGENT_KPI,
        payload
    };
}

/* Order Summary */
export function orderSummary(payload) {
    return {
        type: ORDER_SUMMARY,
        payload
    };
}

/* Order Summary */
export function callFeebackSummary(payload) {
    return {
        type: CALL_FEEDBACK_SUMMARY,
        payload
    };
}

/* Order Summary */
export function callMonthlySummary(payload) {
    return {
        type: CALL_MONTHLY_SUMMARY,
        payload
    };
}

/* Feedback Summary */
export function feedbackSummary(payload) {
    return {
        type: FEEDBACK_SUMMARY,
        payload
    };
}
