import React, { Component } from 'react';
import { Authentication } from '../components';
import { connect } from 'react-redux';
import { registerRequest } from '../actions/authentication'
import { browserHistory } from 'react-router';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
        this.handleRegister = this.handleRegister.bind(this);
    }

    handleRegister(id, pw){
        return this.props.registerRequest(id, pw)
            .then(()=>{
                if(this.props.status === 'SUCCESS') {
                    Materialize.toast('Success! Please login.', 2000);
                    browserHistory.push('/login');
                    return true;
                }else {
                    /* 
                        ERROR CODES:
                        1: BAD USERNAME
                        2: BAD PASSWORD
                        3: USERNAME EXISTS
                    */
                   let errorMessage = [
                       'Invalid Username',
                       'Password is too short',
                       'Username already exists'
                   ];

                //    console.log(this.props.error)
                   let $toastContent = $('<span style="color: #FFB4BA;">'+ errorMessage[this.props.error-1] + '</span>');
                   Materialize.toast($toastContent, 2000);
                   return false
                }
            })
            // .catch((error)=>{
            //     console.error(error);
            //     return false
            // })
    }

    render() { 
        return (
            <div>
                <Authentication 
                    mode={false}
                    onRegister={this.handleRegister}
                ></Authentication>
            </div>
        );
    }
}
 
const mapStateToProps = (state)=>{
    return{
       status: state.authentication.register.status,
       error: state.authentication.register.error
    }
}

const mapDispatchToProps = (dispatch)=>{
    return{
        registerRequest: (id, pw) => {
            return dispatch(registerRequest(id, pw));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);