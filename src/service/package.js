import {SEND_SAFELY} from "../constant/api";
import {call} from "./index";

export const getPackages = (apiKey, apiSecret) => {
    return call(
        "GET",
        SEND_SAFELY.BASE_URL_DEMO,
        SEND_SAFELY.PATH.PACKAGE,
        null,
        null,
        null,
        apiKey,
        apiSecret
    )
}