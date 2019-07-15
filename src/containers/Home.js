import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Write, MemoList } from '../components';
import { memoPostRequest } from '../actions/memo';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
        this.handlePost = this.handlePost.bind(this);
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

        let mockData = [
            {
                "_id": "578b958ec1da760909c263f4",
                "writer": "velopert",
                "contents": "Testing",
                "__v": 0,
                "is_edited": false,
                "date": {
                    "edited": "2016-07-17T14:26:22.428Z",
                    "created": "2016-07-17T14:26:22.428Z"
                },
                "starred": []
            },
            {
                "_id": "578b957ec1da760909c263f3",
                "writer": "velopert",
                "contents": "Data",
                "__v": 0,
                "is_edited": false,
                "date": {
                    "edited": "2016-07-17T14:26:06.999Z",
                    "created": "2016-07-17T14:26:06.999Z"
                },
                "starred": []
            },
            {
                "_id": "578b957cc1da760909c263f2",
                "writer": "velopert",
                "contents": "Mock",
                "__v": 0,
                "is_edited": false,
                "date": {
                    "edited": "2016-07-17T14:26:04.195Z",
                    "created": "2016-07-17T14:26:04.195Z"
                },
                "starred": []
            },
            {
                "_id": "578b9579c1da760909c263f1",
                "writer": "velopert",
                "contents": "Some",
                "__v": 0,
                "is_edited": false,
                "date": {
                    "edited": "2016-07-17T14:26:01.062Z",
                    "created": "2016-07-17T14:26:01.062Z"
                },
                "starred": []
            },
            {
                "_id": "578b9576c1da760909c263f0",
                "writer": "velopert",
                "contents": "Create",
                "__v": 0,
                "is_edited": false,
                "date": {
                    "edited": "2016-07-17T14:25:58.619Z",
                    "created": "2016-07-17T14:25:58.619Z"
                },
                "starred": []
            },
            {
                "_id": "578b8c82c1da760909c263ef",
                "writer": "velopert",
                "contents": "blablablal",
                "__v": 0,
                "is_edited": false,
                "date": {
                    "edited": "2016-07-17T13:47:46.611Z",
                    "created": "2016-07-17T13:47:46.611Z"
                },
                "starred": []
            }
        ]
        return (
            <div className="wrapper">
                { this.props.isLoggedIn ? write : undefined }
                <MemoList data={mockData} currentUser="v"/>
            </div>
        );
    }
}
 
const mapStateToProps = (state)=>{
    return {
        isLoggedIn: state.authentication.status.isLoggedIn,
        postStatus: state.memo.post
    }
}

const mapDispatchToProps = (dispatch)=>{
    return {
        memoPostRequest: (contents)=>{
            return dispatch(memoPostRequest(contents))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (Home);