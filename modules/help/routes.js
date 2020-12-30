import HelpModule from "./help.module";
import AgentFAQTopicList from "./pages/AgentFAQTopics/list";

export default [
    {
        path: "/app/help",
        exact: true,
        auth: true,
        module: HelpModule,
        redirect: true,
        to: "/app/help/agent-faqs"
    },
    {
        path: "/app/help/agent-faqs",
        exact: true,
        auth: true,
        permissions: ["Administrator", "Supervisor", "Agent"],
        module: HelpModule,
        component: AgentFAQTopicList,
        redirect: false
    },



];
