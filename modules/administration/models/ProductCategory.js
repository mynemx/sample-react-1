import moment from "moment";
import Model from "../../../utils/Model";

class ProductCategory extends Model {
    constructor(props) {
        super(props);

        this.initialize(props);
    }

    initialize(props) {
        super.initialize(props);

        // this.salesrep = props.salesrep ? new User(props.salesrep) : null;
    }
}

export default ProductCategory;
