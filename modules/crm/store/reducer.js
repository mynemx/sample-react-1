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
import { array } from "prop-types";

const initialState = {
    contacts: {
        data: [],
        meta: {}
    },
    companies: {
        data: [],
        meta: {}
    },
    leads: {
        data: [],
        meta: {}
    },
    orders: {
        data: [],
        meta: {}
    }
};

const reducer = (state = initialState, { type, payload = null }) => {
    switch (type) {
        case COMPANY_ADD:
            return addCompany(state, payload);
        case COMPANY_UPDATE:
            return updateCompany(state, payload);
        case COMPANY_REMOVE:
            return removeCompany(state, payload);
        case COMPANY_LIST:
            return listCompany(state, payload);
        case CONTACT_ADD:
            return addContact(state, payload);
        case CONTACT_UPDATE:
            return updateContact(state, payload);
        case CONTACT_REMOVE:
            return removeContact(state, payload);
        case CONTACT_LIST:
            return listContact(state, payload);
        case LEAD_ADD:
            return addLead(state, payload);
        case LEAD_UPDATE:
            return updateLead(state, payload);
        case LEAD_REMOVE:
            return removeLead(state, payload);
        case LEAD_LIST:
            return listLead(state, payload);
        case ORDER_ADD:
            return addOrder(state, payload);
        case ORDER_UPDATE:
            return updateOrder(state, payload);
        case ORDER_REMOVE:
            return removeOrder(state, payload);
        case ORDER_LIST:
            return listOrder(state, payload);
        default:
            return state;
    }
};

/* Company */

function addCompany(state, payload) {
    const company = state.companies.data.find(
        company => company.id === payload.id
    );

    if (!company) {
        const data = [...state.companies.data, payload];
        const companies = Object.assign({}, state.companies, { data });
        return Object.assign({}, state, { companies });
    }

    return updateCompany(state, payload);
}

function updateCompany(state, payload) {
    const data = state.companies.data.map(obj => {
        if (obj.id === payload.id) {
            return { ...obj, ...payload };
        }
        return obj;
    });
    const companies = Object.assign({}, state.companies, { data });
    return Object.assign({}, state, { companies });
}

function removeCompany(state, id) {
    const data = state.companies.data.filter(obj => obj.id !== id);

    const companies = Object.assign({}, state.companies, { data });
    return Object.assign({}, state, { companies });
}

function listCompany(state, payload) {
    const companies = payload;
    return Object.assign({}, state, { companies });
}

/* Contacts */

function addContact(state, payload) {
    const contact = state.contacts.data.find(
        contact => contact.id === payload.id
    );

    if (!contact) {
        const data = [...state.contacts.data, payload];
        const contacts = Object.assign({}, state.contacts, { data });
        return Object.assign({}, state, { contacts });
    }

    return updateContact(state, payload);
}

function updateContact(state, payload) {
    const data = state.contacts.data.map(obj => {
        if (obj.id === payload.id) {
            return { ...obj, ...payload };
        }
        return obj;
    });

    const contacts = Object.assign({}, state.contacts, { data });
    return Object.assign({}, state, { contacts });
}

function removeContact(state, id) {
    const data = state.contacts.data.filter(obj => obj.id !== id);

    const contacts = Object.assign({}, state.contacts, { data });
    return Object.assign({}, state, { contacts });
}

function listContact(state, payload) {
    const contacts = payload;
    return Object.assign({}, state, { contacts });
}

/* Leads */

function addLead(state, payload) {
    const lead = state.leads.data.find(lead => lead.id === payload.id);

    if (!lead) {
        const data = [...state.leads.data, payload];
        const leads = Object.assign({}, state.leads, { data });
        return Object.assign({}, state, { leads });
    }

    return updateLead(state, payload);
}

function updateLead(state, payload) {
    const data = state.leads.data.map(obj => {
        if (obj.id === payload.id) {
            return { ...obj, ...payload };
        }
        return obj;
    });

    const leads = Object.assign({}, state.leads, { data });

    return Object.assign({}, state, { leads });
}

function removeLead(state, id) {
    const data = state.leads.data.filter(obj => obj.id !== id);

    const leads = Object.assign({}, state.leads, { data });

    return Object.assign({}, state, { leads });
}

function listLead(state, payload) {
    const leads = payload;
    return Object.assign({}, state, { leads });
}

/* Orders */

function addOrder(state, payload) {
    const order = state.orders.data.find(order => order.id === payload.id);

    if (!order) {
        const data = [...state.orders.data, payload];
        const orders = Object.assign({}, state.orders, { data });
        return Object.assign({}, state, { orders });
    }

    return updateOrder(state, payload);
}

function updateOrder(state, payload) {
    const data = state.orders.data.map(obj => {
        if (obj.id === payload.id) {
            return { ...obj, ...payload };
        }
        return obj;
    });

    const orders = Object.assign({}, state.orders, { data });

    return Object.assign({}, state, { orders });
}

function removeOrder(state, id) {
    const data = state.orders.data.filter(obj => obj.id !== id);

    const orders = Object.assign({}, state.orders, { data });

    return Object.assign({}, state, { orders });
}

function listOrder(state, payload) {
    const orders = payload;
    return Object.assign({}, state, { orders });
}

export default reducer;
