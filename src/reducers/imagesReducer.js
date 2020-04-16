import { IMAGES } from '../constants';

const imagesReducer = (state = {images:[]}, action) => {
    if (action.type === IMAGES.LOAD) {
        return {
            ...state,
            images:[]
        }
    }if (action.type === IMAGES.LOAD_SUCCESS) {
        return {
            ...state,
            images:action.images
        }
    }
    return state;
};

export default imagesReducer;
