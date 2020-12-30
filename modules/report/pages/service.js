import Http from "../../../utils/Http";
import Transformer from "../../../utils/Transformer";
import { showNotification } from "../../../utils/Notification";
import * as actions from "../store/actions";
import { campaignStopRequest } from "../../cc/pages/campaigns/service";
import { authPageLoading } from "../../auth/store/actions";

function transformRequest(parms) {
    return Transformer.send(parms);
}

function transformResponse(params) {
    return Transformer.fetch(params);
}

export function callSummaryRequest({
    exten = [],
    calldate = "",
    url = "cc/call_logs/report"
}) {
    return dispatch =>
        new Promise((resolve, reject) => {
            dispatch(authPageLoading(true));
            const extenquery = exten.reduce((qry, val) => {
                return qry + `&exten[]=${val}`;
            }, "");
            url = url + `?${extenquery}&calldate=${calldate}`;

            Http.get(url)
                .then(res => {
                    dispatch(
                        actions.callSummary(
                            transformResponse(res.data.data.summary)
                        )
                    );
                    dispatch(authPageLoading(false));
                })
                .catch(err => {
                    // TODO: handle err
                    const statusCode = err.response.status;
                    const data = {
                        error: err.response.data.error.message,
                        statusCode
                    };
                    dispatch(authPageLoading(false));
                    return reject(data);
                });
        });
}

export function callMonthlySummaryRequest({
    exten = [],
    url = "cc/call_logs/monthly"
}) {
    return dispatch =>
        new Promise((resolve, reject) => {
            dispatch(authPageLoading(true));
            Http.get(url)
                .then(res => {
                    dispatch(
                        actions.callMonthlySummary(
                            transformResponse(res.data.data.summary)
                        )
                    );
                    dispatch(authPageLoading(false));
                })
                .catch(err => {
                    // TODO: handle err
                    const statusCode = err.response.status;
                    const data = {
                        error: err.response.data.error.message,
                        statusCode
                    };
                    dispatch(authPageLoading(false));
                    return reject(data);
                });
        });
}

export function orderSummaryRequest({
    userId = '',
    orderDate = "",
    url = "crm/orders/report"
}) {
    return dispatch =>
        new Promise((resolve, reject) => {
            dispatch(authPageLoading(true));
            
            url = url + `?sales_rep_id=${userId}&order_date=${orderDate}`;
            Http.get(url)
                .then(res => {
                    dispatch(
                        actions.orderSummary(
                            transformResponse(res.data.data.summary)
                        )
                    );
                    dispatch(authPageLoading(false));
                })
                .catch(err => {
                    // TODO: handle err
                    const statusCode = err.response.status;
                    const data = {
                        error: err.response.data.error.message,
                        statusCode
                    };
                    dispatch(authPageLoading(false));
                    return reject(data);
                });
        });
}

export function callFeedbackSummaryRequest({
    user = [],
    url = "cc/call_feedbacks/report"
}) {
    return dispatch =>
        new Promise((resolve, reject) => {
            dispatch(authPageLoading(true));
            const userquery = user.reduce((qry, val) => {
                return qry + `&user_id[]=${val}`;
            }, "");
            url = url + `?${userquery}`;

            Http.get(url)
                .then(res => {
                    dispatch(
                        actions.callFeebackSummary(
                            transformResponse(res.data.data.summary)
                        )
                    );
                    dispatch(authPageLoading(false));
                })
                .catch(err => {
                    // TODO: handle err
                    const statusCode = err.response.status;
                    const data = {
                        error: err.response.data.error.message,
                        statusCode
                    };
                    dispatch(authPageLoading(false));
                    return reject(data);
                });
        });
}

export function feedbackSummaryRequest({
    user = [],
    actions = [],
    url = "cc/call_feedbacks/report"
}) {
    return dispatch =>
        new Promise((resolve, reject) => {
            dispatch(authPageLoading(true));
            const userquery = user.reduce((qry, val) => {
                return qry + `&user_id[]=${val}`;
            }, "");
            const actionsquery = actions.reduce((qry, val) => {
                return qry + `&action[]=${val}`;
            }, "");
            url = url + `?${userquery}${actionsquery}`;

            Http.get(url)
                .then(res => {
                    dispatch(
                        actions.feedbackSummary(
                            transformResponse(res.data.data.summary)
                        )
                    );
                    dispatch(authPageLoading(false));
                })
                .catch(err => {
                    // TODO: handle err
                    const statusCode = err.response.status;
                    const data = {
                        error: err.response.data.error.message,
                        statusCode
                    };
                    dispatch(authPageLoading(false));
                    return reject(data);
                });
        });
}

