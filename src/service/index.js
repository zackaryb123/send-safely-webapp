import * as authService from './auth';
import * as packageService from './package';
import {calculateSignature} from "./sjcl";
import axios from "axios";
import {SEND_SAFELY} from "../constant/api";

export {
    authService,
    packageService
}

export const call = async (
    method,
    baseUrl,
    path,
    headers,
    params,
    pathIds,
    data,
    apiKey,
    apiSecret
) => {
    let url = baseUrl
    if (pathIds) {
        for (let i = 0; i  < pathIds.length; i++) {
            path = path + `${pathIds[i]}/`
        }
    }
    url = url + path;
    let timestamp = new Date().toISOString().substr(0, 19) + "+0000";
    let signature = calculateSignature(apiKey, apiSecret, path, data, timestamp);

    console.log('url : ', url);
    console.log('apiKey : ', apiKey);
    console.log('apiSecret : ', apiSecret);
    console.log('timestamp : ', timestamp);
    console.log('signature : ', signature);
    console.log('path : ', path);
    console.log('data : ', data);

    return axios(url, {
        method: method,
        headers: {
            ...SEND_SAFELY.HEADERS.BASE,
            'ss-api-key': apiKey,
            'ss-request-signature': signature,
            'ss-request-timestamp': timestamp,
            ...headers
        },
        params,
        data,
    });
}
