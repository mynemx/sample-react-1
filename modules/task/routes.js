import TaskModule from "./task.module";
import AllTask from "./pages/all-task";

export default [
    {
        path: "/app/company/personal/all-task",
        exact: true,
        auth: true,
        module: TaskModule,
        component: AllTask,
        redirect: false
    },
    {
        path: "/app/company/personal/",
        auth: true,
        module: TaskModule,
        component: AllTask,
        to: "/app/company/personal/all-task",
        redirect: true
    }
];
