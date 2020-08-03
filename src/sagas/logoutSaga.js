import { put, takeEvery } from 'redux-saga/effects';
import { unsetClient } from "../actions/clientActions";
import { push } from "react-router-redux";
import { CLIENT, LOGIN } from '../constants'

function* logout(action) {
	// dispatches the CLIENT_UNSET action
	yield put(unsetClient())

	// remove our token
	localStorage.removeItem('token')
	localStorage.removeItem('userId')
	localStorage.removeItem('isTenant')
	localStorage.removeItem('assetId')
	localStorage.removeItem('isOwner')
	localStorage.removeItem('chosenMode')
	localStorage.removeItem('firstName')
	localStorage.removeItem('chosenAssetId')
	// redirect to the /login screen
	yield put(push('/login'));

}

function* ClientModeChoose(action) {

	localStorage.setItem('chosenMode', action.mode)

    let tenantAssetId = localStorage.getItem('assetId')

	if (action.mode ==='owner') {
		yield put(push('/properties'));
	} else if (action.mode ==='tenant'){
		if (tenantAssetId && tenantAssetId!=='null') {
			yield put(push('/properties/' + tenantAssetId + '/payments'));
		} else {
			yield put(push('/newUser'));
		}
	}
}
function* UnsetPartialClient(action) {

	localStorage.setItem('chosenMode',null)
	localStorage.setItem('assetId',null)
	localStorage.setItem('chosenAssetId',null)

}

function* logoutNoRedirect(action) {
	// dispatches the CLIENT_UNSET action
	yield put(unsetClient())

	// remove our token
	localStorage.removeItem('token')
	localStorage.removeItem('userId')
	localStorage.removeItem('isTenant')
	localStorage.removeItem('assetId')
	localStorage.removeItem('isOwner')
	localStorage.removeItem('chosenMode')
	localStorage.removeItem('firstName')


}

export default function* watchLogout() {
	yield takeEvery(LOGIN.LOGOUT, logout);
	yield takeEvery(LOGIN.LOGOUT_NO_REDIRECT, logoutNoRedirect);
	yield takeEvery(CLIENT.SET_MODE, ClientModeChoose);
	yield takeEvery(CLIENT.CLIENT_PARTIAL_UNSET, UnsetPartialClient);
}
