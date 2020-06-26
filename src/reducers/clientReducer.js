import {CLIENT} from '../constants';


const initialSate = {
  token: localStorage.getItem('token')|| null,
  userId: localStorage.getItem('userId')|| null,
  isTenant: getReal(localStorage.getItem('isTenant')),
  isOwner: getReal(localStorage.getItem('isOwner')),
  chosenMode: null
}

function getReal(item) {
    return (item==='true'|| item)
}
const clientReducer = (state = initialSate, action) => {
   switch (action.type) {

    case CLIENT.CLIENT_SET:

      return {
        userId: action.userId,
        token: action.token,
        isTenant: action.isTenant,
        isOwner: action.isOwner,
        chosenMode: action.chosenMode
      }

       case CLIENT.CLIENT_UNSET:
      return {
        userId: null,
        token: null,
        isTenant: null,
        isOwner: null,
        chosenMode: null
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
