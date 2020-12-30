// import webRoutes from "../modules/web/routes"
import administrationRoutes from "../modules/administration/routes";
import authRoutes from "../modules/auth/routes";
import userRoutes from "../modules/user/routes";
import ccRoutes from "../modules/cc/routes";
import helpRoutes from "../modules/help/routes";
import crmRoutes from "../modules/crm/routes";
import dashboardRoutes from "../modules/dashboard/routes";
import settingRoutes from "../modules/settings/routes";
import taskRoutes from "../modules/task/routes";
import reportRoutes from "../modules/report/routes";
import webRoutes from "../modules/web/routes";

export default [
    ...administrationRoutes,
    ...authRoutes,
    ...userRoutes,
    ...helpRoutes,
    ...ccRoutes,
    ...crmRoutes,
    ...dashboardRoutes,
    ...settingRoutes,
    ...taskRoutes,
    ...reportRoutes,
    ...webRoutes
];
