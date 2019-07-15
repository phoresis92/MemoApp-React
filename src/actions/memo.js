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
/* MEMO EDIT */
export function memoEditRequest(id, index, contents){
    return dispatch => {
        dispatch(memoEdit());

        return axios.put('/api/memo/'+ id, {contents})
        .then((response)=>{
            dispatch(memoEditSuccess(index, response.data.memo));
        })
        .catch((error)=>{
            dispatch(memoEditFailure(error.response.data.code));
        })
    }
}
//------------------------------------------------------
export function memoEdit(){
    return {
        type: types.MEMO_EDIT
    }
}

export function memoEditSuccess(index, memo){
    return {
        type: types.MEMO_EDIT_SUCCESS,
        index,
        memo
    }
}

export function memoEditFailure(error){
    return {
        type: types.MEMO_EDIT_FAILURE,
        error
    }
}
//------------------------------------------------------
export function memoRemoveRequest(id, index){
    return dispatch => {
        dispatch(memoRemove());

        return axios.delete('/api/memo/'+ id)
        .then((response)=>{
            dispatch(memoRemoveSuccess(index));
        })
        .catch((error)=>{
            dispatch(memoRemoveFailure(error.response.data.code));
        })
    }
}
//------------------------------------------------------
export function memoRemove(){
    return {
        type: types.MEMO_REMOVE
    }
}

export function memoRemoveSuccess(index){
    return {
        type: types.MEMO_REMOVE_SUCCESS,
        index
    }
}

export function memoRemoveFailure(error){
    return {
        type: types.MEMO_REMOVE_FAILURE,
        error
    }
}
//------------------------------------------------------
export function memoStarRequest(id, index){
    return dispatch =>{
        dispatch(memoStar());

        return axios.post('/api/memo/star/'+id)
        .then((response)=>{
            dispatch(memoStarSuccess(index, response.data.memo))
        })
        .catch((error)=>{
            dispatch(memoStarFailure(error.response.data.code))
        })
    }
}
//------------------------------------------------------
export function memoStar(){
    return {
        type: types.MEMO_STAR
    }
}

export function memoStarSuccess(index, memo){
    return {
        type: types.MEMO_STAR_SUCCESS,
        index,
        memo
    }
}

export function memoStarFailure(error){
    return {
        type: types.MEMO_STAR_FAILURE,
        error
    }
}
//------------------------------------------------------