import { LOAD_APP_SETTINGS } from "./action-types";

const initialState = { departments: [] };

const reducer = (state = initialState, { type, payload = null }) => {
    switch (type) {
        case LOAD_APP_SETTINGS:
            return loadAppSetting(state, payload);
        default:
            return state;
    }
};

function loadAppSetting(state, payload) {
    return {
        ...state,
        ...payload
    };
}

export default reducer;
