import * as types from './ActionTypes';
import axios from 'axios';

/* LOGIN */
export function loginRequest(username, password){
    return (dispatch) => {
        //inform login api is starting 
        dispatch(login());

        //api request
        return axios.post('/api/account/signin', {username, password})
        .then((response)=>{
            //success
            // console.log(response)
            dispatch(loginSuccess(username));
        })
        .catch((error)=>{
            //failed
            // console.log(error)
            dispatch(loginFailure());
        })
    }
}

//------------------------------------------------------
export function login(){
    return {
        type: types.AUTH_LOGIN
    };
}

export function loginSuccess(username){
    return {
        type: types.AUTH_LOGIN_SUCCESS,
        username
    };
}

export function loginFailure(){
    return {
        type: types.AUTH_LOGIN_FAILURE
    };
}

//------------------------------------------------------
/* REGISTER */ 
export function registerRequest(username, password){
    return (dispatch) => {
        //inform register api is startring
        dispatch(register());

        return axios.post('/api/account/signup', {username, password})
        .then((response)=>{
            // console.log(response)
            dispatch(registerSuccess())
        })
        .catch((error)=>{
            // console.log(error.response.data.code)
            dispatch(registerFailure(error.response.data.code))
        })
    }
}

//------------------------------------------------------
export function register(){
    return {
        type: types.AUTH_REGISTER
    }
}

export function registerSuccess(){
    return {
        type: types.AUTH_REGISTER_SUCCESS
    }
}

export function registerFailure(error){
    return {
        type: types.AUTH_REGISTER_FAILURE,
        error
    }
}

//------------------------------------------------------
/* GET STATUS */
export function getStatusRequest(){
    return (dispatch) => {
        dispatch(getStatus);

        return axios.get('/api/account/getInfo')
        .then((response)=>{
            dispatch(getStatusSuccess(response.data.info.username))
        })
        .catch((error)=>{
            dispatch(getStatusFailure());
        })
    }
}

//------------------------------------------------------
export function getStatus(){
    return {
        type: types.AUTH_GET_STATUS
    }
}

export function getStatusSuccess(username){
    return {
        type: types.AUTH_GET_STATUS_SUCCESS,
        username
    }
}

export function getStatusFailure(){
    return {
        type: types.AUTH_GET_STATUS_FAILURE
    }
}

//------------------------------------------------------
/* LOGOUT */
export function logoutRequest(){
    return (dispatch)=>{
        return axios.post('/api/account/logout')
        .then((response)=>{
            dispatch(logout());
        })
    }
}
//------------------------------------------------------
export function logout(){
    return {
        type: types.AUTH_LOGOUT
    }
}

//------------------------------------------------------