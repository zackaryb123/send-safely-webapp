import {SEND_SAFELY} from "../constant/api";
import {call} from "./index";

export const getPackages = (apiKey, apiSecret, batchSize) => {
    return call(
        "GET",
        SEND_SAFELY.BASE_URL_DEMO,
        SEND_SAFELY.PATH.GET_PACKAGE,
        null,
        {pageSize: batchSize},
        null,
        "",
        apiKey,
        apiSecret
    )
}

export const deletePackage = (apiKey, apiSecret, packageId) => {
    return call(
        "DELETE",
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