export const SET_KEYS = 'SET_KEYS';
export const DELETE_KEYS = 'DELETE_KEYS';

export const setAuthKeys = (apiKey, apiSecret) => ({
    type: SET_KEYS,
    apiKey,
    apiSecret
});

export const deleteAuthKeys = () => ({
    type: SET_KEYS
});