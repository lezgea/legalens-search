import axios from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';

import { parseCookies, setCookie } from 'nookies';

const headers = {
    "Access-Control-Allow-Origin": "*",
    'accept': 'application/json',
    'content-type': 'application/json',
};

// const baseURL = "https://legalens-api.ailab.az/";
const domain = "";


// Function that will be called to refresh authorization
async function refreshAuthLogic(failedRequest) {
    const { refreshToken, remember } = parseCookies();
    const maxAge = remember ? 60 * 60 * 24 * 30 : undefined;
    const options = { maxAge, domain, path: '/', sameSite: 'lax' };
    const baseURL = "https://legalens-api.ailab.az/";

    return axios
        .post(`${baseURL}/auth/refresh-token`, { refreshToken })
        .then(trr => {
            setCookie(null, 'token', trr.data.token, options);
            setCookie(null, 'refreshToken', trr.data.refreshToken, options);
            failedRequest.response.config.headers['SZ-Access-Token'] = trr.data.token;
            return Promise.resolve();
        });
};

createAuthRefreshInterceptor(axios, refreshAuthLogic);

/**
 * @param {String} endpoint
 * @param {{body: Object, method: 'post' | 'get' | 'put' | 'delete' | 'patch', ctx: any, skipAuthRefresh: Boolean}}
 * @param {Boolean} returnHeaders
 * @returns {Promise<any>}
 */


async function client(
    baseURL,
    endpoint,
    { body } = {},
    returnHeaders = false
) {
    // const { token } = parseCookies(ctx);
    // if (token) {
    //     headers['SZ-Access-Token'] = token;
    // }

    const config = {
        baseURL: baseURL,
        url: endpoint,
        data: body,
        // ...customConfig,
        headers: {
            ...headers,
            // ...customConfig.headers,
        },
    };

    return axios
        .request(config)
        .then(response =>
            returnHeaders
                ? { data: response?.data === 'not found' ? [] : response.data, headers: response.headers }
                : response?.data === 'not found' ? [] : response.data
        )
        .catch(err => console.log('ERROR', err));
}

export default client;

