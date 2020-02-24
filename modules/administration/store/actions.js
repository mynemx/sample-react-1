/* ============
 * Actions for the USER module
 * ============
 *
 * The actions that are available on the
 * USER module.
 */

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

/** Users */
export function addUser(payload) {
    return {
        type: USER_ADD,
        payload
    };
}

export function updateUser(payload) {
    return {
        type: USER_UPDATE,
        payload
    };
}

export function removeUser(payload) {
    return {
        type: USER_REMOVE,
        payload
    };
}

export function listUser(payload) {
    return {
        type: USER_LIST,
        payload
    };
}

/** Categories */
export function addCategory(payload) {
    return {
        type: CATEGORY_ADD,
        payload
    };
}

export function updateCategory(payload) {
    return {
        type: CATEGORY_UPDATE,
        payload
    };
}

export function removeCategory(payload) {
    return {
        type: CATEGORY_REMOVE,
        payload
    };
}

export function listCategory(payload) {
    return {
        type: CATEGORY_LIST,
        payload
    };
}

/** Product */
export function addProduct(payload) {
    return {
        type: PRODUCT_ADD,
        payload
    };
}

export function updateProduct(payload) {
    return {
        type: PRODUCT_UPDATE,
        payload
    };
}

export function removeProduct(payload) {
    return {
        type: PRODUCT_REMOVE,
        payload
    };
}

export function listProduct(payload) {
    return {
        type: PRODUCT_LIST,
        payload
    };
}
