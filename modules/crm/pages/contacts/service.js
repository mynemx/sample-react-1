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

export function contactAddRequest(params) {
    return dispatch =>
        new Promise((resolve, reject) => {
            dispatch(authPageLoading(true));
            Http.post("crm/contacts", transformRequest(params))
                .then(res => {
                    dispatch(
                        actions.addContact(
                            transformResponse(res.data.data.contact)
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

export function contactUpdateRequest(params) {
    return dispatch =>
        new Promise((resolve, reject) => {
            dispatch(authPageLoading(true));
            Http.patch(`crm/contacts/${params.id}`, transformRequest(params))
                .then(res => {
                    dispatch(
                        actions.addContact(
                            transformResponse(res.data.data.contact)
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

export function contactRemoveRequest(id) {
    return dispatch =>
        new Promise((resolve, reject) => {
            dispatch(authPageLoading(true));
            Http.delete(`crm/contacts/${id}`)
                .then(res => {
                    dispatch(actions.removeContact(id));
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

export function contactListRequest({
    name = "",
    location = "",
    limits = "",
    gender = [],
    category = [],
    type = [],
    pageNumber = 1,
    loader = true,
    url = "crm/contacts"
}) {
    return dispatch =>
        new Promise((resolve, reject) => {
            dispatch(authPageLoading(loader));
            const categoryquery = category.reduce((qry, val) => {
                return qry + `&contact_category_id[]=${val}`;
            }, "");
            const typequery = type.reduce((qry, val) => {
                return qry + `&contact_type_id[]=${val}`;
            }, "");

            const genderquery = gender.reduce((qry, val) => {
                return qry + `&gender[]=${val}`;
            }, "");

            url =
                url +
                `?page=${pageNumber}&name=${name}&location=${location}${categoryquery}${typequery}${genderquery}&limits=${limits}`;

            Http.get(url)
                .then(res => {
                    dispatch(
                        actions.listContact(
                            transformResponse(res.data.data.contacts)
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

export function contactEditRequest(id) {
    return dispatch =>
        new Promise((resolve, reject) => {
            dispatch(authPageLoading(true));
            Http.get(`crm/contacts/${id}`)
                .then(res => {
                    dispatch(
                        actions.addContact(
                            transformResponse(res.data.data.contact)
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

export function contactMigrateAsLeadRequest(id) {
    return dispatch =>
        new Promise((resolve, reject) => {
            dispatch(authPageLoading(true));
            Http.patch(
                `crm/contacts/${id}/migrate_to_lead`,
                transformRequest({})
            )
                .then(res => {
                    dispatch(
                        actions.addLead(transformResponse(res.data.data.lead))
                    );
                    showNotification(res.data.data.msg, "success");
                    dispatch(actions.removeContact(id));
                    dispatch(authPageLoading(false));
                    return resolve(res.data.data.lead);
                })
                .catch(err => {
                    const statusCode = err.response.status;
                    const data = {
                        error: null,
                        statusCode
                    };

                    if (statusCode === 401) {
                        data.error = err.response.data.error.message;
                    }
                    dispatch(authPageLoading(false));
                    return reject(data);
                });
        });
}

export function contactMigrateAsCompanyRequest(id) {
    return dispatch =>
        new Promise((resolve, reject) => {
            dispatch(authPageLoading(true));
            Http.patch(
                `crm/contacts/${id}/migrate_to_company`,
                transformRequest({})
            )
                .then(res => {
                    dispatch(
                        actions.addCompany(
                            transformResponse(res.data.data.company)
                        )
                    );

                    showNotification(res.data.data.msg, "success");
                    dispatch(actions.removeContact(id));
                    dispatch(authPageLoading(false));
                    return resolve(res.data.data.company);
                })
                .catch(err => {
                    const statusCode = err.response.status;
                    const data = {
                        error: null,
                        statusCode
                    };

                    if (statusCode === 401) {
                        data.error = err.response.data.error.message;
                    }
                    dispatch(authPageLoading(false));
                    return reject(data);
                });
        });
}
