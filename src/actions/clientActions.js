import { CLIENT } from '../constants'

const setClient = (token, userId, isOwner, isTenant, firstName, lastName, tenantAssetId) => ({
	type: CLIENT.CLIENT_SET,
	token,
	userId,
	isOwner,
	isTenant,
	firstName,
	lastName,
	tenantAssetId
});


const unsetClient = () => ({
	type: CLIENT.CLIENT_UNSET
});
const unsetPartialClient = () => ({
	type: CLIENT.CLIENT_PARTIAL_UNSET
});

const setMode = (mode) => ({
	type: CLIENT.SET_MODE,
	mode
})

export {
	setClient,
	unsetClient,
	unsetPartialClient,
	setMode
};
