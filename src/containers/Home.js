import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Write, MemoList } from '../components';
import { memoPostRequest, memoListRequest } from '../actions/memo';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
        this.handlePost = this.handlePost.bind(this);
    }

    componentDidMount(){
        this.props.memoListRequest(true)
        .then(_=>{
            console.log(this.props.memoData)
        })
    }

    handlePost(contents){
        return this.props.memoPostRequest(contents)
        .then(_=>{
            if(this.props.postStatus.status === 'SUCCESS'){
                Materialize.toast('Success!', 2000);
            }else {
                /*
                    Error Codes
                    1: Not Logged In
                    2: Empty Contents
                */
               console.log(this.props.postStatus)
                let $toastContents;
                switch(this.props.postStatus.error){
                    case 1:
                        $toastContents = $('<span style="color: #FFB4BA">You are not logged in</span>')
                        Materialize.toast($toastContents, 2000);
                        setTimeout(_=>{location.reload(false)}, 2000);
                        break;
                    case 2:
                        $toastContents = $('<span style="color: #FFB4BA">Please write something</span>')
                        Materialize.toast($toastContents, 2000);
                        break;
                    default:
                        $toastContents = $('<span style="color: #FFB4BA">Something Broke</span>')
                        Materialize.toast($toastContents, 2000);
                        break;
               }
            }
        })
    }

    render() { 

        const write = (<Write onPost={this.handlePost}/>);

        return (
            <div className="wrapper">
                { this.props.isLoggedIn ? write : undefined }
                <MemoList data={this.props.memoData} currentUser={this.props.currentUser} />
            </div>
        );
    }
}
 
const mapStateToProps = (state)=>{
    return {
        isLoggedIn: state.authentication.status.isLoggedIn,
        postStatus: state.memo.post,
        
        currentUser: state.authentication.status.currentUser,
        memoData: state.memo.list.data
    }
}

const mapDispatchToProps = (dispatch)=>{
    return {
        memoPostRequest: (contents)=>{
            return dispatch(memoPostRequest(contents))
        },
        memoListRequest: (isInitial, listType, id, username) =>{
            return dispatch(memoListRequest(isInitial, listType, id, username));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (Home);