import Noty from "noty";

export const showNotification = (msg, type = "success") => {
    switch (type) {
        case "success":
            new Noty({
                type: "success",
                theme: "relax",
                text: msg,
                layout: "topLeft",
                timeout: 5000
            }).show();
            break;
        case "error":
            new Noty({
                type: "error",
                theme: "relax",
                text: msg,
                layout: "topLeft",
                timeout: 5000
            }).show();
            break;
        case "callback":
            new Noty({
                type: "success",
                theme: "relax",
                text: msg,
                layout: "center"
            }).show();
            break;

        default:
            break;
    }
};
