/* ============
 * Actions for the user module
 * ============
 *
 * The actions that are available on the
 * user module.
 */

import { LOAD_APP_SETTINGS } from "./action-types";

export function loadAppSettings(payload) {
    return {
        type: LOAD_APP_SETTINGS,
        payload
    };
}
