import {session} from '../helpers/session';

export function authHeader() {
    // return authorization header with jwt token
    let user = session.getSessionCookie();
    if (user && user.token) {
        return { 'x-access-token': user.token };
    }
}