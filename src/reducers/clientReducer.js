import {CLIENT} from '../constants';
const initialSate = {
  token: localStorage.getItem('token')|| null,
  userId: localStorage.getItem('userId')|| null,
}
const clientReducer = (state = initialSate, action) => {
   switch (action.type) {
    case CLIENT.CLIENT_SET:
        console.log(action)
      return {
        userId: action.userId,
        token: action.token,
      }

    case CLIENT.CLIENT_UNSET:
      return {
        userId: null,
        token: null,
      }

    default:
      return state
  }

};

export default clientReducer;
