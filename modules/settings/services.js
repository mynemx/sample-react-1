import Http from "../../utils/Http";
import * as authActions from "./store/actions";
import Transformer from "../../utils/Transformer";

/**
 * fetch the app settings
 *
 * @returns {function(*)}
 */
export function fetchAppDependencies() {
    return dispatch => {
        return Http.get("app/dependencies")
            .then(res => {
                const data = Transformer.fetch(res.data);
                dispatch(authActions.loadAppSettings(data));
            })
            .catch(err => {
                console.log(err);
            });
    };
}
