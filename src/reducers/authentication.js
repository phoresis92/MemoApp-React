import * as types from '../actions/ActionTypes';
import update from 'react-addons-update';

const initialstate = {
    login: {
        state: 'INIT'
    },
    state: {
        isLoggedIn: false,
        currentUser: ''
    }
}

export default function authentication (state, action){
    if(typeof state === "undefined"){
        state = {};
    }

    return state;
}