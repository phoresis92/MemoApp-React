import * as types from './ActionTypes';
import axios from 'axios';

//login
export function loginRequest(username, password){
    return (dispatch) => {
        //inform login api is starting 
        dispatch(login());

        //api request
        return axios.post('/api/account/signin', {username, password})
        .then((response)=>{
            //success
            dispatch(loginSuccess(username));
        })
        .catch((error)=>{
            //failed
            dispatch(loginFailure());
        })
    }
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