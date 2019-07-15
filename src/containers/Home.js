import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Write, MemoList } from '../components';
import { memoPostRequest, memoListRequest } from '../actions/memo';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loadingState: false
        }
        this.handlePost = this.handlePost.bind(this);
        this.loadNewMemo = this.loadNewMemo.bind(this);
        this.loadOldMemo = this.loadOldMemo.bind(this);
    }

    loadNewMemo(){
        //Cancel if there is a pending request
        if(this.props.listStatus === 'WAITING'){
            return new Promise((resolve, reject)=>{
                resolve();
            })
        }
        //If page is empty, Do the Initial loading
        if(this.props.memoData.length === 0){
            return this.props.memoListRequest(true); 
        }

        return this.props.memoListRequest(false, 'new', this.props.memoData[0]._id);
    }

    loadOldMemo(){
        //Cancel if user is reading the last page
        if(this.props.isLast){
            Materialize.toast('You are reading the last page', 2000);
            return new Promise((resolve, reject)=>{
                resolve();
            })
        }

        //Get id of the memo at the bottom
        let lastId = this.props.memoData[this.props.memoData.length -1]._id;

        //Start Request
        return this.props.memoListRequest(false, 'old', lastId)
        .then(_=>{
            // If it is last page, Notify
            if(this.props.isLast){
                Materialize.toast('You are reading the last page', 2000);
            }
        })
    }

    //-----------------------------------------------------------------

    componentDidMount(){
        // load new memo every 5 seconds
        const loadMemoLoop = _=>{
            this.loadNewMemo()
            .then(_=>{
                this.memoLoaderTimeoutId = setTimeout(loadMemoLoop, 5000);
            })
        }
        
        const loadUntillScrollable = _=>{
            // If scrollbar does not exists
            console.log($('body').height())
            console.log($('window').height())
            if($('body').height() < $('window').height()){
                this.loadOldMemo()
                .then(_=>{
                    // Do this recursively unless it's last page
                    if(!this.props.isLast){
                        loadUntillScrollable();
                    }
                })
            }
        }

        this.props.memoListRequest(true)
        .then(_=>{
            //console.log(this.props.memoData)
            loadMemoLoop();
        })

        $(window).scroll(_=>{
            //when height under scrollbottom is less then 250
            // console.log('==================');
            // console.log($(document).height());
            // console.log($(window).height());
            // console.log($(window).scrollTop());
            // console.log('==================');
            
            // console.log($(document).height() - $(window).height() - $(window).scrollTop());
            if($(document).height() - $(window).height() - $(window).scrollTop() < 250){
                if(!this.state.loadingState){
                    // console.log("load now")
                    this.loadOldMemo();
                    this.setState({
                        loadingState: true
                    })
                }
            }else {
                if(this.state.loadingState){
                    this.setState({
                        loadingState: false
                    })
                }
            }
        }); //scroll
    }

    componentWillUnmount(){
        //stops the loadMemoLoop
        clearTimeout(this.memoLoaderTimeoutId);
        //Remove windows scroll listener
        $(window).unbind();
    }

    //------------------------------------------------------------------
    /* POST MEMO */
    handlePost(contents){
        return this.props.memoPostRequest(contents)
        .then(_=>{
            if(this.props.postStatus.status === 'SUCCESS'){
                // Trigger load new memo
                this.loadNewMemo()
                .then(_=>{
                    Materialize.toast('Success!', 2000);
                })
            }else {
                /*
                    Error Codes
                    1: Not Logged In
                    2: Empty Contents
                */
            //    console.log(this.props.postStatus)
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
        memoData: state.memo.list.data,
        isLast: state.memo.list.isLast,

        listStatus: state.memo.list.status
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