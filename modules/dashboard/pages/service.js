import Http from "../../../utils/Http";
import Transformer from "../../../utils/Transformer";
import { showNotification } from "../../../utils/Notification";
import * as actions from "../store/actions";
import { authPageLoading, authCheck } from "../../auth/store/actions";

function transformRequest(parms) {
    return Transformer.send(parms);
}

function transformResponse(params) {
    return Transformer.fetch(params);
}

export function dashboardRequest({ url = "user/dashboard" }) {
    return dispatch =>
        new Promise((resolve, reject) => {
            dispatch(authPageLoading(true));
            url = url;

            Http.get(url)
                .then(res => {
                    dispatch(
                        actions.dashboard(
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

export function callSummaryRequest({
    exten = [],
    url = "cc/call_logs/report"
}) {
    return dispatch =>
        new Promise((resolve, reject) => {
            const extenquery = exten.reduce((qry, val) => {
                return qry + `&exten[]=${val}`;
            }, "");
            url = url + `?${extenquery}`;

            Http.get(url)
                .then(res => {
                    dispatch(
                        actions.callSummary(
                            transformResponse(res.data.data.summary)
                        )
                    );
                })
                .catch(err => {
                    // TODO: handle err
                    const statusCode = err.response.status;
                    const data = {
                        error: err.response.data.error.message,
                        statusCode
                    };
                    return reject(data);
                });
        });
}

export function orderSummaryRequest({ user = [], url = "crm/orders/report" }) {
    return dispatch =>
        new Promise((resolve, reject) => {
            const userquery = user.reduce((qry, val) => {
                return qry + `&user_id[]=${val}`;
            }, "");
            url = url + `?${userquery}`;

            Http.get(url)
                .then(res => {
                    dispatch(
                        actions.orderSummary(
                            transformResponse(res.data.data.summary)
                        )
                    );
                })
                .catch(err => {
                    // TODO: handle err
                    const statusCode = err.response.status;
                    const data = {
                        error: err.response.data.error.message,
                        statusCode
                    };
                    return reject(data);
                });
        });
}
