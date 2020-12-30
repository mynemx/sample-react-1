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

export function agentFAQAddRequest(params) {
    return dispatch =>
        new Promise((resolve, reject) => {
            dispatch(authPageLoading(true));
            Http.post("help/agent_faqs", transformRequest(params))
                .then(res => {
                    dispatch(
                        actions.addAgentFAQ(
                            transformResponse(res.data.data.agent_faq)
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

export function agentFAQUpdateRequest(params) {
    return dispatch =>
        new Promise((resolve, reject) => {
            dispatch(authPageLoading(true));
            Http.patch(
                `help/agent_faqs/${params.id}`,
                transformRequest(params)
            )
                .then(res => {
                    dispatch(
                        actions.addAgentFAQ(
                            transformResponse(res.data.data.agent_faq)
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

export function agentFAQRemoveRequest(id) {
    return dispatch =>
        new Promise((resolve, reject) => {
            dispatch(authPageLoading(true));
            Http.delete(`help/agent_faqs/${id}`)
                .then(res => {
                    dispatch(actions.removeAgentFAQ(id));
                    dispatch(authPageLoading(false));
                    // showNotification(res.data.data.msg, "suhelpess");
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

export function agentFAQListRequest({
    pageNumber = 1,
    url = "help/agent_faqs"
}) {
    return dispatch =>
        new Promise((resolve, reject) => {
            dispatch(authPageLoading(true));
            if (pageNumber > 1) {
                url = url + `?page=${pageNumber}`;
            }
            Http.get(url)
                .then(res => {
                    dispatch(
                        actions.listAgentFAQ(
                            transformResponse(res.data.data.agent_faqs)
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

export function agentFAQEditRequest(id) {
    return dispatch =>
        new Promise((resolve, reject) => {
            dispatch(authPageLoading(true));
            Http.get(`help/agent_faqs/${id}`)
                .then(res => {
                    dispatch(
                        actions.addAgentFAQ(
                            transformResponse(res.data.data.agent_faq)
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
