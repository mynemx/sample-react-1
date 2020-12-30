import Http from "../../../../utils/Http";
import Transformer from "../../../../utils/Transformer";
import { showNotification } from "../../../../utils/Notification";
import * as actions from "../../store/actions";
import { authPageLoading } from "../../../auth/store/actions";

function transformRequest(parms) {
    return Transformer.send(parms);
}

function transformResponse(params) {
    return Transformer.fetch(params);
}

export function feedbackAddRequest(params) {
    return dispatch =>
        new Promise((resolve, reject) => {
            Http.post("cc/call_feedbacks", transformRequest(params))
                .then(res => {
                    dispatch(
                        actions.addFeedback(
                            transformResponse(res.data.data.call_feedback)
                        )
                    );
                    return resolve(res.data.data.msg);
                })
                .catch(err => {
                    const statusCode = err.response.status;
                    const data = {
                        error: null,
                        statusCode
                    };

                    if (statusCode === 422) {
                        const resetErrors = {
                            errors: err.response.data.error.message,
                            replace: false,
                            searchStr: "",
                            replaceStr: ""
                        };
                        data.error = Transformer.resetValidationFields(
                            resetErrors
                        );
                    } else if (statusCode === 401) {
                        data.error = err.response.data.error.message;
                    }
                    return reject(data);
                });
        });
}

export function feedbackUpdateRequest(params) {
    return dispatch =>
        new Promise((resolve, reject) => {
            Http.patch(
                `cc/call_feedbacks/${params.id}`,
                transformRequest(params)
            )
                .then(res => {
                    dispatch(
                        actions.addFeedback(
                            transformResponse(res.data.data.call_feedback)
                        )
                    );
                    dispatch(
                        actions.addCallBack(
                            transformResponse(res.data.data.call_feedback)
                        )
                    );
                    return resolve(res.data.data.msg);
                })
                .catch(err => {
                    const statusCode = err.response.status;
                    const data = {
                        error: null,
                        statusCode
                    };

                    if (statusCode === 422) {
                        const resetErrors = {
                            errors: err.response.data.error.message,
                            replace: false,
                            searchStr: "",
                            replaceStr: ""
                        };
                        data.error = Transformer.resetValidationFields(
                            resetErrors
                        );
                    } else if (statusCode === 401) {
                        data.error = err.response.data.error.message;
                    }
                    return reject(data);
                });
        });
}

export function feedbackRemoveRequest(id) {
    return dispatch =>
        new Promise((resolve, reject) => {
            Http.delete(`cc/call_feedbacks/${id}`)
                .then(res => {
                    dispatch(actions.removeFeedback(id));
                    dispatch(actions.removeCallBack(id));
                    showNotification(res.data.data.msg, "success");
                    return resolve();
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

export function feedbackListRequest({
    pageNumber = 1,
    action = [],
    direction = [],
    user = [],
    actionSchedule = "",
    name = "",
    date = "",
    limits = "",
    loader = true,
    url = "cc/call_feedbacks"
}) {
    return dispatch =>
        new Promise((resolve, reject) => {
            dispatch(authPageLoading(loader));
            const actionquery = action.reduce((qry, val) => {
                return qry + `&action[]=${val}`;
            }, "");
            const userquery = user.reduce((qry, val) => {
                return qry + `&user_id[]=${val}`;
            }, "");
            const directionquery = direction.reduce((qry, val) => {
                return qry + `&direction[]=${val}`;
            }, "");
            url =
                url +
                `?page=${pageNumber}&name=${name}&action_schedule=${actionSchedule}${directionquery}${userquery}${actionquery}&created_at=${date}&limits=${limits}`;

            Http.get(url)
                .then(res => {
                    dispatch(
                        actions.listFeedback(
                            transformResponse(res.data.data.call_feedbacks)
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

export function feedbackCallbacksRequest({
    pageNumber = 1,
    direction = [],
    user = [],
    actionSchedule = "",
    name = "",
    date = "",
    limits = "",
    loader = true,
    url = "cc/call_feedbacks/call_backs"
}) {
    return dispatch =>
        new Promise((resolve, reject) => {
            dispatch(authPageLoading(loader));
            const userquery = user.reduce((qry, val) => {
                return qry + `&user_id[]=${val}`;
            }, "");
            const directionquery = direction.reduce((qry, val) => {
                return qry + `&direction[]=${val}`;
            }, "");
            url =
                url +
                `?page=${pageNumber}&name=${name}&action_schedule=${actionSchedule}${directionquery}${userquery}&created_at=${date}&limits=${limits}`;

            Http.get(url)
                .then(res => {
                    dispatch(
                        actions.listCallBack(
                            transformResponse(res.data.data.call_backs)
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

export function feedbackEditRequest(id) {
    return dispatch =>
        new Promise((resolve, reject) => {
            Http.get(`cc/call_feedbacks/${id}`)
                .then(res => {
                    dispatch(
                        actions.addFeedback(
                            transformResponse(res.data.data.call_feedback)
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
