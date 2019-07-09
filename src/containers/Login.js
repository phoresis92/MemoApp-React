import React, { Component } from 'react';
import { Authentication } from '../components';
import { connect } from 'react-redux';
// import { bindActionCreatetors } from 'react-redux';
import { loginRequest } from 'actions/authentication';
import { browserHistory } from 'react-router';

class Login extends Component {
    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
    }

    handleLogin(id, pw) {
        return this.props.loginRequest(id, pw)
        .then(_=>{
            if(this.props.status === 'SUCCESS'){
                let loginData = {
                    isLoggedIn: true,
                    username: id
                };
                document.cookie = 'key=' + btoa(JSON.stringify(loginData));

                Materialize.toast('Welcome, ' + id + "!", 2000);
                browserHistory.push('/');
                return true;
            } else {
                let $toastContent = $('<span style="color: #FFB4BA">Incorrect username or password</span>');
                Materialize.toast($toastContent, 2000);
                return false;
            }
        })
    }

    render() { 
        return (
            <div>
                <Authentication 
                    mode={true}
                    onLogin={this.handleLogin}
                ></Authentication>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        status: state.authentication.login.status
    }
}

//import * as actions from '../actions/ActionTypes';

const mapDispatchToProps = (dispatch) => {
    // return bindActionCreators(actions, dispatch);
    return {
        loginRequest: (id, pw) => {
            return dispatch(loginRequest(id, pw));
        }
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(Login);