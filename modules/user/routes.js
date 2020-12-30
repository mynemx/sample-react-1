import UserModule from "./user.module";
import Profile from "./pages/index";

export default [
    {
        path: "/app/user/profile",
        exact: true,
        auth: true,
        module: UserModule,
        component: Profile,
        redirect: true,
        to: "/app/user/profile/personal-information"
    },
    {
        path: "/app/user/profile/personal-information",
        exact: true,
        auth: true,
        module: UserModule,
        component: Profile,
        redirect: false
    }
];
