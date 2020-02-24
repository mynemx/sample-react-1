import {
    COMPANY_ADD,
    COMPANY_UPDATE,
    COMPANY_REMOVE,
    COMPANY_LIST,
    CONTACT_ADD,
    CONTACT_UPDATE,
    CONTACT_REMOVE,
    CONTACT_LIST,
    LEAD_ADD,
    LEAD_UPDATE,
    LEAD_REMOVE,
    LEAD_LIST,
    ORDER_ADD,
    ORDER_UPDATE,
    ORDER_REMOVE,
    ORDER_LIST
} from "./action-types";

/* Company */
export function addCompany(payload) {
    return {
        type: COMPANY_ADD,
        payload
    };
}

export function updateCompany(payload) {
    return {
        type: COMPANY_UPDATE,
        payload
    };
}

export function removeCompany(payload) {
    return {
        type: COMPANY_REMOVE,
        payload
    };
}

export function listCompany(payload) {
    return {
        type: COMPANY_LIST,
        payload
    };
}

/* Contact */
export function addContact(payload) {
    return {
        type: CONTACT_ADD,
        payload
    };
}

export function updateContact(payload) {
    return {
        type: CONTACT_UPDATE,
        payload
    };
}

export function removeContact(payload) {
    return {
        type: CONTACT_REMOVE,
        payload
    };
}

export function listContact(payload) {
    return {
        type: CONTACT_LIST,
        payload
    };
}

/* Lead */
export function addLead(payload) {
    return {
        type: LEAD_ADD,
        payload
    };
}

export function updateLead(payload) {
    return {
        type: LEAD_UPDATE,
        payload
    };
}

export function removeLead(payload) {
    return {
        type: LEAD_REMOVE,
        payload
    };
}

export function listLead(payload) {
    return {
        type: LEAD_LIST,
        payload
    };
}

/* Order */
export function addOrder(payload) {
    return {
        type: ORDER_ADD,
        payload
    };
}

export function updateOrder(payload) {
    return {
        type: ORDER_UPDATE,
        payload
    };
}

export function removeOrder(payload) {
    return {
        type: ORDER_REMOVE,
        payload
    };
}

export function listOrder(payload) {
    return {
        type: ORDER_LIST,
        payload
    };
}
