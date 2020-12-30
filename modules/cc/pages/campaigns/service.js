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

export function campaignAddRequest(params) {
    return dispatch =>
        new Promise((resolve, reject) => {
            dispatch(authPageLoading(true));
            Http.post("cc/call_campaigns", transformRequest(params))
                .then(res => {
                    dispatch(
                        actions.addCampaign(
                            transformResponse(res.data.data.call_campaign)
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

export function campaignUpdateRequest(params) {
    return dispatch =>
        new Promise((resolve, reject) => {
            dispatch(authPageLoading(true));
            Http.patch(
                `cc/call_campaigns/${params.id}`,
                transformRequest(params)
            )
                .then(res => {
                    dispatch(
                        actions.addCampaign(
                            transformResponse(res.data.data.call_campaign)
                        )
                    );
                    dispatch(authPageLoading(false));
                    showNotification(res.data.data.msg, "success");
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

export function campaignRemoveRequest(id) {
    return dispatch =>
        new Promise((resolve, reject) => {
            dispatch(authPageLoading(true));
            Http.delete(`cc/call_campaigns/${id}`)
                .then(res => {
                    dispatch(actions.removeCampaign(id));
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

export function campaignListRequest({
    pageNumber = 1,
    user = [],
    title = "",
    listType = "",
    limits = 50,
    loader = true,
    url = "cc/call_campaigns"
}) {
    return dispatch =>
        new Promise((resolve, reject) => {
            dispatch(authPageLoading(loader));
            const userquery = user.reduce((qry, val) => {
                return qry + `&user_id[]=${val}`;
            }, "");
            url =
                url +
                `?page=${pageNumber}&title=${title}&listType=${listType}${userquery}&limits=${limits}`;

            Http.get(url)
                .then(res => {
                    dispatch(
                        actions.listCampaign(
                            transformResponse(res.data.data.call_campaigns)
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

export function campaignRecipientsRequest({
    name,
    location,
    offset,
    limits,
    industry = [],
    status = [],
    gender = [],
    category = [],
    type = [],
    recipientType = "lead",
    data = "leads",
    url = "crm/leads"
}) {
    return dispatch =>
        new Promise((resolve, reject) => {
            dispatch(authPageLoading(true));
            const genderquery = gender.reduce((qry, val) => {
                return qry + `&gender[]=${val}`;
            }, "");
            let statusquery = "";
            let industryquery = "";
            let categoryquery = "";
            let typequery = "";
            switch (recipientType.toLowerCase()) {
                case "lead":
                    statusquery = status.reduce((qry, val) => {
                        return qry + `&lead_status_id[]=${val}`;
                    }, "");
                    industryquery = industry.reduce((qry, val) => {
                        return qry + `&industry_id[]=${val}`;
                    }, "");
                    url = `crm/leads/search?name=${name}&location=${location}${industryquery}${genderquery}${statusquery}&offset=${offset}&limits=${limits}`;
                    data = "leads";
                    break;
                case "company":
                    categoryquery = category.reduce((qry, val) => {
                        return qry + `&company_category_id[]=${val}`;
                    }, "");
                    typequery = type.reduce((qry, val) => {
                        return qry + `&company_type_id[]=${val}`;
                    }, "");
                    industryquery = industry.reduce((qry, val) => {
                        return qry + `&industry_id[]=${val}`;
                    }, "");
                    url = `crm/companies/search?name=${name}&location=${location}${industryquery}${categoryquery}${typequery}&offset=${offset}&limits=${limits}`;
                    data = "companies";
                    break;
                case "contact":
                    categoryquery = category.reduce((qry, val) => {
                        return qry + `&contact_category_id[]=${val}`;
                    }, "");
                    typequery = type.reduce((qry, val) => {
                        return qry + `&contact_type_id[]=${val}`;
                    }, "");
                    url = `crm/contacts/search?name=${name}&location=${location}${genderquery}${categoryquery}${typequery}&offset=${offset}&limits=${limits}`;
                    data = "contacts";
                    break;
                default:
                    categoryquery = category.reduce((qry, val) => {
                        return qry + `&contact_category_id[]=${val}`;
                    }, "");
                    typequery = type.reduce((qry, val) => {
                        return qry + `&contact_type_id[]=${val}`;
                    }, "");
                    url = `crm/contacts/search?name=${name}&location=${location}${genderquery}&offset=${offset}&limits=${limits}`;
                    data = "contacts";
                    break;
            }
            Http.get(url)
                .then(res => {
                    dispatch(authPageLoading(false));
                    resolve(transformResponse(res.data.data[data]));
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

export function campaignEditRequest(id) {
    return dispatch =>
        new Promise((resolve, reject) => {
            Http.get(`cc/call_campaigns/${id}`)
                .then(res => {
                    dispatch(
                        actions.addCampaign(
                            transformResponse(res.data.data.call_campaign)
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

export function campaignQueueRequest(params) {
    return dispatch =>
        new Promise((resolve, reject) => {
            dispatch(authPageLoading(true));
            Http.patch(
                `cc/call_campaigns/${params.campaignId}/queue/${params.id}`,
                transformRequest(params)
            )
                .then(res => {
                    dispatch(
                        actions.addCampaign(
                            transformResponse(res.data.data.call_campaign)
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

                    if (statusCode === 401) {
                        data.error = err.response.data.error.message;
                    }
                    dispatch(authPageLoading(false));
                    return reject(data);
                });
        });
}

export function campaignDequeueRequest(params) {
    return dispatch =>
        new Promise((resolve, reject) => {
            dispatch(authPageLoading(true));
            Http.patch(
                `cc/call_campaigns/${params.campaignId}/dequeue/${params.id}`,
                transformRequest(params)
            )
                .then(res => {
                    dispatch(
                        actions.addCampaign(
                            transformResponse(res.data.data.call_campaign)
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

                    if (statusCode === 401) {
                        data.error = err.response.data.error.message;
                    }
                    dispatch(authPageLoading(false));
                    return reject(data);
                });
        });
}

export function campaignStateRequest(params) {
    return dispatch =>
        new Promise((resolve, reject) => {
            dispatch(authPageLoading(true));
            Http.patch(
                `cc/call_campaigns/${params.id}/state`,
                transformRequest(params)
            )
                .then(res => {
                    dispatch(
                        actions.addCampaign(
                            transformResponse(res.data.data.call_campaign)
                        )
                    );
                    dispatch(authPageLoading(false));
                    showNotification(res.data.data.msg, "success");
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

export function campaignStopRequest(params) {
    return dispatch =>
        new Promise((resolve, reject) => {
            dispatch(authPageLoading(true));
            Http.patch(
                `cc/call_campaigns/${params.id}/stop`,
                transformRequest(params)
            )
                .then(res => {
                    dispatch(
                        actions.addCampaign(
                            transformResponse(res.data.data.call_campaign)
                        )
                    );
                    dispatch(authPageLoading(false));
                    showNotification(res.data.data.msg, "success");
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

export function campaignRestartRequest(params) {
    return dispatch =>
        new Promise((resolve, reject) => {
            dispatch(authPageLoading(true));
            Http.patch(
                `cc/call_campaigns/${params.id}/restart`,
                transformRequest(params)
            )
                .then(res => {
                    dispatch(
                        actions.addCampaign(
                            transformResponse(res.data.data.call_campaign)
                        )
                    );
                    dispatch(authPageLoading(false));
                    showNotification(res.data.data.msg, "success");
                    return resolve();
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

export function campaignReportRequest({
    campaignId = null,
    url = "cc/call_campaigns/report"
}) {
    return dispatch =>
        new Promise((resolve, reject) => {
            // dispatch(authPageLoading(true));
            url = url + `?campaign_id=${campaignId}`;

            Http.get(url)
                .then(res => {
                    // dispatch(authPageLoading(false));
                    resolve(transformResponse(res.data.data.summary));
                })
                .catch(err => {
                    // TODO: handle err
                    const statusCode = err.response.status;
                    const data = {
                        error: err.response.data.error.message,
                        statusCode
                    };
                    // dispatch(authPageLoading(false));
                    return reject(data);
                });
        });
}
