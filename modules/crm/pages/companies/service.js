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

export function companyAddRequest(params) {
    return dispatch =>
        new Promise((resolve, reject) => {
            dispatch(authPageLoading(true));
            Http.post("crm/companies", transformRequest(params))
                .then(res => {
                    dispatch(
                        actions.addCompany(
                            transformResponse(res.data.data.company)
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

export function companyUpdateRequest(params) {
    return dispatch =>
        new Promise((resolve, reject) => {
            dispatch(authPageLoading(true));

            Http.patch(`crm/companies/${params.id}`, transformRequest(params))
                .then(res => {
                    dispatch(
                        actions.addCompany(
                            transformResponse(res.data.data.company)
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

export function companyRemoveRequest(id) {
    return dispatch =>
        new Promise((resolve, reject) => {
            dispatch(authPageLoading(true));
            Http.delete(`crm/companies/${id}`)
                .then(res => {
                    dispatch(actions.removeCompany(id));
                    dispatch(authPageLoading(false));
                    showNotification(res.data.data.msg, "success");
                    resolve();
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

export function companyArchiveRequest(id) {
    return dispatch =>
        new Promise((resolve, reject) => {
            dispatch(authPageLoading(true));
            Http.patch(`crm/companies/archive/${id}`, {})
                .then(res => {
                    dispatch(actions.removeCompany(id));
                    dispatch(authPageLoading(false));
                    showNotification(res.data.data.msg, "success");
                    resolve();
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

export function companyRestoreRequest(id) {
    return dispatch =>
        new Promise((resolve, reject) => {
            dispatch(authPageLoading(true));
            Http.patch(`crm/companies/restore/${id}`, {})
                .then(res => {
                    dispatch(actions.removeCompany(id));
                    dispatch(authPageLoading(false));
                    showNotification(res.data.data.msg, "success");
                    resolve();
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
export function companyImportRequest(params) {
    return dispatch =>
        new Promise((resolve, reject) => {
            dispatch(authPageLoading(true));
            let formdata = new FormData();
            formdata.append("file", params.file, params.file.name);
            Http.post("crm/companies/import", formdata)
                .then(res => {
                    dispatch(authPageLoading(false));
                    showNotification(res.data.data.msg, "success");
                    return resolve(res.data.data.result);
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

export function companyListRequest({
    name = "",
    location = "",
    limits = "",
    industry = [],
    category = [],
    type = [],
    pageNumber = 1,
    loader = true,
    url = "crm/companies"
}) {
    return dispatch =>
        new Promise((resolve, reject) => {
            dispatch(authPageLoading(loader));
            const categoryquery = category.reduce((qry, val) => {
                return qry + `&company_category_id[]=${val}`;
            }, "");
            const typequery = type.reduce((qry, val) => {
                return qry + `&company_type_id[]=${val}`;
            }, "");

            const industryquery = industry.reduce((qry, val) => {
                return qry + `&industry_id[]=${val}`;
            }, "");
            url =
                url +
                `?page=${pageNumber}&name=${name}&location=${location}${categoryquery}${typequery}${industryquery}&limits=${limits}`;

            Http.get(url)
                .then(res => {
                    dispatch(
                        actions.listCompany(
                            transformResponse(res.data.data.companies)
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

export function companyArchivedRequest({
    name = "",
    location = "",
    limits = "",
    industry = [],
    category = [],
    type = [],
    pageNumber = 1,
    url = "crm/companies/archived"
}) {
    return dispatch =>
        new Promise((resolve, reject) => {
            dispatch(authPageLoading(true));
            const categoryquery = category.reduce((qry, val) => {
                return qry + `&company_category_id[]=${val}`;
            }, "");
            const typequery = type.reduce((qry, val) => {
                return qry + `&company_type_id[]=${val}`;
            }, "");

            const industryquery = industry.reduce((qry, val) => {
                return qry + `&industry_id[]=${val}`;
            }, "");
            url =
                url +
                `?page=${pageNumber}&name=${name}&location=${location}${categoryquery}${typequery}${industryquery}&limits=${limits}`;

            Http.get(url)
                .then(res => {
                    dispatch(
                        actions.listCompany(
                            transformResponse(res.data.data.companies)
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

export function companyEditRequest(id) {
    return dispatch =>
        new Promise((resolve, reject) => {
            dispatch(authPageLoading(true));
            Http.get(`crm/companies/${id}`)
                .then(res => {
                    dispatch(
                        actions.addCompany(
                            transformResponse(res.data.data.company)
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

export function companyMigrateAsContactRequest(id) {
    return dispatch =>
        new Promise((resolve, reject) => {
            dispatch(authPageLoading(true));
            Http.patch(
                `crm/companies/${id}/migrate_to_contact`,
                transformRequest({})
            )
                .then(res => {
                    dispatch(
                        actions.addContact(
                            transformResponse(res.data.data.contact)
                        )
                    );
                    showNotification(res.data.data.msg, "success");
                    dispatch(actions.removeCompany(id));
                    dispatch(authPageLoading(false));
                    return resolve(res.data.data.contact);
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

export function companyMigrateAsLeadRequest(id) {
    return dispatch =>
        new Promise((resolve, reject) => {
            dispatch(authPageLoading(true));
            Http.patch(
                `crm/companies/${id}/migrate_to_lead`,
                transformRequest({})
            )
                .then(res => {
                    dispatch(
                        actions.addLead(transformResponse(res.data.data.lead))
                    );

                    showNotification(res.data.data.msg, "success");
                    dispatch(actions.removeCompany(id));
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
