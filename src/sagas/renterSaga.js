import { call, put, select, takeEvery } from 'redux-saga/effects';

import { setError } from '../actions/propertyActions';
import { RENTER } from '../constants';
import { fetchRenterDetails, inviteRenter } from '../api';
import { setExists, setNotFound, setRenterDetails } from "../actions/renterDetailsActions";

export function* handleRenterDetailsLoad(action) {
    try {
        const getAllRenters = (state) => state.myPropertyReducer.myProperty.tenant_list
        const allRenters = yield select(getAllRenters)
        let exist = false
        allRenters.forEach(function(renter){
            if (renter.email === action.mail)
                exist = true
        })
        if (exist)
            yield put(setExists());
        else {
            const renterDetails = yield call(fetchRenterDetails, action.mail);
            console.log('renterDetails------', renterDetails)
            yield put(setRenterDetails(renterDetails));
            if (renterDetails.length === 0)
                yield put(setNotFound());
        }

    } catch (error) {
        yield put(setError(error.toString()));
    }
}
export function* handleRenterInvite(action) {
    try {
        const renterDetails = yield call(inviteRenter, action.assetId,action.renterId);
        // console.log('renterDetails------',renterDetails)
        // yield put(setRenterDetails(renterDetails));
        // if (renterDetails.length===0)
        //     yield put(setNotFound());

    } catch (error) {
        // yield put(setError(error.toString()));
    }
}
export function* renterLoadWatcher() {
  yield takeEvery(RENTER.LOAD_DETAILS, handleRenterDetailsLoad); // see details what is REQUEST param below
  yield takeEvery(RENTER.INVITE_RENTER, handleRenterInvite); // see details what is REQUEST param below
}