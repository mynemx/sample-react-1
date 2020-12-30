import Http from "../../../utils/Http";
import Transformer from "../../../utils/Transformer";
import { showNotification } from "../../../utils/Notification";
import * as actions from "../store/actions";
import { authPageLoading } from "../../auth/store/actions";

function transformRequest(parms) {
    return Transformer.send(parms);
}

function transformResponse(params) {
    return Transformer.fetch(params);
}

export function gatewayReportRequest({
    gateway = "",
    calldate = "",
    url = "cc/call_reports/gateway-report"
}) {
    return dispatch =>
        new Promise((resolve, reject) => {
            dispatch(authPageLoading(true));
            
            url = url + `?did_number=${gateway}&calldate=${calldate}`;

            Http.get(url)
                .then(res => {
                    dispatch(
                        actions.gatewaySummary(
                            transformResponse(res.data.data.summary)
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
                    // console.log('error',data)
                    dispatch(authPageLoading(false));
                    return reject(data);
                });
        });
}


export function agentKPIReportRequest({
    calldate = "",
    url = "cc/call_reports/agent-kpi-report"
}) {
    return dispatch =>
        new Promise((resolve, reject) => {
            dispatch(authPageLoading(true));
            
            url = url + `?calldate=${calldate}`;

            Http.get(url)
                .then(res => {
                    dispatch(
                        actions.agentKPI(
                            transformResponse(res.data.data.summary)
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
                    // console.log('error',data)
                    dispatch(authPageLoading(false));
                    return reject(data);
                });
        });
}


export function agentKPIExportReportRequest({
    calldate = "",
    url = "cc/call_reports/agent-kpi-report-export"
}) {
    return dispatch =>
        new Promise((resolve, reject) => {
            dispatch(authPageLoading(true));
            
            url = url + `?calldate=${calldate}`;
            let execlName =  'agent-kpi-report.xlsx';
            Http.get(url, { responseType: 'arraybuffer' })
                .then(res => {
                    console.log(res.data)
                    const blob = new Blob(
                        [res.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
                    dispatch(authPageLoading(false));
                    return resolve(blob);

                })
                .catch(err => {
                    // TODO: handle err
                    
                    // console.log('error', err)
                    dispatch(authPageLoading(false));
                });
        });
}

export function agentKPIBreakdownReportRequest({
    calldate = "",
    user_id = "",
    url = "cc/call_reports/agent-kpi-breakdown-report"
}) {
    return dispatch =>
        new Promise((resolve, reject) => {
            dispatch(authPageLoading(true));
            url = url + `?calldate=${calldate}&user_id=${user_id}`;

            Http.get(url)
                .then(res => {
                    let summary = transformResponse(res.data.data.summary);
                    dispatch(authPageLoading(false));
                    return resolve(summary);
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

export function agentKPIBreakdownExportReportRequest({
    calldate = "",
    user_id = "",
    url = "cc/call_reports/agent-kpi-breakdown-report-export"
}) {
    return dispatch =>
        new Promise((resolve, reject) => {
            dispatch(authPageLoading(true));
            
            url = url + `?calldate=${calldate}&user_id=${user_id}`;
            let execlName =  'agent-kpi-report.xlsx';
            Http.get(url, { responseType: 'arraybuffer' })
                .then(res => {
                    const blob = new Blob(
                        [res.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
                    dispatch(authPageLoading(false));
                    return resolve(blob);

                })
                .catch(err => {
                    // TODO: handle err
                    
                    // console.log('error', err)
                    dispatch(authPageLoading(false));
                });
        });
}


export function agentReportRequest({
    exten = "",
    calldate = "",
    url = "cc/call_reports/agent-report"
}) {
    return dispatch =>
        new Promise((resolve, reject) => {
            dispatch(authPageLoading(true));
            
            url = url + `?exten=${exten}&calldate=${calldate}`;

            Http.get(url)
                .then(res => {
                    dispatch(
                        actions.agentSummary(
                            transformResponse(res.data.data.summary)
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
                    console.log('error',data)
                    dispatch(authPageLoading(false));
                    return reject(data);
                });
        });
}
