import HTTP from "../../../utils/Http";
import {
    AUTH_CHECK,
    AUTH_LOGIN,
    AUTH_LOGOUT,
    AUTH_REFRESH_TOKEN,
    AUTH_RESET_PASSWORD,
    AUTH_TOGGLESIDEBAR
} from "./action-types";

const initialState = {
    isAuthenticated: false,
    showSidebar: true
};

const reducer = (state = initialState, { type, payload = null }) => {
    switch (type) {
        case AUTH_REFRESH_TOKEN:
        case AUTH_LOGIN:
            return login(state, payload);
        case AUTH_CHECK:
            return checkAuth(state);
        case AUTH_LOGOUT:
            return logout(state);
        case AUTH_RESET_PASSWORD:
            return resetPassword(state);
        case AUTH_TOGGLESIDEBAR:
            return toggleSidebar(state);
        default:
            return state;
    }
};

function login(state, payload) {
    localStorage.setItem("access_token", payload);
    HTTP.defaults.headers.common["Authorization"] = `Bearer ${payload}`;
    return {
        ...state,
        isAuthenticated: true
    };
}

function checkAuth(state) {
    state = Object.assign({}, state, {
        isAuthenticated: !!localStorage.getItem("access_token")
    });

    if (state.isAuthenticated) {
        HTTP.defaults.headers.common[
            "Authorization"
        ] = `Bearer ${localStorage.getItem("access_token")}`;
    }

    return state;
}

function toggleSidebar(state) {
    return {
        ...state,
        showSidebar: !state.showSidebar
    };
}

function logout(state) {
    localStorage.removeItem("access_token");

    return {
        ...state,
        isAuthenticated: false
    };
}

function resetPassword(state) {
    return {
        ...state,
        resetPassword: true
    };
}

export const getAuth = state => state.auth.isAuthenticated;

export default reducer;
