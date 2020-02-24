import CrmModule from "./crm.module";
import ListCompany from "./pages/companies/list";
import ArchiveCompany from "./pages/companies/archive";
import AddCompany from "./pages/companies/add";
import EditCompany from "./pages/companies/edit";
import ShowCompany from "./pages/companies/show";
import ListContact from "./pages/contacts/list";
import AddContact from "./pages/contacts/add";
import EditContact from "./pages/contacts/edit";
import ShowContact from "./pages/contacts/show";
import ListLead from "./pages/leads/list";
import EditLead from "./pages/leads/edit";
import ShowLead from "./pages/leads/show";
import AddLead from "./pages/leads/add";
import ListOrder from "./pages/orders/list";
import AddOrder from "./pages/orders/add";
import EditOrder from "./pages/orders/edit";
import ShowOrder from "./pages/orders/show";

export default [
    {
        path: "/app/crm",
        exact: true,
        auth: true,
        module: CrmModule,
        component: ListContact,
        redirect: true,
        to: "/app/crm/companies"
    },
    {
        path: "/app/crm/companies",
        exact: true,
        auth: true,
        module: CrmModule,
        component: ListCompany,
        redirect: false
    },
    {
        path: "/app/crm/companies/archives",
        exact: true,
        auth: true,
        module: CrmModule,
        component: ArchiveCompany,
        redirect: false
    },
    {
        path: "/app/crm/companies/add",
        exact: true,
        auth: true,
        module: CrmModule,
        component: AddCompany,
        redirect: false
    },
    {
        path: "/app/crm/companies/edit/:id",
        exact: true,
        auth: true,
        module: CrmModule,
        component: EditCompany,
        redirect: false
    },
    {
        path: "/app/crm/companies/:id",
        exact: false,
        auth: true,
        module: CrmModule,
        component: ShowCompany,
        redirect: false
    },
    {
        path: "/app/crm/contacts",
        exact: true,
        auth: true,
        module: CrmModule,
        component: ListContact,
        redirect: false
    },
    {
        path: "/app/crm/contacts/add",
        exact: true,
        auth: true,
        module: CrmModule,
        component: AddContact,
        redirect: false
    },
    {
        path: "/app/crm/contacts/edit/:id",
        exact: true,
        auth: true,
        module: CrmModule,
        component: EditContact,
        redirect: false
    },
    {
        path: "/app/crm/contacts/:id",
        auth: true,
        module: CrmModule,
        component: ShowContact,
        redirect: false
    },
    {
        path: "/app/crm/leads",
        exact: true,
        auth: true,
        module: CrmModule,
        component: ListLead,
        redirect: false
    },
    {
        path: "/app/crm/leads/add",
        exact: true,
        auth: true,
        module: CrmModule,
        component: AddLead,
        redirect: false
    },
    {
        path: "/app/crm/leads/edit/:id",
        exact: true,
        auth: true,
        module: CrmModule,
        component: EditLead,
        redirect: false
    },
    {
        path: "/app/crm/leads/:id",
        exact: false,
        auth: true,
        module: CrmModule,
        component: ShowLead,
        redirect: false
    },
    {
        path: "/app/crm/orders",
        exact: true,
        auth: true,
        module: CrmModule,
        component: ListOrder,
        redirect: false
    },
    {
        path: "/app/crm/orders/add",
        exact: true,
        auth: true,
        module: CrmModule,
        component: AddOrder,
        redirect: false
    },
    {
        path: "/app/crm/orders/edit/:id",
        exact: true,
        auth: true,
        module: CrmModule,
        component: EditOrder,
        redirect: false
    },
    {
        path: "/app/crm/orders/:id",
        auth: true,
        module: CrmModule,
        component: ShowOrder,
        redirect: false
    }
];
