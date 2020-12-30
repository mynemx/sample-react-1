import moment from "moment";
import Model from "../../../utils/Model";

class Campaign extends Model {
    constructor(props) {
        super(props);

        this.initialize(props);
    }

    initialize(props) {
        super.initialize(props);

        this.title = props.title || "";
        this.listType = props.listType || "";
        this.recipients = props.recipients || [];
        this.pendingRecipients = props.pendingRecipients || [];
        this.callingRecipients = props.callingRecipients || [];
        this.calledRecipients = props.calledRecipients || [];
        this.listId = "";
        this.list = {};
        this.filter = {
            name: "",
            location: "",
            gender: [],
            type: [],
            industry: [],
            status: [],
            category: [],
            offset: "0",
            limits: "100"
        };
    }
}

export default Campaign;
