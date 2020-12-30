import ContactCenterModule from "./contact-center.module";
import ExtensionList from "./pages/extensions/list";
import ExtensionAdd from "./pages/extensions/add";
import ExtensionEdit from "./pages/extensions/edit";

import CampaignListList from "./pages/campaign_lists/list";
import CampaignListAdd from "./pages/campaign_lists/add";
import CampaignListShow from "./pages/campaign_lists/show";
import CampaignListEdit from "./pages/campaign_lists/edit";

import CampaignList from "./pages/campaigns/list";
import CampaignAdd from "./pages/campaigns/add";
import CampaignShow from "./pages/campaigns/show";
import CampaignEdit from "./pages/campaign_lists/edit";

import FeedbackList from "./pages/call_feedbacks/list";
import CallBackList from "./pages/call_feedbacks/callback_list";

import CallLogList from "./pages/call_logs/list";
import CallLogShow from "./pages/call_logs/show";

import CallGatewayList from "./pages/call_gateways/list";

import CallEventList from "./pages/call_events/list";

import CallSummaryList from "./pages/call_summary/list";
import CallSummaryShow from "./pages/call_summary/show";

export default [
    {
        path: "/app/contact-center",
        exact: true,
        auth: true,
        module: ContactCenterModule,
        redirect: true,
        to: "/app/contact-center/campaigns"
    },
    {
        path: "/app/contact-center/sip-extensions",
        exact: true,
        auth: true,
        permissions: ["Administrator", "Supervisor"],
        module: ContactCenterModule,
        component: ExtensionList,
        redirect: false
    },
    {
        path: "/app/contact-center/sip-extensions/add",
        exact: true,
        auth: true,
        permissions: ["Administrator", "Supervisor"],
        module: ContactCenterModule,
        component: ExtensionAdd,
        redirect: false
    },
    {
        path: "/app/contact-center/sip-extensions/edit/:id",
        exact: true,
        auth: true,
        permissions: ["Administrator", "Supervisor"],
        module: ContactCenterModule,
        component: ExtensionEdit,
        redirect: false
    },
    {
        path: "/app/contact-center/campaign-lists",
        exact: true,
        auth: true,
        permissions: ["Administrator", "Supervisor"],
        module: ContactCenterModule,
        component: CampaignListList,
        redirect: false
    },
    {
        path: "/app/contact-center/campaign-lists/add",
        exact: true,
        auth: true,
        permissions: ["Administrator", "Supervisor"],
        module: ContactCenterModule,
        component: CampaignListAdd,
        redirect: false
    },
    {
        path: "/app/contact-center/campaign-lists/edit/:id",
        exact: true,
        auth: true,
        permissions: ["Administrator", "Supervisor"],
        module: ContactCenterModule,
        component: CampaignListEdit,
        redirect: false
    },
    {
        path: "/app/contact-center/campaign-lists/:id",
        exact: false,
        auth: true,
        permissions: ["Administrator", "Supervisor"],
        module: ContactCenterModule,
        component: CampaignListShow,
        redirect: false
    },
    {
        path: "/app/contact-center/campaigns",
        exact: true,
        auth: true,
        module: ContactCenterModule,
        component: CampaignList,
        redirect: false
    },
    {
        path: "/app/contact-center/campaigns/add",
        exact: true,
        auth: true,
        module: ContactCenterModule,
        component: CampaignAdd,
        redirect: false
    },
    {
        path: "/app/contact-center/campaigns/edit/:id",
        exact: true,
        auth: true,
        module: ContactCenterModule,
        component: CampaignEdit,
        redirect: false
    },
    {
        path: "/app/contact-center/campaigns/:id",
        exact: false,
        auth: true,
        module: ContactCenterModule,
        component: CampaignShow,
        redirect: false
    },
    {
        path: "/app/contact-center/call-feedbacks",
        exact: true,
        auth: true,
        module: ContactCenterModule,
        component: FeedbackList,
        redirect: false
    },
    {
        path: "/app/contact-center/call-backs",
        exact: true,
        auth: true,
        module: ContactCenterModule,
        component: CallBackList,
        redirect: false
    },
    {
        path: "/app/contact-center/call-logs",
        exact: true,
        auth: true,
        module: ContactCenterModule,
        component: CallLogList,
        redirect: false
    },
    {
        path: "/app/contact-center/call-logs/:id",
        exact: true,
        auth: true,
        module: ContactCenterModule,
        component: CallLogShow,
        redirect: false
    },
    {
        path: "/app/contact-center/call-events",
        exact: true,
        auth: true,
        module: ContactCenterModule,
        component: CallEventList,
        redirect: false
    },
    {
        path: "/app/contact-center/call-summaries",
        exact: true,
        auth: true,
        permissions: ["Administrator", "Supervisor"],
        module: ContactCenterModule,
        component: CallSummaryList,
        redirect: false
    },
    {
        path: "/app/contact-center/call-summaries/:id",
        exact: true,
        auth: true,
        permissions: ["Administrator", "Supervisor"],
        module: ContactCenterModule,
        component: CallSummaryShow,
        redirect: false
    },
    {
        path: "/app/contact-center/call-gateways",
        exact: true,
        auth: true,
        module: ContactCenterModule,
        component: CallGatewayList,
        redirect: false
    }
];
