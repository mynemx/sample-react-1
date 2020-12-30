import ReportModule from "./report.module";
import CallReport from "./pages/calls";
import GatewayReport from "./pages/call_gateways";
import AgentKPI from "./pages/agent_kpi";
import AgentKPIBreakdown from "./pages/agent_kpi_breakdown";
import AirtimeReport from "./pages/airtime";
import OrderReport from "./pages/orders";
import FeedbackReport from "./pages/feedbacks";

export default [
    {
        path: "/app/report",
        exact: true,
        auth: true,
        module: ReportModule,
        redirect: true,
        to: "/app/report/gateway-summary"
    },
    {
        path: "/app/report/calls",
        exact: true,
        auth: true,
        permissions: ["Administrator", "Supervisor"],
        module: ReportModule,
        component: CallReport,
        redirect: false
    },
    {
        path: "/app/report/gateway-summary",
        exact: true,
        auth: true,
        permissions: ["Administrator", "Supervisor"],
        module: ReportModule,
        component: GatewayReport,
        redirect: false
    },
    {
        path: "/app/report/agent-kpi",
        exact: true,
        auth: true,
        permissions: ["Administrator", "Supervisor"],
        module: ReportModule,
        component: AgentKPI,
        redirect: false
    },
    {
        path: "/app/report/agent-kpi/:id/:date",
        exact: true,
        auth: true,
        permissions: ["Administrator", "Supervisor"],
        module: ReportModule,
        component: AgentKPIBreakdown,
        redirect: false
    },
    {
        path: "/app/report/sales",
        exact: true,
        auth: true,
        permissions: ["Administrator", "Supervisor"],
        module: ReportModule,
        component: OrderReport,
        redirect: false
    },
    {
        path: "/app/report/feedbacks",
        exact: true,
        auth: true,
        permissions: ["Administrator", "Supervisor"],
        module: ReportModule,
        component: FeedbackReport,
        redirect: false
    },
    {
        path: "/app/report/airtime",
        exact: true,
        auth: true,
        permissions: ["Administrator", "Supervisor"],
        module: ReportModule,
        component: AirtimeReport,
        redirect: false
    }
];
