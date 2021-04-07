import Cookies from 'js-cookie'

export function getUser() {
    const token = Cookies.get('token');
    if (!token) {
        return {};
    }
    return parseJwt(token);
} 

export function removeToken() {
    Cookies.remove('token');
}

export function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};
