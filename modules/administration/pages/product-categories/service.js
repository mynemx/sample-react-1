import Http from "../../../../utils/Http";
import Transformer from "../../../../utils/Transformer";
import { showNotification } from "../../../../utils/Notification";
import * as categoryActions from "../../store/actions";
import { authPageLoading } from "../../../auth/store/actions";

function transformRequest(parms) {
    return Transformer.send(parms);
}

function transformResponse(params) {
    return Transformer.fetch(params);
}

export function categoryAddRequest(params) {
    return dispatch =>
        new Promise((resolve, reject) => {
            dispatch(authPageLoading(true));
            Http.post(
                "administration/product-categories",
                transformRequest(params)
            )
                .then(res => {
                    dispatch(
                        categoryActions.addCategory(
                            transformResponse(res.data.data.product_category)
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
                    } else if (statusCode === 401 || statusCode === 402) {
                        data.error = err.response.data.error.message;
                    }
                    dispatch(authPageLoading(false));
                    return reject(data);
                });
        });
}

export function categoryUpdateRequest(params) {
    return dispatch =>
        new Promise((resolve, reject) => {
            dispatch(authPageLoading(true));
            Http.patch(
                `administration/product-categories/${params.id}`,
                transformRequest(params)
            )
                .then(res => {
                    dispatch(
                        categoryActions.addCategory(
                            transformResponse(res.data.data.product_category)
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
                    } else if (statusCode === 401 || statusCode === 402) {
                        data.error = err.response.data.error.message;
                    }
                    dispatch(authPageLoading(false));
                    return reject(data);
                });
        });
}

export function categoryRemoveRequest(id) {
    return dispatch => {
        dispatch(authPageLoading(true));
        Http.delete(`administration/product-categories/${id}`)
            .then(res => {
                dispatch(categoryActions.removeCategory(id));
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

export function categoryListRequest({
    pageNumber = 1,
    url = "administration/product-categories"
}) {
    return dispatch => {
        dispatch(authPageLoading(true));
        if (pageNumber > 1) {
            url = url + `?page=${pageNumber}`;
        }

        Http.get(url)
            .then(res => {
                dispatch(
                    categoryActions.listCategory(
                        transformResponse(res.data.data.product_categories)
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
    };
}

export function categoryEditRequest(id) {
    return dispatch => {
        dispatch(authPageLoading(true));
        Http.get(`administration/product-categories/${id}`)
            .then(res => {
                dispatch(
                    categoryActions.addCategory(
                        transformResponse(res.data.data.product_category)
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
    };
}
