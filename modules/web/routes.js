import Home from "./pages/landing-page";

export default [
    {
        path: "/",
        exact: true,
        auth: false,
        // redirect: true,
        // to: "/login",
        component: Home
    }
];
