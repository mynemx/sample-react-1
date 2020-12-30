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

export function extensionAddRequest(params) {
    return dispatch =>
        new Promise((resolve, reject) => {
            dispatch(authPageLoading(true));
            Http.post("cc/sip_extensions", transformRequest(params))
                .then(res => {
                    dispatch(
                        actions.addExtension(
                            transformResponse(res.data.data.sip_extension)
                        )
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

export function extensionUpdateRequest(params) {
    return dispatch =>
        new Promise((resolve, reject) => {
            dispatch(authPageLoading(true));
            Http.patch(
                `cc/sip_extensions/${params.id}`,
                transformRequest(params)
            )
                .then(res => {
                    dispatch(
                        actions.addExtension(
                            transformResponse(res.data.data.sip_extension)
                        )
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

export function extensionRemoveRequest(id) {
    return dispatch =>
        new Promise((resolve, reject) => {
            dispatch(authPageLoading(true));
            Http.delete(`cc/sip_extensions/${id}`)
                .then(res => {
                    dispatch(actions.removeExtension(id));
                    dispatch(authPageLoading(false));
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
                    dispatch(authPageLoading(false));
                    return reject(data);
                });
        });
}

export function extensionListRequest({
    pageNumber = 1,
    url = "cc/sip_extensions"
}) {
    return dispatch =>
        new Promise((resolve, reject) => {
            dispatch(authPageLoading(true));
            if (pageNumber > 1) {
                url = url + `?page=${pageNumber}`;
            }
            Http.get(url)
                .then(res => {
                    dispatch(
                        actions.listExtension(
                            transformResponse(res.data.data.sip_extensions)
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

export function extensionEditRequest(id) {
    return dispatch =>
        new Promise((resolve, reject) => {
            dispatch(authPageLoading(true));
            Http.get(`cc/sip_extensions/${id}`)
                .then(res => {
                    dispatch(
                        actions.addExtension(
                            transformResponse(res.data.data.sip_extension)
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
