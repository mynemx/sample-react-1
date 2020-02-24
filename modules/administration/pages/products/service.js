import Http from "../../../../utils/Http";
import Transformer from "../../../../utils/Transformer";
import { showNotification } from "../../../../utils/Notification";
import * as productActions from "../../store/actions";
import { authPageLoading } from "../../../auth/store/actions";

function transformRequest(parms) {
    return Transformer.send(parms);
}

function transformResponse(params) {
    return Transformer.fetch(params);
}

export function productAddRequest(params) {
    return dispatch =>
        new Promise((resolve, reject) => {
            dispatch(authPageLoading(true));
            Http.post("administration/products", transformRequest(params))
                .then(res => {
                    dispatch(
                        productActions.addProduct(
                            transformResponse(res.data.data.product)
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

export function productUpdateRequest(params) {
    return dispatch =>
        new Promise((resolve, reject) => {
            dispatch(authPageLoading(true));
            Http.patch(
                `administration/products/${params.id}`,
                transformRequest(params)
            )
                .then(res => {
                    dispatch(
                        productActions.addProduct(
                            transformResponse(res.data.data.product)
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

export function productRemoveRequest(id) {
    return dispatch => {
        dispatch(authPageLoading(true));
        Http.delete(`administration/products/${id}`)
            .then(res => {
                dispatch(productActions.removeProduct(id));
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

export function productListRequest({
    pageNumber = 1,
    name = "",
    limits = "",
    category = "",
    url = "administration/products"
}) {
    return dispatch => {
        dispatch(authPageLoading(true));
        url =
            url +
            `?page=${pageNumber}&name=${name}&product_category_id=${category}&limits=${limits}`;

        Http.get(url)
            .then(res => {
                dispatch(
                    productActions.listProduct(
                        transformResponse(res.data.data.products)
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

export function productEditRequest(id) {
    return dispatch => {
        dispatch(authPageLoading(true));
        Http.get(`administration/products/${id}`)
            .then(res => {
                dispatch(
                    productActions.addProduct(
                        transformResponse(res.data.data.product)
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
