import Http from "../../utils/Http";
import * as authActions from "./store/actions";
import Transformer from "../../utils/Transformer";

/**
 * fetch the current logged in user
 *
 * @returns {function(*)}
 */
export function fetchUser() {
    return dispatch => {
        dispatch(authActions.authPageLoading(true));
        return Http.get("auth/user")
            .then(res => {
                const data = Transformer.fetch(res.data.data);
                dispatch(authActions.authUser(data.user));
                dispatch(authActions.authPageLoading(false));
            })
            .catch(err => {
                const statusCode = err.response.status;
                const data = {
                    error: err.response.data.error.message,
                    statusCode
                };
                dispatch(authActions.authPageLoading(false));
                return reject(data);
            });
    };
}

/**
 * login user
 *
 * @param credentials
 * @returns {function(*)}
 */
export function login(credentials) {
    return dispatch =>
        new Promise((resolve, reject) => {
            dispatch(authActions.authPageLoading(true));
            Http.post("auth/login", credentials)
                .then(res => {
                    const data = Transformer.fetch(res.data.data);
                    dispatch(authActions.authLogin(data.accessToken));
                    dispatch(authActions.authUser(data.user));
                    dispatch(authActions.authPageLoading(false));
                    return resolve();
                })
                .catch(err => {
                    const statusCode = err.response.status;
                    const data = {
                        error: null,
                        statusCode
                    };

                    if (statusCode === 422) {
                        const resetErrors = {
                            errors: err.response.data.errors,
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
                    dispatch(authActions.authPageLoading(false));
                    return reject(data);
                });
        });
}

export function register(credentials) {
    return dispatch =>
        new Promise((resolve, reject) => {
            Http.post("auth/register", Transformer.send(credentials))
                .then(res => {
                    const data = Transformer.fetch(res.data);
                    dispatch(authActions.authLogin(data.accessToken));
                    return resolve();
                })
                .catch(err => {
                    const statusCode = err.response.status;
                    const data = {
                        error: null,
                        statusCode
                    };

                    if (statusCode === 422) {
                        const resetErrors = {
                            errors: err.response.data.errors,
                            replace: false,
                            searchStr: "",
                            replaceStr: ""
                        };
                        data.error = Transformer.resetValidationFields(
                            resetErrors
                        );
                    } else if (statusCode === 401) {
                        data.error = err.response.data.message;
                    }
                    return reject(data);
                });
        });
}

/**
 * logout user
 *
 * @returns {function(*)}
 */
export function logout() {
    return dispatch => {
        dispatch(authActions.authPageLoading(true));
        return Http.delete("auth/logout")
            .then(() => {
                dispatch(authActions.authLogout());
                dispatch(authActions.authPageLoading(false));
            })
            .catch(err => {
                const statusCode = err.response.status;
                const data = {
                    error: err.response.data.error.message,
                    statusCode
                };
                dispatch(authActions.authPageLoading(false));
                return reject(data);
            });
    };
}

/**
 * logout user
 *
 * @returns {function(*)}
 */
export function toggleSidebar() {
    return dispatch => {
        dispatch(authActions.authToggleSidebar());
    };
}
