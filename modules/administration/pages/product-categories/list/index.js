// import libs
import { connect } from "react-redux";

// import components
import Page from "./Page";
import ProductCategory from "../../../models/ProductCategory";

const mapStateToProps = state => {
    //   const {data, ...meta} = state.administration.productCategories
    const productCategories = state.administration.productCategories;

    return {
        productCategories: productCategories.map(
            category => new ProductCategory(category)
        ),
        category: new ProductCategory({})
    };
};

export default connect(mapStateToProps)(Page);
