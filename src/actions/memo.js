import * as types from './ActionTypes';
import axios from 'axios';

//------------------------------------------------------
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
/*
    Parameter:
        - isInitial: whether it is for initial loading
        - listType:  OPTIONAL; loading 'old' memo or 'new' memo
        - id:        OPTIONAL; memo id (one at the bottom or one at the top)
        - username:  OPTIONAL; find memos of following user
*/

/* MEMO LIST */
export function memoListRequest(isInitial, listType, id, username){
    return dispatch => {
        dispatch(memoList());

        let url = '/api/memo';
        if(typeof username === "undefined"){
            // username not given, load public memo
            url = isInitial ? url : `${url}/${listType}/${id}`;
            console.log(url)
        }else {
            
        }

        return axios.get(url)
        .then((response)=>{
            dispatch(memoListSuccess(response.data, isInitial, listType));
        })
        .catch((error=>{
            dispatch(memoListFailure(error.response.data.code));
        }))
    }
}
//------------------------------------------------------
export function memoList(){
    return {
        type: types.MEMO_LIST
    }
}
export function memoListSuccess(data, isInitial, listType){
    return{
        type: types.MEMO_LIST_SUCCESS,
        data,
        isInitial,
        listType
    }
}
export function memoListFailure(error){
    return {
        type: types.MEMO_LIST_FAILURE,
        error
    }
}
//------------------------------------------------------