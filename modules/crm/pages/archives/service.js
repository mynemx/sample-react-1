import Http from "../../../../utils/Http";
import Transformer from "../../../../utils/Transformer";
import { showNotification } from "../../../../utils/Notification";
import * as actions from "../../store/actions";

function transformRequest(parms) {
    return Transformer.send(parms);
}

function transformResponse(params) {
    return Transformer.fetch(params);
}

export function companyAddRequest(params) {
    return dispatch =>
        new Promise((resolve, reject) => {
            Http.post("crm/companies", transformRequest(params))
                .then(res => {
                    dispatch(
                        actions.addCompany(
                            transformResponse(res.data.data.company)
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

export function companyUpdateRequest(params) {
    return dispatch =>
        new Promise((resolve, reject) => {
            Http.patch(`crm/companies/${params.id}`, transformRequest(params))
                .then(res => {
                    dispatch(
                        actions.addCompany(
                            transformResponse(res.data.data.company)
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

export function companyRemoveRequest(id) {
    return dispatch =>
        new Promise((resolve, reject) => {
            Http.delete(`crm/companies/${id}`)
                .then(res => {
                    dispatch(actions.removeCompany(id));
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
                    return reject(data);
                });
        });
}

export function companyArchiveRequest(id) {
    return dispatch =>
        new Promise((resolve, reject) => {
            Http.patch(`crm/companies/archive/${id}`, {})
                .then(res => {
                    dispatch(actions.removeCompany(id));
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
                    return reject(data);
                });
        });
}

export function companyRestoreRequest(id) {
    return dispatch =>
        new Promise((resolve, reject) => {
            Http.patch(`crm/companies/restore/${id}`, {})
                .then(res => {
                    dispatch(actions.removeCompany(id));
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
                    return reject(data);
                });
        });
}
export function companyImportRequest(params) {
    return dispatch =>
        new Promise((resolve, reject) => {
            console.log(params);
            const reader = new FileReader(params.file);
            reader.readAsDataURL(params.file);
            reader.onload = e => {
                const formdata = { file: e.target.result };

                Http.post("crm/companies/import", transformRequest(formdata))
                    .then(res => {
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
            };
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
    url = "crm/companies"
}) {
    return dispatch =>
        new Promise((resolve, reject) => {
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

export function companyEditRequest(id) {
    return dispatch =>
        new Promise((resolve, reject) => {
            Http.get(`crm/companies/${id}`)
                .then(res => {
                    dispatch(
                        actions.addCompany(
                            transformResponse(res.data.data.company)
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
