import * as types from './ActionTypes';

//login
export function loginRequest(username, password){

}

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