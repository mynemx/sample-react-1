import administrationRoutes from "../modules/administration/routes";
import authRoutes from "../modules/auth/routes";
import crmRoutes from "../modules/crm/routes";
import webRoutes from "../modules/web/routes";

export default [
  ...administrationRoutes,
  ...authRoutes,
  ...crmRoutes,
  ...webRoutes
];
