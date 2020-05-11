import {CLIENT} from '../constants';
const initialSate = {
  id: null,
  token: localStorage.getItem('token')|| null,
}
const clientReducer = (state = initialSate, action) => {
   switch (action.type) {
    case CLIENT.CLIENT_SET:
      return {
        id: action.token.userId,
        token: action.token,
      }

    case CLIENT.CLIENT_UNSET:
      return {
        id: null,
        token: null,
      }

    default:
      return state
  }

};

export default clientReducer;
