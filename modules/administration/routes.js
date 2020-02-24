import AdministrationModule from "./administration.module";
import ListUser from "./pages/users/list";
import AddUser from "./pages/users/add";
import ShowUser from "./pages/users/show";
import EditUser from "./pages/users/edit";
import ListCategory from "./pages/product-categories/list";
import ListProduct from "./pages/products/list";
import FormProduct from "./pages/products/add";

export default [
    {
        path: "/app/company/administration",
        exact: true,
        auth: true,
        module: AdministrationModule,
        permissions: ["Administrator"],
        component: ListUser,
        to: "/app/company/administration/products",
        redirect: true
    },
    {
        path: "/app/company/administration/users",
        exact: true,
        auth: true,
        permissions: ["Administrator", "Supervisor"],
        module: AdministrationModule,
        component: ListUser,
        redirect: false
    },
    {
        path: "/app/company/administration/users/add",
        exact: true,
        auth: true,
        permissions: ["Administrator", "Supervisor"],
        module: AdministrationModule,
        component: AddUser,
        redirect: false
    },
    {
        path: "/app/company/administration/users/:id",
        exact: true,
        auth: true,
        permissions: ["Administrator", "Supervisor"],
        module: AdministrationModule,
        component: ShowUser,
        redirect: false
    },
    {
        path: "/app/company/administration/users/edit/:id",
        exact: true,
        auth: true,
        permissions: ["Administrator", "Supervisor"],
        module: AdministrationModule,
        component: EditUser,
        redirect: false
    },
    {
        path: "/app/company/administration/product-categories",
        exact: true,
        auth: true,
        permissions: ["Administrator", "Supervisor", "Agent"],
        module: AdministrationModule,
        component: ListCategory,
        redirect: false
    },
    {
        path: "/app/company/administration/products",
        exact: true,
        auth: true,
        permissions: ["Administrator", "Supervisor", "Agent"],
        module: AdministrationModule,
        component: ListProduct,
        redirect: false
    },
    {
        path: "/app/company/administration/products/add",
        exact: true,
        auth: true,
        permissions: ["Administrator", "Supervisor", "Agent"],
        module: AdministrationModule,
        component: FormProduct,
        redirect: false
    },
    {
        path: "/app/company/administration/products/edit/:id",
        exact: true,
        auth: true,
        permissions: ["Administrator", "Supervisor", "Agent"],
        module: AdministrationModule,
        component: FormProduct,
        redirect: false
    }
];
