import DashboardModule from "./dashboard.module";
import Dashboard from "./pages";

export default [
    {
        path: "/app",
        exact: true,
        auth: true,
        module: DashboardModule,
        component: Dashboard,
        redirect: false
    }
];
