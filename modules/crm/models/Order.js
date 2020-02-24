import moment from "moment";
import Model from "../../../utils/Model";
import OrderItem from "./OrderItem";

class Order extends Model {
    constructor(props) {
        super(props);

        this.initialize(props);
    }

    initialize(props) {
        super.initialize(props);

        this.items = props.items
            ? props.items.map(item => new OrderItem(item))
            : [];
        this.orderedDate =
            (props.orderedDate && moment(props.orderedDate)) || null;

        this.orderDate = (props.orderDate && moment(props.orderDate)) || null;

        this.companyId = props.companyId || "";
        this.contactId = props.contactId || "";
        this.totalPrice = parseFloat(props.totalPrice) || 0.0;
        this.subTotal = parseFloat(props.subTotal) || 0.0;
    }
}

export default Order;
