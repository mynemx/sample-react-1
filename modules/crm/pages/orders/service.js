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

export function orderAddRequest(params) {
    return dispatch =>
        new Promise((resolve, reject) => {
            dispatch(authPageLoading(true));
            Http.post("crm/orders", transformRequest(params))
                .then(res => {
                    dispatch(
                        actions.addOrder(transformResponse(res.data.data.order))
                    );
                    dispatch(authPageLoading(false));
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
                    dispatch(authPageLoading(false));
                    return reject(data);
                });
        });
}

export function orderUpdateRequest(params) {
    return dispatch =>
        new Promise((resolve, reject) => {
            dispatch(authPageLoading(true));
            Http.patch(`crm/orders/${params.id}`, transformRequest(params))
                .then(res => {
                    dispatch(
                        actions.addOrder(transformResponse(res.data.data.order))
                    );
                    dispatch(authPageLoading(false));
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
                    dispatch(authPageLoading(false));
                    return reject(data);
                });
        });
}

export function orderRemoveRequest(id) {
    return dispatch => {
        dispatch(authPageLoading(true));
        Http.delete(`crm/orders/${id}`)
            .then(res => {
                dispatch(actions.removeOrder(id));
                dispatch(authPageLoading(false));
                showNotification(res.data.data.msg, "success");
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
    };
}

export function orderListRequest({
    pageNumber = 1,
    user = [],
    title = "",
    listType = "",
    limits = 50,
    loader = true,
    url = "crm/orders"
}) {
    return dispatch => {
        dispatch(authPageLoading(loader));

        const userquery = user.reduce((qry, val) => {
            return qry + `&user_id[]=${val}`;
        }, "");
        url =
            url +
            `?page=${pageNumber}&title=${title}&listType=${listType}${userquery}&limits=${limits}`;

        Http.get(url)
            .then(res => {
                dispatch(
                    actions.listOrder(transformResponse(res.data.data.orders))
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
    };
}

export function orderEditRequest(id) {
    return dispatch =>
        new Promise((resolve, reject) => {
            dispatch(authPageLoading(true));
            Http.get(`crm/orders/${id}`)
                .then(res => {
                    dispatch(
                        actions.addOrder(transformResponse(res.data.data.order))
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
