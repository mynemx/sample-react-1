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

export function campaignListAddRequest(params) {
    return dispatch =>
        new Promise((resolve, reject) => {
            dispatch(authPageLoading(true));
            Http.post("cc/call_campaign_lists", transformRequest(params))
                .then(res => {
                    dispatch(
                        actions.addCampaignList(
                            transformResponse(res.data.data.campaign_list)
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

export function campaignListUpdateRequest(params) {
    return dispatch =>
        new Promise((resolve, reject) => {
            dispatch(authPageLoading(true));
            Http.patch(
                `cc/call_campaign_lists/${params.id}`,
                transformRequest(params)
            )
                .then(res => {
                    dispatch(
                        actions.addCampaignList(
                            transformResponse(res.data.data.campaign_list)
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

export function campaignListRemoveRequest(id) {
    return dispatch =>
        new Promise((resolve, reject) => {
            dispatch(authPageLoading(true));
            Http.delete(`cc/call_campaign_lists/${id}`)
                .then(res => {
                    dispatch(actions.removeCampaignList(id));
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

export function campaignListListRequest({
    pageNumber = 1,
    name = "",
    limits = "",
    loader = true,
    url = "cc/call_campaign_lists"
}) {
    return dispatch =>
        new Promise((resolve, reject) => {
            dispatch(authPageLoading(loader));
            url = url + `?page=${pageNumber}&name=${name}&limits=${limits}`;

            Http.get(url)
                .then(res => {
                    dispatch(
                        actions.listCampaignList(
                            transformResponse(res.data.data.campaign_lists)
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

export function campaignListRecipientsRequest({
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

export function campaignListImportRecipientsRequest(params) {
    return dispatch =>
        new Promise((resolve, reject) => {
            dispatch(authPageLoading(true));
            Http.patch(
                `cc/call_campaign_lists/${params.id}/import`,
                transformRequest(params)
            )
                .then(res => {
                    dispatch(
                        actions.addCampaignList(
                            transformResponse(res.data.data.campaign_list)
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

export function campaignListDetachRecipientsRequest(params) {
    return dispatch =>
        new Promise((resolve, reject) => {
            dispatch(authPageLoading(true));
            Http.patch(
                `cc/call_campaign_lists/${params.id}/detach`,
                transformRequest(params)
            )
                .then(res => {
                    dispatch(
                        actions.addCampaignList(
                            transformResponse(res.data.data.campaign_list)
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

export function campaignListEditRequest(id) {
    return dispatch =>
        new Promise((resolve, reject) => {
            dispatch(authPageLoading(true));
            Http.get(`cc/call_campaign_lists/${id}`)
                .then(res => {
                    dispatch(
                        actions.addCampaignList(
                            transformResponse(res.data.data.campaign_list)
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
