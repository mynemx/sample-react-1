import {
    USER_ADD,
    USER_UPDATE,
    USER_REMOVE,
    USER_LIST,
    PRODUCT_ADD,
    PRODUCT_UPDATE,
    PRODUCT_REMOVE,
    PRODUCT_LIST,
    CATEGORY_ADD,
    CATEGORY_UPDATE,
    CATEGORY_REMOVE,
    CATEGORY_LIST
} from "./action-types";
import { array } from "prop-types";

const initialState = {
    users: [],
    productCategories: [],
    products: {
        data: [],
        meta: {}
    }
};

const reducer = (state = initialState, { type, payload = null }) => {
    switch (type) {
        case USER_ADD:
            return addUser(state, payload);
        case USER_UPDATE:
            return updateUser(state, payload);
        case USER_REMOVE:
            return removeUser(state, payload);
        case USER_LIST:
            return listUser(state, payload);
        case CATEGORY_ADD:
            return addCategory(state, payload);
        case CATEGORY_UPDATE:
            return updateCategory(state, payload);
        case CATEGORY_REMOVE:
            return removeCategory(state, payload);
        case CATEGORY_LIST:
            return listCategory(state, payload);
        case PRODUCT_ADD:
            return addProduct(state, payload);
        case PRODUCT_UPDATE:
            return updateProduct(state, payload);
        case PRODUCT_REMOVE:
            return removeProduct(state, payload);
        case PRODUCT_LIST:
            return listProduct(state, payload);
        default:
            return state;
    }
};

/* Users */
function addUser(state, payload) {
    const user = state.users.find(user => user.id === payload.id);

    if (!user) {
        const users = [...state.users, payload];

        return Object.assign({}, state, { users });
    }

    return updateUser(state, payload);
}

function updateUser(state, payload) {
    const users = state.users.map(obj => {
        if (obj.id === payload.id) {
            return { ...obj, ...payload };
        }
        return obj;
    });

    return Object.assign({}, state, { users });
}

function removeUser(state, id) {
    const users = state.users.filter(obj => obj.id !== id);

    return Object.assign({}, state, { users });
}

function listUser(state, payload) {
    const users = payload.map(obj => {
        return obj;
    });
    return Object.assign({}, state, { users });
}

/* Products */

function addProduct(state, payload) {
    const product = state.products.data.find(
        product => product.id === payload.id
    );

    if (!product) {
        const data = [...state.products.data, payload];
        const products = Object.assign({}, state.products, { data });
        return Object.assign({}, state, { products });
    }

    return updateProduct(state, payload);
}

function updateProduct(state, payload) {
    const data = state.products.data.map(obj => {
        if (obj.id === payload.id) {
            return { ...obj, ...payload };
        }
        return obj;
    });

    const products = Object.assign({}, state.products, { data });

    return Object.assign({}, state, { products });
}

function removeProduct(state, id) {
    const data = state.products.data.filter(obj => obj.id !== id);

    const products = Object.assign({}, state.products, { data });

    return Object.assign({}, state, { products });
}

function listProduct(state, payload) {
    const products = payload;

    return Object.assign({}, state, { products });
}

/* Categories */
function addCategory(state, payload) {
    const category = state.productCategories.find(
        category => category.id === payload.id
    );

    if (!category) {
        const productCategories = [...state.productCategories, payload];

        return Object.assign({}, state, { productCategories });
    }

    return updateCategory(state, payload);
}

function updateCategory(state, payload) {
    const productCategories = state.productCategories.map(obj => {
        if (obj.id === payload.id) {
            return { ...obj, ...payload };
        }
        return obj;
    });

    return Object.assign({}, state, { productCategories });
}

function removeCategory(state, id) {
    const productCategories = state.productCategories.filter(
        obj => obj.id !== id
    );

    return Object.assign({}, state, { productCategories });
}

function listCategory(state, payload) {
    const productCategories = payload.map(obj => {
        return obj;
    });
    return Object.assign({}, state, { productCategories });
}

export default reducer;
