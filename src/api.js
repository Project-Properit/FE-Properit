import {handleApiErrors} from "./lib/api-errors";

const TIMEOUT = 1000;

const apiCall = async (url, method, jsonBody = {}, withToken = true) => {
    let jb = null
    // console.log(method)
    if (Object.keys(jsonBody).length && (method === 'POST' || method === 'PUT')) {
        jb = JSON.stringify(jsonBody)
    }
    const response = await fetch(url, {
        method: method,
        headers: {
            'x-access-tokens': localStorage.getItem('token') || ''
        },
        body: jb
    });
    const data = await response.json();
    if (response.status >= 400) {
        throw new Error(data.errors);
    }
    console.log(data);
    return data;

}
const fetchProperties = async (userId) => {
    //  return  new Promise(resolve => {
    //     setTimeout(() => resolve([
    //         {prop_id:1, tenants:["ten1", "ten2"], name: "הבית ברמת גן", address: "תלפיות 18, רמת גן",img_url:'https://properit.s3.amazonaws.com/house1.jpg'},
    //         {prop_id:2, tenants:["ten1", "ten2", "ten2"], name: "תל אביב צפון", address: "אחד העם 19, תל אביב",img_url:'https://properit.s3.amazonaws.com/house2.jpg'},
    //         {prop_id:3, tenants:["ten1", "ten2","ten1", "ten2"], name: "תל אביב מרכזי", address: "רוטשילד 68, תל אביב",img_url:'https://properit.s3.amazonaws.com/house3.jpg'},
    //         {prop_id:4, tenants:["ten1"], name: "Second Prop", address: "Address 2"},
    //     ]), TIMEOUT)
    // })
    const url = `${process.env.REACT_APP_API_URL}/api/assets?owner_id=` + userId;
    return apiCall(url, 'GET')
};
const fetchProperty = async (propertyId) => {
    const url = `${process.env.REACT_APP_API_URL}/api/assets?id=` + propertyId;
    return apiCall(url, 'GET')
};
const removeProperty = async (propertyId) => {
    const url = `${process.env.REACT_APP_API_URL}/api/assets/` + propertyId;
    return apiCall(url, 'DELETE')
};
const updatePropApi = async (propertyId, propertyObject) => {
    console.log(propertyObject)
    const url = `${process.env.REACT_APP_API_URL}/api/assets/` + propertyId;
    return apiCall(url, 'PUT', propertyObject)
};
const fetchDocuments = async (userId) => {
    return new Promise(resolve => {
        setTimeout(() => resolve([
            {
                doc_id: 1,
                digital_signatures: [{status: "signed", user: 1}, {status: "pending", user: 2}],
                name: "חוזה שכירות",
                doc_location: 'https://properit.s3.amazonaws.com/lease.pdf'
            },
            {
                doc_id: 2,
                digital_signatures: [{status: "signed", user: 1}, {status: "pending", user: 2}],
                name: "חוזה שכירות",
                doc_location: 'https://properit.s3.amazonaws.com/lease.pdf'
            },
        ]), TIMEOUT)
    })
};

function loginApi(email, password) {
    const loginUrl = `${process.env.REACT_APP_API_URL}/login`

    return fetch(loginUrl, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + btoa(email + ':' + password),
        },
    })
        .then(handleApiErrors)
        .then(response => response.json())
        .then(json => json)
        .catch((error) => {
            throw error
        })
}

const fetchGroupsPayments = async (assetId) => {
    const url = `${process.env.REACT_APP_API_URL}/api/assets/` + assetId + '/groups-payments';
    return apiCall(url, 'GET')
};
const fetchGroupPayments = async (assetId, groupPaymentsId) => {
    const url = `${process.env.REACT_APP_API_URL}/api/assets/` + assetId + '/groups-payments/' + groupPaymentsId;
    return apiCall(url, 'GET')
};

const createGroupPaymentsApi = async (assetId, groupPaymentsObject) => {
    const url = `${process.env.REACT_APP_API_URL}/api/assets/` + assetId + '/groups-payments';
    return apiCall(url, 'POST', groupPaymentsObject)
}
const fetchUser = async (userId) => {
    const url = `${process.env.REACT_APP_API_URL}/api/users/` + userId;
    return apiCall(url, 'GET')
}
export {
    fetchProperties,
    fetchDocuments,
    loginApi,
    fetchProperty,
    updatePropApi,
    removeProperty,
    fetchGroupsPayments,
    fetchGroupPayments,
    createGroupPaymentsApi,
    fetchUser
}
