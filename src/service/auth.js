import axios from 'axios';
import {SEND_SAFELY} from "../constant/api";

export const authenticate = (email, password) => {
    let url = SEND_SAFELY.BASE_URL + SEND_SAFELY.PATH.GENERATE_KEY;
    return axios(url, {
        method: 'PUT',
        header: {
            ...SEND_SAFELY.HEADERS.BASE,
        },
        data: {
            email: email,
            password: password,
            keyDescription: 'SendSafely CLI Key (auto generate)'
        }
    });
}