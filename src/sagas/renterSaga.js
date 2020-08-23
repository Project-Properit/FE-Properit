import { call, put, select, takeEvery } from 'redux-saga/effects';

import { loadProperty, setError } from '../actions/propertyActions';
import { RENTER } from '../constants';
import { approveInvite, fetchRenterDetails, getRenterInvites, inviteRenter } from '../api';
import {
    setExists,
    setExistsInOtherProperty, setInviteSuccess,
    setNotFound,
    setRenterDetails,
    setRenterInvites
} from "../actions/renterDetailsActions";
import { push } from "react-router-redux";
import { chooseAsset } from "../actions/propertiesActions";

export function* handleRenterDetailsLoad(action) {
    try {


        const renterDetails = yield call(fetchRenterDetails, action.mail);

        console.log('renterDetails------', renterDetails)
        yield put(setRenterDetails(renterDetails));
        if (renterDetails.length === 0)
            yield put(setNotFound());


    } catch (error) {

        yield put(setError(error.toString()));
    }
}
export function* handleRenterInvite(action) {
    try {
        const getAllRenters = (state) => state.myPropertyReducer.myProperty.tenant_list
        const allRenters = yield select(getAllRenters)
        let exist = false
        allRenters.forEach(function(renter){
            if (renter.id === action.renterId)
                exist = true
        })
        if (exist)
            yield put(setExists());
        else {
            yield call(inviteRenter, action.assetId, action.renterId);
            yield put(setInviteSuccess());
            yield put(loadProperty(action.assetId));
        }
    } catch (error) {
         yield put(setExistsInOtherProperty());
    }
}
export function* handleGetRenterInvites(action) {
    try {
        const renterInvites = yield call(getRenterInvites, action.userId);
        yield put(setRenterInvites(renterInvites));

    } catch (error) {
    }
}
export function* handleApproveInvite(action) {
    try {
        yield call(approveInvite, action.userId, action.assetId);
        localStorage.setItem('assetId', action.assetId)
        yield put(chooseAsset(action.assetId));
        yield put(push('/properties/' + action.assetId + '/payments'));

    } catch (error) {
    }
}
export function* renterLoadWatcher() {
  yield takeEvery(RENTER.LOAD_DETAILS, handleRenterDetailsLoad);
  yield takeEvery(RENTER.INVITE_RENTER, handleRenterInvite);
  yield takeEvery(RENTER.LOAD_INVITES, handleGetRenterInvites);
  yield takeEvery(RENTER.APPROVE_INVITE, handleApproveInvite);
}