import {USER} from '../constants'

const setUser = userObject => ({
    type: USER.LOAD_SUCCESS,
    userObject
});

const loadUser = (userId) => ({
    type: USER.LOAD,
    userId
});

const clearUsers = () => ({
    type: USER.CLEAR
})

const setError = error => ({
    type: USER.LOAD_FAIL,
    error,
});

const updateSettingsRequest = function updateSettingsRequest (all) {
    const { userId, email, phone, first_name, last_name, payment_details} = all
    return {
        type: USER.UPDATE_REQUESTING,
        userId,
        email,
        phone,
        first_name,
        last_name,
        payment_details
    }
}

export {
    setUser,
    loadUser,
    setError,
    clearUsers,
    updateSettingsRequest
};
