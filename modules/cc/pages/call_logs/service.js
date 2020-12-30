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

export function callLogListRequest({
    pageNumber = 1,
    destination = "",
    caller = "",
    src = "",
    direction = "",
    calldate = "",
    limits = "",
    url = "cc/call_logs"
}) {
    return dispatch =>
        new Promise((resolve, reject) => {
            dispatch(authPageLoading(true));
            url =
                url +
                `?page=${pageNumber}&destination=${destination}&caller=${caller}&src=${src}&direction=${direction}&calldate=${calldate}&limits=${limits}`;

            Http.get(url)
                .then(res => {
                    dispatch(
                        actions.listCallLog(
                            transformResponse(res.data.data.call_logs)
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

export function callLogEditRequest(id) {
    return dispatch =>
        new Promise((resolve, reject) => {
            dispatch(authPageLoading(true));
            Http.get(`cc/call_logs/${id}`)
                .then(res => {
                    dispatch(
                        actions.addCallLog(
                            transformResponse(res.data.data.call_log)
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
