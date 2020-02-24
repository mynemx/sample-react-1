import moment from "moment";
import Model from "../../../utils/Model";

class Product extends Model {
    constructor(props) {
        super(props);

        this.initialize(props);
    }

    initialize(props) {
        super.initialize(props);
        this.id = props.id ? Number(props.id) : "";

        // this.salesrep = props.salesrep ? new User(props.salesrep) : null;
    }
}

export default Product;
