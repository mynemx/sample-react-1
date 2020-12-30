import {
    DASHBOARD,
    USER_CALL_SUMMARY,
    USER_ORDER_SUMMARY
} from "./action-types";

/* Call Summary */
export function dashboard(payload) {
    return {
        type: DASHBOARD,
        payload
    };
}

export function callSummary(payload) {
    return {
        type: USER_CALL_SUMMARY,
        payload
    };
}

/* Order Summary */
export function orderSummary(payload) {
    return {
        type: USER_ORDER_SUMMARY,
        payload
    };
}
