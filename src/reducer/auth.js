import {
    DELETE_KEYS,
    SET_KEYS
} from "../action/auth";

const initialState = {
    apiKey: null,
    apiSecret: null
};

export default function reducer(state = initialState, action) {
    if (action.type === SET_KEYS) {
        return {
            ...state,
            apiKey: action.apiKey,
            apiSecret: action.apiSecret
        }
    } else if (action === DELETE_KEYS) {
        return {
            ...state,
            apiKey: null,
            apiSecret: null
        }
    }
    return state;
}