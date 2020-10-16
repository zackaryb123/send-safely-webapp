
export const isSuccessResponse = (data) => {
    return data.response === 'SUCCESS';
}

export const isNewChange = (prev, current) => {
    return current && prev !== current;
};

export const hasAuthData = (keys) => {
    return keys && keys.apiKey && keys.apiSecret;
}

export function getUrlParameters(parameter, staticURL, decode){
    let windowLocation = (window.location.search !== "")? window.location.search : window.location.hash;
    let currLocation = (staticURL && staticURL.length)? staticURL : windowLocation;

    if(currLocation !== ""){
        let parArr = currLocation.split("?")[1].split("&");
        let returnBool = true;

        for(let i = 0; i < parArr.length; i++){
            let parr = parArr[i].split("=");
            if(parr[0] === parameter){
                return (decode) ? decodeURIComponent(parr[1]) : parr[1];
            }else{
                returnBool = false;
            }
        }

        if(!returnBool) return false;
    }else{
        return false;
    }
}

export function getHashParameters(parameter, decode){
    let windowLocation = window.location.hash;

    if(windowLocation !== ""){
        let parArr = windowLocation.split("&");
        let returnBool = true;

        for(let i = 0; i < parArr.length; i++){
            let parr = parArr[i].split("=");
            if(parr[0] === parameter){
                return (decode) ? decodeURIComponent(parr[1]) : parr[1];
            }else{
                returnBool = false;
            }
        }

        if(!returnBool) return false;
    }else{
        return false;
    }
}