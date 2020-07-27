import {call, cancel, cancelled, fork, put, take} from 'redux-saga/effects'
import {push} from "react-router-redux";
// Helper for api errors
// Our login constants
import {CLIENT, LOGIN} from '../constants'
// So that we can modify our Client piece of state
import {setClient, unsetClient} from '../actions/clientActions'
import {loginApi} from "../api";

function* logout() {
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
    localStorage.removeItem('lastName')

    // redirect to the /login screen
    yield put(push('login'));


}

function* loginFlow(email, password) {
    let token
    let userId
    let isOwner
    let firstName
    let lastName
    let isTenant
    let tenantAssetId
    try {
        // try to call to our loginApi() function.  Redux Saga
        // will pause here until we either are successful or
        // receive an error
        let response = yield call(loginApi, email, password)
        token = response.token
        userId = response.user_id
        firstName = response.first_name
        lastName = response.last_name
        isOwner = response.is_owner
        isTenant = response.is_tenant
        tenantAssetId = response.tenant_asset_id === 'None' || response.tenant_asset_id === null ? null : response.tenant_asset_id
        // inform Redux to set our client token, this is non blocking so...
        yield put(setClient(token, userId, isOwner, isTenant, firstName, lastName, tenantAssetId))

        // .. also inform redux that our login was successful
        yield put({type: LOGIN.LOGIN_SUCCESS})

        // set a stringified version of our token to localstorage on our domain
        localStorage.setItem('token', (token))
        localStorage.setItem('userId', userId)
        localStorage.setItem('firstName', firstName)
        localStorage.setItem('lastName', lastName)
        localStorage.setItem('isOwner', isOwner)
        localStorage.setItem('isTenant', isTenant)
        localStorage.setItem('assetId', tenantAssetId)
        if (isOwner && isTenant) {
            yield put(push('/chooseView'));
        } else if (isOwner) {
            localStorage.setItem('chosenMode', 'owner')
            // redirect them to WIDGETS!
            yield put(push('/properties'));
        } else {
            localStorage.setItem('chosenMode', 'tenant')
            if (tenantAssetId) {
                yield put(push('/properties/' + tenantAssetId + '/payments'));
            } else {
                yield put(push('/newUser'));

            }
        }

    } catch (error) {
        // error? send it to redux
        yield put({type: LOGIN.LOGIN_ERROR, error})
    } finally {
        // No matter what, if our `forked` `task` was cancelled
        // we will then just redirect them to login
        if (yield cancelled()) {
            yield put(push('/login'));

        }
    }

    // return the token for health and wealth
    return token
}

// Our watcher (saga).  It will watch for many things.
function* loginWatcher() {

    // Generators halt execution until their next step is ready/occurring
    // So it's not like this loop is firing in the background 1000/sec
    // Instead, it says, "okay, true === true", and hits the first step...
    while (true) {
        //
        // ... and in this first it sees a yield statement with `take` which
        // pauses the loop.  It will sit here and WAIT for this action.
        //
        // yield take(ACTION) just says, when our generator sees the ACTION
        // it will pull from that ACTION's payload that we send up, its
        // email and password.  ONLY when this happens will the loop move
        // forward...
        const {email, password} = yield take(LOGIN.LOGIN_REQUESTING)

        // ... and pass the email and password to our loginFlow() function.
        // The fork() method spins up another "process" that will deal with
        // handling the loginFlow's execution in the background!
        // Think, "fork another process".
        //
        // It also passes back to us, a reference to this forked task
        // which is stored in our const task here.  We can use this to manage
        // the task.
        //
        // However, fork() does not block our loop.  It's in the background
        // therefore as soon as our loop executes this it mores forward...
        const task = yield fork(loginFlow, email, password)

        // ... and begins looking for either CLIENT_UNSET or LOGIN_ERROR!
        // That's right, it gets to here and stops and begins watching
        // for these tasks only.  Why would it watch for login any more?
        // During the life cycle of this generator, the user will login once
        // and all we need to watch for is either logging out, or a login
        // error.  The moment it does grab either of these though it will
        // once again move forward...
        const action = yield take([CLIENT.CLIENT_UNSET, LOGIN.LOGIN_ERROR])

        // ... if, for whatever reason, we decide to logout during this
        // cancel the current action.  i.e. the user is being logged
        // in, they get impatient and start hammering the logout button.
        // this would result in the above statement seeing the CLIENT_UNSET
        // action, and down here, knowing that we should cancel the
        // forked `task` that was trying to log them in.  It will do so
        // and move forward...
        if (action.type === CLIENT.CLIENT_UNSET) yield cancel(task)

        // ... finally we'll just log them out.  This will unset the client
        // access token ... -> follow this back up to the top of the while loop
        yield call(logout)
    }
}

export default loginWatcher