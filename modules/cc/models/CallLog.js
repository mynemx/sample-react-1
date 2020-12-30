import moment from "moment";
import Model from "../../../utils/Model";

class CallLog extends Model {
    constructor(props) {
        super(props);

        this.initialize(props);
    }

    initialize(props) {
        super.initialize(props);
        // this.calldate = (props.calldate && moment(props.calldate)) || null;
        // this.clid = "";
        this.calldate = (props.calldate && moment(props.calldate)) || null;
    }
}

export default CallLog;
