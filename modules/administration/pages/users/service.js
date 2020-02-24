import Http from "../../../../utils/Http";
import Transformer from "../../../../utils/Transformer";
import { showNotification } from "../../../../utils/Notification";
import * as userActions from "../../store/actions";
import { authPageLoading } from "../../../auth/store/actions";

function transformRequest(parms) {
    return Transformer.send(parms);
}

function transformResponse(params) {
    return Transformer.fetch(params);
}

export function userAddRequest(params) {
    return dispatch =>
        new Promise((resolve, reject) => {
            dispatch(authPageLoading(true));
            Http.post("administration/users", transformRequest(params))
                .then(res => {
                    dispatch(
                        userActions.addUser(
                            transformResponse(res.data.data.user)
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

export function userUpdateRequest(params) {
    return dispatch =>
        new Promise((resolve, reject) => {
            dispatch(authPageLoading(true));
            Http.patch(
                `administration/users/${params.id}`,
                transformRequest(params)
            )
                .then(res => {
                    dispatch(
                        userActions.addUser(
                            transformResponse(res.data.data.user)
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

export function userRemoveRequest(id) {
    return dispatch => {
        dispatch(authPageLoading(true));
        Http.delete(`administration/users/${id}`)
            .then(res => {
                dispatch(userActions.removeUser(id));
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

export function userListRequest({
    pageNumber = 1,
    url = "administration/users"
}) {
    return dispatch => {
        dispatch(authPageLoading(true));
        if (pageNumber > 1) {
            url = url + `?page=${pageNumber}`;
        }

        Http.get(url)
            .then(res => {
                dispatch(
                    userActions.listUser(transformResponse(res.data.data.users))
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

export function userEditRequest(id) {
    return dispatch => {
        dispatch(authPageLoading(true));
        Http.get(`administration/users/${id}`)
            .then(res => {
                dispatch(
                    userActions.addUser(transformResponse(res.data.data.user))
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
