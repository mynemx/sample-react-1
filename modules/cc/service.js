import { extensionListRequest } from "./pages/extensions/service";
import { campaignEditRequest } from "./pages/campaigns/service";
import Http from "../../utils/Http";
import Transformer from "../../utils/Transformer";
import { showNotification } from "../../utils/Notification";
import { authPageLoading } from "../auth/store/actions";
import { listGateway } from "./store/actions"

function transformRequest(parms) {
    return Transformer.send(parms);
}

function transformResponse(params) {
    return Transformer.fetch(params);
}


function gatewayListRequest({
    limits = 100,
    offset = 0,
    url = "cc/call_gateways"
}) {
    return dispatch =>
        new Promise((resolve, reject) => {
            dispatch(authPageLoading(true));
            url =
                url +
                `?limits=${limits}`;

            Http.get(url)
                .then(res => {
                    dispatch(authPageLoading(false));
                    dispatch(
                        listGateway(
                            transformResponse(res.data.data.call_gateways)
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
                    dispatch(authPageLoading(false));
                    return reject(data);
                });
        });
}


function feedbackRequest({
    name = "",
    location = "",
    direction = [],
    phone = "",
    limits = 100,
    action = [],
    offset = 0,
    url = "cc/call_feedbacks/search"
}) {
    return dispatch =>
        new Promise((resolve, reject) => {
            dispatch(authPageLoading(true));
            const actionquery = action.reduce((qry, val) => {
                return qry + `&action[]=${val}`;
            }, "");
            const directionquery = direction.reduce((qry, val) => {
                return qry + `&direction[]=${val}`;
            }, "");
            url =
                url +
                `?offset=${offset}&name=${name}&phonenumber=${phone}&location=${location}${directionquery}${actionquery}&limits=${limits}`;

            Http.get(url)
                .then(res => {
                    dispatch(authPageLoading(false));
                    return resolve(
                        transformResponse(res.data.data.call_feedbacks)
                    );
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

function callInfoRequest({
    name = "",
    contactType = "",
    contactId = [],
    phone = "",
    url = "cc/call_feedbacks/call_info"
}) {
    return dispatch =>
        new Promise((resolve, reject) => {
            dispatch(authPageLoading(true));
            url =
                url +
                `?contact_id=${contactId}&name=${name}&phonenumber=${phone}&contact_type=${contactType}`;

            Http.get(url)
                .then(res => {
                    dispatch(authPageLoading(false));
                    return resolve(transformResponse(res.data.data.call_info));
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

function updateClientRequest({ url = "", contactType, params }) {
    return dispatch =>
        new Promise((resolve, reject) => {
            dispatch(authPageLoading(true));
            Http.patch(`${url}/${params.id}`, transformRequest(params))
                .then(res => {
                    showNotification(res.data.data.msg, "success");
                    dispatch(authPageLoading(false));
                    return resolve(
                        transformResponse(res.data.data[contactType])
                    );
                })
                .catch(err => {
                    const statusCode = err.response.status;
                    const data = {
                        error: null,
                        statusCode
                    };
                    showNotification("Invalid input", "error");

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

function feedbackAddRequest(params) {
    return dispatch =>
        new Promise((resolve, reject) => {
            dispatch(authPageLoading(true));
            Http.post("cc/call_feedbacks", transformRequest(params))
                .then(res => {
                    showNotification(res.data.data.msg, "success");
                    dispatch(authPageLoading(false));
                    return resolve(
                        transformResponse(res.data.data.call_feedback)
                    );
                })
                .catch(err => {
                    const statusCode = err.response.status;
                    const data = {
                        error: null,
                        statusCode
                    };
                    showNotification("Invalid input", "error");

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

export {
    extensionListRequest,
    gatewayListRequest,
    feedbackRequest,
    callInfoRequest,
    feedbackAddRequest,
    campaignEditRequest,
    updateClientRequest
};
