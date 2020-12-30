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

export function leadAddRequest(params) {
    return dispatch =>
        new Promise((resolve, reject) => {
            dispatch(authPageLoading(true));
            Http.post("crm/leads", transformRequest(params))
                .then(res => {
                    dispatch(
                        actions.addLead(transformResponse(res.data.data.lead))
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

export function leadUpdateRequest(params) {
    return dispatch =>
        new Promise((resolve, reject) => {
            dispatch(authPageLoading(true));
            Http.patch(`crm/leads/${params.id}`, transformRequest(params))
                .then(res => {
                    dispatch(
                        actions.addLead(transformResponse(res.data.data.lead))
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

export function leadMigrateAsContactRequest(id) {
    return dispatch =>
        new Promise((resolve, reject) => {
            dispatch(authPageLoading(true));
            Http.patch(
                `crm/leads/${id}/migrate_to_contact`,
                transformRequest({})
            )
                .then(res => {
                    dispatch(
                        actions.addContact(
                            transformResponse(res.data.data.contact)
                        )
                    );
                    showNotification(res.data.data.msg, "success");
                    dispatch(actions.removeLead(id));
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

export function leadMigrateAsCompanyRequest(id) {
    return dispatch =>
        new Promise((resolve, reject) => {
            dispatch(authPageLoading(true));
            Http.patch(
                `crm/leads/${id}/migrate_to_company`,
                transformRequest({})
            )
                .then(res => {
                    dispatch(
                        actions.addCompany(
                            transformResponse(res.data.data.company)
                        )
                    );

                    showNotification(res.data.data.msg, "success");
                    dispatch(actions.removeLead(id));
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

export function leadRemoveRequest(id) {
    return dispatch =>
        new Promise((resolve, reject) => {
            dispatch(authPageLoading(true));
            Http.delete(`crm/leads/${id}`)
                .then(res => {
                    dispatch(actions.removeLead(id));
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

export function leadListRequest({
    name = "",
    phone = "",
    location = "",
    limits = 100,
    user = [],
    gender = [],
    industry = [],
    source = [],
    status = [],
    pageNumber = 1,
    loader = true,
    url = "crm/leads"
}) {
    return dispatch =>
        new Promise((resolve, reject) => {
            dispatch(authPageLoading(loader));
            const statusquery = status.reduce((qry, val) => {
                return qry + `&lead_status_id[]=${val}`;
            }, "");
            const industryquery = industry.reduce((qry, val) => {
                return qry + `&industry_id[]=${val}`;
            }, "");

            const userquery = user.reduce((qry, val) => {
                return qry + `&sales_rep_id[]=${val}`;
            }, "");

            const sourcequery = source.reduce((qry, val) => {
                return qry + `&source[]=${val}`;
            }, "");

            const genderquery = gender.reduce((qry, val) => {
                return qry + `&gender[]=${val}`;
            }, "");

            url =
                url +
                `?name=${name}&phone=${phone}&location=${location}${statusquery}${genderquery}${industryquery}${userquery}${sourcequery}&limits=${limits}&page=${pageNumber}`;

            Http.get(url)
                .then(res => {
                    dispatch(
                        actions.listLead(transformResponse(res.data.data.leads))
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

export function leadEditRequest(id) {
    return dispatch =>
        new Promise((resolve, reject) => {
            dispatch(authPageLoading(true));
            Http.get(`crm/leads/${id}`)
                .then(res => {
                    dispatch(
                        actions.addLead(transformResponse(res.data.data.lead))
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
