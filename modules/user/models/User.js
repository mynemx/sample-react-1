import moment from "moment";
import Model from "../../../utils/Model";
import { rootUrl } from "../../../lib/helpers";

class User extends Model {
    constructor(props) {
        super(props);

        this.initialize(props);
    }

    initialize(props) {
        super.initialize(props);

        this.firstName = props.firstName || "";
        this.secondName = props.secondName || "";
        this.lastName = props.lastName || "";
        this.email = props.email || "";
        this.phone = props.phone || "";
        this.roles = props.roles || [];
        this.photo = props.photo || `${rootUrl}images/avatar.jpg`;
        this.department = props.department || { name: "" };
        this.dob = props.dob ? moment(props.dob).format("YYYY-MM-DD") : null;
        this.roleIds = this.roles.map(role => {
            return role.id;
        });
        this.intials = this.firstName.charAt(0) + this.lastName.charAt(0);
    }
}

export default User;
