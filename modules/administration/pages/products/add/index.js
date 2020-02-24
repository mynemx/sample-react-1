// import libs
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Product from "../../../models/Product";

// import components
import Page from "./Page";

const mapStateToProps = (state, router) => {
    const { params } = router.match;
    let product =
        state.administration.products.data.find(
            product => product.id === Number(params.id)
        ) || {};
    product = new Product(product);
    const productCategories = state.administration.productCategories || [];
    const currencies = state.settings.currencies || [];

    return {
        product,
        productCategories,
        currencies
    };
};

export default withRouter(connect(mapStateToProps)(Page));
