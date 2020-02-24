import HTTP from "../../../utils/Http";
import {
    AUTH_CHECK,
    AUTH_LOGIN,
    AUTH_LOGOUT,
    AUTH_REFRESH_TOKEN,
    AUTH_RESET_PASSWORD,
    AUTH_TOGGLESIDEBAR,
    AUTH_PAGELOADING,
    AUTH_CONTENTLOADING
} from "./action-types";

const initialState = {
    isAuthenticated: false,
    pageLoading: false,
    contentLoading: false,
    showSidebar: false
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
        case AUTH_PAGELOADING:
            return togglePageLoading(state, payload);
        case AUTH_CONTENTLOADING:
            return toggleContentLoading(state, payload);
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
    localStorage.setItem("hotdesk_sidebar_status", !state.showSidebar);
    return {
        ...state,
        showSidebar: !state.showSidebar
    };
}

function togglePageLoading(state, payload) {
    return {
        ...state,
        pageLoading: payload
    };
}

function toggleContentLoading(state, payload) {
    return {
        ...state,
        contentLoading: payload
    };
}

function logout(state) {
    localStorage.removeItem("access_token");
    localStorage.removeItem("hotdesk_sidebar_status");

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
