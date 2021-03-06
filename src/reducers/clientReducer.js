import {CLIENT} from '../constants';


const initialSate = {
    token: localStorage.getItem('token') || null,
    userId: localStorage.getItem('userId') || null,
    isTenant: getReal(localStorage.getItem('isTenant')),
    isOwner: getReal(localStorage.getItem('isOwner')),
    firstName: localStorage.getItem('firstName') || null,
    lastName: localStorage.getItem('lastName') || null,
    chosenMode: localStorage.getItem('chosenMode') || null,
    tenantAssetId: localStorage.getItem('assetId') || null,
    chosenAssetId: localStorage.getItem('chosenAssetId') === 'null' ? null : localStorage.getItem('chosenAssetId')
}

function getReal(item) {
    if (item === 'true')
        return true
    if (item === 'false')
        return false
    return item
}

const clientReducer = (state = initialSate, action) => {
    switch (action.type) {

        case CLIENT.CLIENT_SET:
            return {
                userId: action.userId,
                firstName: action.firstName,
                lastName: action.lastName,
                token: action.token,
                isTenant: action.isTenant,
                isOwner: action.isOwner,
                chosenMode: action.chosenMode,
                tenantAssetId: action.tenantAssetId,
                chosenAssetId: localStorage.getItem('chosenAssetId') === 'null' ? null : localStorage.getItem('chosenAssetId')
            }
        case CLIENT.CLIENT_UPDATE:
            return {
                ...state,
                firstName: action.firstName,
                lastName: action.lastName
            }
        case CLIENT.CLIENT_UNSET:
            return {
                userId: null,
                firstName: null,
                lastName: null,
                token: null,
                isTenant: null,
                isOwner: null,
                chosenMode: null,
                tenantAssetId: null,
                chosenAssetId: null
            }
        case CLIENT.CLIENT_PARTIAL_UNSET:
            return {
                ...state,
                chosenMode: null,
                tenantAssetId: null
            }

        case CLIENT.SET_MODE:
            return {
                ...state,
                chosenMode: action.mode
            }

        default:
            return state
    }

};

export default clientReducer;
