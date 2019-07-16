import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Write, MemoList } from '../components';
import { memoPostRequest, memoListRequest, memoEditRequest,
memoRemoveRequest, memoStarRequest } from '../actions/memo';

const PropTypes = { username: React.PropTypes.string };
const DefaultProps = { username: undefined };

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loadingState: false
        }
        this.handlePost = this.handlePost.bind(this);
        this.loadNewMemo = this.loadNewMemo.bind(this);
        this.loadOldMemo = this.loadOldMemo.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.handleStar = this.handleStar.bind(this);
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
            return this.props.memoListRequest(true, undefined, undefined, this.props.username); 
        }

        return this.props.memoListRequest(false, 'new', this.props.memoData[0]._id, this.props.username);
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
        return this.props.memoListRequest(false, 'old', lastId, this.props.username)
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
                this.memoLoaderTimeoutId = setTimeout(loadMemoLoop, 100000);
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

        this.props.memoListRequest(true, undefined, undefined, this.props.username)
        .then(_=>{
            //console.log(this.props.memoData)
            loadUntillScrollable();
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

    /* EDIT MEMO */
    handleEdit(id, index, contents){
        return this.props.memoEditRequest(id, index, contents)
        .then(_=>{
            if(this.props.editStatus.status === 'SUCCESS'){
                Materialize.toast('Success!', 2000);
            }else {
                /*
                    ERROR CODES
                        1: INVALID ID,
                        2: EMPTY CONTENTS
                        3: NOT LOGGED IN
                        4: NO RESOURCE
                        5: PERMISSION FAILURE
                */
               let errorMessage = [
                   'Something broke',
                   'Please write something',
                   'You are not logged in',
                   'That memo does not exist anymore',
                   'You do not have Permission'
               ];
               let error = this.props.editStatus.error;

               //Notify error
               let $toastContents = $('<span style="color: #FFB4BA">'+ errorMessage[error -1]+ '</span>');
               Materialize.toast($toastContents, 2000);

               //If not logged in, refresh the page after 2 seconds
               if(error === 3){
                   setTimeout(_=>{location.reload(false)}, 2000)
               }
            }
        })
    }

    /* REMOVE MEMO */
    handleRemove(id, index){
        return this.props.memoRemoveRequest(id, index)
            .then(_=>{
                if(this.props.removeStatus.status === 'SUCCESS'){
                    //LOAD MORE MEMO IF THERE IS NO SCROLLBAR
                    // 1 SECONDS LATER > ANIMATION TAKES 1SEC
                    setTimeout(()=>{
                        if($('body').height() < $(window).height()){
                            this.loadOldMemo();
                        }
                    }, 1000);
                }else {
                     /*
                    DELETE MEMO: DELETE /api/memo/:id
                    ERROR CODES
                        1: INVALID ID
                        2: NOT LOGGED IN
                        3: NO RESOURCE
                        4: PERMISSION FAILURE
                    */
                    let errorMessage = [
                        'Something broke',
                        'You are not logged in',
                        'That memo does not exist',
                        'You do not have permission'
                    ];

                    // Notify Error
                    let $toastContents = $('<span style="color: #FFB4BA">'+ errorMessage[this.props.removeStatus.error - 1]+'</span>');
                    Materialize.toast($toastContents, 2000);

                    // IF NOT LOGGED IN, REFRESH THE PAGE
                    if(this.props.removeStatus.error === 2){
                        setTimeout(_=>{ location.reload(false)}, 2000);
                    }
                }
            })

    }

    /* STARRED MEMO */
    handleStar(id, index){
        return this.props.memoStarRequest(id, index)
            .then(_=>{
                if(this.props.starStatus.status === 'SUCCESS'){
                    
                }else {
                    /*
                        TOGGLES STAR OF MEMO: POST /api/memo/star/:id
                        ERROR CODES
                            1: INVALID ID
                            2: NOT LOGGED IN
                            3: NO RESOURCE
                    */
                   let errorMessage= [
                        'Something broke',
                        'You are not logged in',
                        'That memo does not exist'
                    ];
                    
                    
                    // NOTIFY ERROR
                    let $toastContent = $('<span style="color: #FFB4BA">' + errorMessage[this.props.starStatus.error - 1] + '</span>');
                    Materialize.toast($toastContent, 2000);


                    // IF NOT LOGGED IN, REFRESH THE PAGE
                    if(this.props.starStatus.error === 2) {
                        setTimeout(()=> {location.reload(false)}, 2000);
                    }
                }      
            })
    }

    render() { 

        const write = (<Write onPost={this.handlePost}/>);

        return (
            <div className="wrapper">
                { this.props.isLoggedIn ? write : undefined }
                <MemoList 
                    data={this.props.memoData} 
                    currentUser={this.props.currentUser}
                    onEdit={this.handleEdit}
                    onRemove={this.handleRemove}
                    onStar={this.handleStar}
                />
            </div>
        );
    }
}

Home.propTypes = PropTypes;
Home.defaultProps = DefaultProps;
 
const mapStateToProps = (state)=>{
    return {
        isLoggedIn: state.authentication.status.isLoggedIn,
        postStatus: state.memo.post,
        
        currentUser: state.authentication.status.currentUser,
        memoData: state.memo.list.data,
        isLast: state.memo.list.isLast,

        listStatus: state.memo.list.status,

        editStatus: state.memo.edit,
        removeStatus: state.memo.remove,
        starStatus: state.memo.star
    }
}

const mapDispatchToProps = (dispatch)=>{
    return {
        memoPostRequest: (contents)=>{
            return dispatch(memoPostRequest(contents))
        },
        memoListRequest: (isInitial, listType, id, username) =>{
            return dispatch(memoListRequest(isInitial, listType, id, username));
        },
        memoEditRequest: (id, index, contents)=>{
            return dispatch(memoEditRequest(id, index, contents));
        },
        memoRemoveRequest: (id, index)=>{
            return dispatch(memoRemoveRequest(id, index));
        },
        memoStarRequest: (id, index)=>{
            return dispatch(memoStarRequest(id, index));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (Home);