import { authHeader, session} from '../helpers';
import axios from 'axios';

export const userService = {
    login,
    logout,
    register,
    authenticatedUser,
    updateUser
};

function login(email, password) {
    console.log('ALP');
    const LOGIN_URI = process.env.REACT_APP_LOGIN_URI;
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    }; 
    const loginData = {
        email,password
    }; 
    return axios.post(LOGIN_URI, loginData, requestOptions)
    .then(res => {
        //localStorage.setItem('user', JSON.stringify(res.data));
        session.setSessionCookie(JSON.stringify(res.data))
        return res.data;
    });
}

function logout() {
    session.removeSessionCookie();
}


function register(user) {
    const SIGNUP_URI = process.env.REACT_APP_SIGNUP_URI;
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    };
    return axios.post(SIGNUP_URI,user, requestOptions);
}

function updateUser(user) {
    const UPDATE_URI = process.env.REACT_APP_UPDATE_USER_URI;
    const requestOptions = {
        method: 'POST',
        headers: {...authHeader(), 'Content-Type': 'application/json' },
    };
    return axios.post(UPDATE_URI,user,requestOptions).then(res => res.data);
}

function authenticatedUser() {
    const AUTHENTICATED_USER_URI = process.env.REACT_APP_AUTHENTICATED_USER_URI;
    const requestOptions = {
        method: 'GET',
        headers: {...authHeader()}
    }
    return axios.get(AUTHENTICATED_USER_URI, requestOptions).then(res => {
        return res.data;
    });
  
}