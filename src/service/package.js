import {SEND_SAFELY} from "../constant/api";
import {call} from "./index";

export const getSentPackages = (apiKey, apiSecret, rowIndex, pageSize) => {
    return call(
        'GET',
        SEND_SAFELY.BASE_URL_DEMO,
        SEND_SAFELY.PATH.GET_PACKAGE,
        null,
        {
            pageSize,
            rowIndex
        },
        null,
        "",
        apiKey,
        apiSecret
    )
}

export const getReceivedPackages = (apiKey, apiSecret, rowIndex, pageSize) => {
    return call(
        'GET',
        SEND_SAFELY.BASE_URL_DEMO,
        SEND_SAFELY.PATH.GET_RECEIVED_PACKAGE,
        null,
        {
            rowIndex,
            pageSize
        },
        null,
        "",
        apiKey,
        apiSecret
    )
}

export const deletePackage = (apiKey, apiSecret, packageId) => {
    return call(
        'DELETE',
        SEND_SAFELY.BASE_URL_DEMO,
        SEND_SAFELY.PATH.DELETE_PACKAGE,
        null,
        null,
        [packageId],
        "",
        apiKey,
        apiSecret
    )
}