import Cookies from 'js-cookie';
const accessTokenName = 'token_legalens';

export const getAccessToken = () => Cookies.get(accessTokenName);

export function removeAuthCookies() {
    Cookies.remove(accessTokenName);
}

export const setAuthCookies = accessToken => {
    Cookies.set(accessTokenName, accessToken, {
        expires: 7,
        sameSite: 'none',
        secure: true,
    });
};
