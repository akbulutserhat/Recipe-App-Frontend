import { userConstants } from '../constants';
//import { authHeader } from '../helpers/index';
import {session} from '../helpers/session';
//let user = JSON.parse(localStorage.getItem('user'));
let user = session.getSessionCookie();
const initialState = user ? { loggedIn: true, user } : {};

export function authentication(state = initialState, action) {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
        email: action.email
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.user
      };
    case userConstants.LOGIN_FAILURE:
      return {};
    case userConstants.LOGOUT:
      return {};
    default:
      return state
  }
}