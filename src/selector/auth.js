export const getAuthState = store => store.auth

export const getAuthKeys = store => getAuthState(store) ?
        {apiKey: getAuthState(store).apiKey, apiSecret: getAuthState(store).apiSecret}
        : [];