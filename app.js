/**
 * First we will load all of this project's JavaScript dependencies which
 * includes React and other helpers. It's a great starting point while
 * building robust, powerful web applications using React + Laravel.
 */

// require('./bootstrap');

/**
 * Next, we will create a fresh React component instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

// require('./components/Example');

require("./bootstrap");
import React from "react";
import { render } from "react-dom";
import "../../node_modules/font-awesome/css/font-awesome.css";
import { Provider } from "react-redux";
import store from "./store";
import Routes from "./routes";

import { authCheck } from "./modules/auth/store/actions";

Number.prototype.pad = function(size) {
    let s = String(this);
    while (s.length < (size || 2)) {
        s = "0" + s;
    }
    return s;
};

store.dispatch(authCheck());

render(
    <Provider store={store}>
        <Routes />
    </Provider>,
    document.getElementById("main_app")
);
