import moment from "moment";
import Model from "../../../utils/Model";

class Lead extends Model {
    constructor(props) {
        super(props);

        this.initialize(props);
    }

    initialize(props) {
        super.initialize(props);

        // this.salesrep = props.salesrep ? new User(props.salesrep) : null;
        this.name = props.name || "";
    }
}

export default Lead;
