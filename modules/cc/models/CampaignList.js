import moment from "moment";
import Model from "../../../utils/Model";

class CampaignList extends Model {
    constructor(props) {
        super(props);

        this.initialize(props);
    }

    initialize(props) {
        super.initialize(props);

        this.name = props.name || "";
        this.category = props.category || "";
        this.recipients = props.recipients || [];
    }
}

export default CampaignList;
