import { userConstants } from '../constants';

import {session} from '../helpers/session';

export function users(state = {}, action) {
  switch (action.type) {
    case userConstants.GETALL_REQUEST:
      return {
        loading: true,...state
      };
    case userConstants.GETALL_SUCCESS:
      return {
        items: action.users
      };
    case userConstants.GETALL_FAILURE:
      return { 
        error: action.error
      };
 
    default:
      return state
  }
}


export function authenticatedUser(state = {}, action) {
  switch (action.type) {
    case userConstants.GET_USER_REQUEST: 
      return {...state,loading: true};
    case userConstants.UPDATE_USER_REQUEST:
      return {...state,updating: true};
    case userConstants.GET_USER_SUCCESS: 
      return {user: action.user}
    case userConstants.GET_USER_FAILURE:
      return {};
    case userConstants.UPDATE_USER_FAILURE: 
     {
       let res = {...state};
       delete res['updating'];
       return res;
     }
    case userConstants.LOGOUT:  // if user logout authenticadtedUser data will be cleaned besides TOKEN stored in cookie.
      return {};
      default:
        return state;
  }
}