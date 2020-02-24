// import libs
import { connect } from "react-redux";
import Product from "../../../models/Product";

// import components
import Page from "./Page";

const mapStateToProps = state => {
    const { data, meta } = state.administration.products;
    const productCategories = state.administration.productCategories;

    return {
        products: data.map(product => new Product(product)),
        productCategories,
        meta: Object.assign({}, meta)
    };
};

export default connect(mapStateToProps)(Page);
