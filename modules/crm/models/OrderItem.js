import moment from "moment";
import Model from "../../../utils/Model";

class OrderItem extends Model {
    constructor(props) {
        super(props);

        this.initialize(props);
    }

    initialize(props) {
        super.initialize(props);

        // this.salesrep = props.salesrep ? new User(props.salesrep) : null;
        this.quantity = parseInt(props.quantity) || 1;
        this.uprice = parseFloat(props.uprice) || 0.0;
        this.price = parseFloat(props.price) || this.quantity * this.uprice;
    }
}

export default OrderItem;
