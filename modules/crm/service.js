import { companyListRequest } from "./pages/companies/service";
import { contactListRequest } from "./pages/contacts/service";
import { leadListRequest } from "./pages/leads/service";
import { orderListRequest } from "./pages/orders/service";
import Http from "../../utils/Http";
import Transformer from "../../utils/Transformer";
import { authPageLoading } from "../auth/store/actions";

function transformResponse(params) {
    return Transformer.fetch(params);
}

function companyRequest({
    name = "",
    location = "",
    phone = "",
    limits = 100,
    industry = [],
    category = [],
    type = [],
    offset = 0,
    url = "crm/companies/search"
}) {
    return dispatch =>
        new Promise((resolve, reject) => {
            const categoryquery = category.reduce((qry, val) => {
                return qry + `&company_category_id[]=${val}`;
            }, "");
            const typequery = type.reduce((qry, val) => {
                return qry + `&company_type_id[]=${val}`;
            }, "");

            const industryquery = industry.reduce((qry, val) => {
                return qry + `&industry_id[]=${val}`;
            }, "");
            url =
                url +
                `?offset=${offset}&name=${name}&phone=${phone}&location=${location}${categoryquery}${typequery}${industryquery}&limits=${limits}`;

            Http.get(url)
                .then(res => {
                    return resolve(transformResponse(res.data.data.companies));
                })
                .catch(err => {
                    // TODO: handle err
                    const statusCode = err.response.status;
                    const data = {
                        error: err.response.data.error.message,
                        statusCode
                    };
                    return reject(data);
                });
        });
}

function contactRequest({
    name = "",
    phone = "",
    location = "",
    companyId = "",
    limits = 100,
    gender = [],
    category = [],
    type = [],
    offset = 0,
    url = "crm/contacts/search"
}) {
    return dispatch =>
        new Promise((resolve, reject) => {
            const categoryquery = category.reduce((qry, val) => {
                return qry + `&contact_category_id[]=${val}`;
            }, "");
            const typequery = type.reduce((qry, val) => {
                return qry + `&contact_type_id[]=${val}`;
            }, "");

            const genderquery = gender.reduce((qry, val) => {
                return qry + `&gender[]=${val}`;
            }, "");

            url =
                url +
                `?offset=${offset}&name=${name}&company_id=${companyId}&phone=${phone}&location=${location}${categoryquery}${typequery}${genderquery}&limits=${limits}`;

            Http.get(url)
                .then(res => {
                    return resolve(transformResponse(res.data.data.contacts));
                })
                .catch(err => {
                    // TODO: handle err
                    const statusCode = err.response.status;
                    const data = {
                        error: err.response.data.error.message,
                        statusCode
                    };
                    return reject(data);
                });
        });
}

function leadRequest({
    name = "",
    phone = "",
    location = "",
    limits = 100,
    gender = [],
    status = [],
    offset = 0,
    url = "crm/leads/search"
}) {
    return dispatch =>
        new Promise((resolve, reject) => {
            const statusquery = status.reduce((qry, val) => {
                return qry + `&lead_status_id[]=${val}`;
            }, "");

            const genderquery = gender.reduce((qry, val) => {
                return qry + `&gender[]=${val}`;
            }, "");

            url =
                url +
                `?offset=${offset}&name=${name}&phone=${phone}&location=${location}${statusquery}${genderquery}&limits=${limits}`;

            Http.get(url)
                .then(res => {
                    return resolve(transformResponse(res.data.data.leads));
                })
                .catch(err => {
                    // TODO: handle err
                    const statusCode = err.response.status;
                    const data = {
                        error: err.response.data.error.message,
                        statusCode
                    };
                    return reject(data);
                });
        });
}

function orderRequest({
    name = "",
    phone = "",
    location = "",
    companyId = "",
    contactId = "",
    leadId = "",
    limits = 100,
    offset = 0,
    url = "crm/orders/search"
}) {
    return dispatch =>
        new Promise((resolve, reject) => {
            url =
                url +
                `?offset=${offset}&name=${name}&company_id=${companyId}&contact_id=${contactId}&lead_id=${leadId}&phone=${phone}&location=${location}&limits=${limits}`;

            Http.get(url)
                .then(res => {
                    return resolve(transformResponse(res.data.data.orders));
                })
                .catch(err => {
                    // TODO: handle err
                    const statusCode = err.response.status;
                    const data = {
                        error: err.response.data.error.message,
                        statusCode
                    };
                    return reject(data);
                });
        });
}

export {
    companyListRequest,
    companyRequest,
    orderListRequest,
    contactListRequest,
    contactRequest,
    leadListRequest,
    leadRequest,
    orderRequest
};
