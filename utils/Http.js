/* eslint-disable no-console */
import axios from "axios";
import store from "../store/index";
import { authLogout } from "../modules/auth/store/actions";
const rootUrl = document.querySelector("body").getAttribute("data-root-url");
// const API_URL =
//     process.env.NODE_ENV === "test"
//         ? process.env.BASE_URL || `http://localhost:${process.env.PORT}/api/`
//         : `/api/`;

const API_URL = `${rootUrl}/api`;
// const API_URL = `wemy.techmadeeazy.com/wemy/public/api`;

axios.defaults.baseURL = API_URL;
axios.defaults.headers.common.Accept = "application/json";
axios.defaults.headers.common["X-CSRF-TOKEN"] = window.Laravel.csrfToken;
axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
// axios.defaults.headers.common["Content-Type"] = "multipart/form-data";
// axios.defaults.headers.common["enctype"] = "multipart/form-data";

axios.interceptors.response.use(
    response => response,
    error => {
        if (error.response.status === 401) {
            store.dispatch(authLogout());
        }
        return Promise.reject(error);
    }
);

export default axios;
