export const SEND_SAFELY = {
    BASE_URL: 'https://app.sendsafely.com',
    BASE_URL_DEMO: 'https://demo.sendsafely.com/api/v2.0',
    HEADERS: {
        BASE: {
            // 'Connection': 'keep-alive',
            // 'Content-Length': '115',
            'Content-Type': 'application/json',
            // 'Accept-Encoding': 'gzip, deflate, br',
            // 'Accept-Language': 'en-US,en;q=0.9',
            // 'Accept': '*/*',
            // 'Origin': null,
            // 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36'
        },
    },
    PATH: {
        PACKAGE: '/package/',
        GENERATE_KEY: '/auth-api/generate-key/'
    }
}