import * as types from './ActionTypes';
import axios from 'axios';

/* MEMO POST */
export function memoPostRequest(contents){
    return (dispatch)=>{
        dispatch(memoPost());

        return axios.post('/api/memo/', { contents })
        .then((response)=>{
            dispatch(memoPostSuccess());
        })
        .catch((error)=>{
            console.log(error)
            dispatch(memoPostFailure(error.response.data.code));
        })
    }
}

//------------------------------------------------------
export function memoPost(){
    return {
        type: types.MEMO_POST
    }
}

export function memoPostSuccess(){
    return {
        type: types.MEMO_POST_SUCCESS
    }
}

export function memoPostFailure(error){
    return {
        type: types.MEMO_POST_FAILURE,
        error
    }
}
//------------------------------------------------------