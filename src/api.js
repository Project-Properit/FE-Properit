import { handleApiErrors } from "./lib/api-errors";

const TIMEOUT = 1000;

const apiCall = async (url, method, jsonBody = {}, withToken = true) => {
	let jb = null
	if (Object.keys(jsonBody).length && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
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
	const url = `${window._env_.REACT_APP_API_URL}/assets?owner_id=` + userId;
	return apiCall(url, 'GET')
};
const fetchPayments = async (assetId, userId) => {

	const url = `${window._env_.REACT_APP_API_URL}/assets/${assetId}/group-payments?pay_from=` + userId;
	return apiCall(url, 'GET')
};

const fetchPayment = async (paymentId) => {
	const url = `${window._env_.REACT_APP_API_URL}/payments?id=` + paymentId;
	return apiCall(url, 'GET')
};
const fetchProperty = async (propertyId) => {
	const url = `${window._env_.REACT_APP_API_URL}/assets?id=` + propertyId;
	return apiCall(url, 'GET')
};
const removeProperty = async (propertyId) => {
	const url = `${window._env_.REACT_APP_API_URL}/assets/` + propertyId;
	return apiCall(url, 'DELETE')
};
const updatePropApi = async (propertyId, propertyObject) => {
	const url = `${window._env_.REACT_APP_API_URL}/assets/` + propertyId;
	return apiCall(url, 'PUT', propertyObject)
};
const createPropApi = async (propertyObject) => {
	const url = `${window._env_.REACT_APP_API_URL}/assets`;
	return apiCall(url, 'POST', propertyObject)
};

const payApi = async (payId) => {
	const url = `${window._env_.REACT_APP_API_URL}/payments/${payId}`;
	return apiCall(url, 'PATCH')
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
			}
		]), TIMEOUT)
	})
};

function loginApi(email, password) {
	const loginUrl = `${window._env_.REACT_APP_API_URL}/login`

	return fetch(loginUrl, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': 'Basic ' + btoa(email + ':' + password)
		}
	})
		.then(handleApiErrors)
		.then(response => response.json())
		.then(json => json)
		.catch((error) => {
			throw error
		})
}

const fetchGroupsPayments = async (assetId, userId) => {
	// const url = `${window._env_.REACT_APP_API_URL}/assets/` + assetId + '/groups-payments';
	const url = `${window._env_.REACT_APP_API_URL}/assets/` + assetId + '/group-payments?pay_to=' + userId;
	return apiCall(url, 'GET')
};
const fetchGroupPayments = async (assetId, groupPaymentsId) => {
	const url = `${window._env_.REACT_APP_API_URL}/assets/` + assetId + '/group-payments/' + groupPaymentsId;
	return apiCall(url, 'GET')
};

// const createGroupPaymentsApi = async (assetId, groupPaymentsObject) => {
//     const url = `${window._env_.REACT_APP_API_URL}/assets/` + assetId + '/group-payments';
//     return apiCall(url, 'POST', groupPaymentsObject)
// }
function createGroupPaymentsApi (assetId, title, description, is_public, amount, payments) {

    const url = `${window._env_.REACT_APP_API_URL}/assets/` + assetId + '/group-payments';
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-access-tokens':localStorage.getItem('token')||''
        },
        body: JSON.stringify({title, description, is_public, amount, payments}),
    })
        .then(handleApiErrors) // we'll make this in a second
        .then(response => response.json())
        .then(json => json)
        .catch((error) => {
            throw error
        })
}
const fetchUser = async (userId) => {
    const url = `${window._env_.REACT_APP_API_URL}/users/` + userId;
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
		fetchUser,
		createPropApi,
		fetchPayment,
		fetchPayments,
		payApi
	}