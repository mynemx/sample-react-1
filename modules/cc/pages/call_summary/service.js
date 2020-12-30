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

export function callEventListRequest(data) {
    return dispatch => dispatch(actions.listCallEvent(transformResponse(data)));
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
