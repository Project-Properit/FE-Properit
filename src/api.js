import { handleApiErrors } from "./lib/api-errors";
import axios from "axios";

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
const fetchRenterDetails = async (mail) => {
	const url = `${window._env_.REACT_APP_API_URL}/users?email=` + mail;
	return apiCall(url, 'GET')
};
const inviteRenter = async (assetId, renterId) => {
	const url = `${window._env_.REACT_APP_API_URL}/assets/${assetId}/invites`;
	return apiCall(url, 'PATCH', {'user_id':renterId})
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

const payApi = async (payId, is_periodic) => {
	const url = `${window._env_.REACT_APP_API_URL}/payments/${payId}/pay`;
    return fetch(url, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'x-access-tokens':localStorage.getItem('token')||''
        },
        body: JSON.stringify({is_periodic:is_periodic})
    })
        .then(handleApiErrors) // we'll make this in a second
        .then(response => response.json())
        .then(json => json)
        .catch((error) => {
            throw error
        })
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

function createGroupPaymentsApi (assetId, title, description, is_public, amount, payments, is_periodic, months) {
    const body = is_periodic ? JSON.stringify({title, description, is_public, amount, payments, is_periodic, months}):
        JSON.stringify({title, description, is_public, amount, payments, is_periodic})
    const url = `${window._env_.REACT_APP_API_URL}/assets/` + assetId + '/group-payments';
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-access-tokens':localStorage.getItem('token')||''
        },
        body: body
    })
        .then(handleApiErrors) // we'll make this in a second
        .then(response => response.json())
        .then(json => json)
        .catch((error) => {
            throw error
        })
}

function deleteGroupPayments(assetId, groupPaymentsId) {
    const url = `${window._env_.REACT_APP_API_URL}/assets/` + assetId + '/group-payments/' + groupPaymentsId;
    return fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'x-access-tokens':localStorage.getItem('token')||''
        }
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

const uploadFile = async (formData, propId) => {

	return axios.patch(
		`${window._env_.REACT_APP_API_URL}/assets/${propId}/documents`, formData, {
			headers: {
				'x-access-tokens': localStorage.getItem('token') || '',
				"Content-Type": "multipart/form-data"
			}
	})

}

const deleteDocument = async (documentId, propId) => axios.delete(
		`${window._env_.REACT_APP_API_URL}/assets/${propId}/documents/${documentId}`, {

		headers: {
		'x-access-tokens': localStorage.getItem('token') || ''
	}
});
	export {
		fetchProperties,
		fetchDocuments,
		deleteDocument,
		uploadFile,
		loginApi,
		fetchProperty,
		updatePropApi,
		removeProperty,
        deleteGroupPayments,
		fetchGroupsPayments,
		fetchGroupPayments,
		createGroupPaymentsApi,
		fetchUser,
		createPropApi,
		fetchPayment,
		fetchPayments,
		fetchRenterDetails,
		inviteRenter,
		payApi
	}