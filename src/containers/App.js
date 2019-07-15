import React from 'react';
import { Header } from 'components';
import { connect } from 'react-redux';
import { getStatusRequest, logoutRequest } from '../actions/authentication'

class App extends React.Component {

    constructor(props){
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    }

    componentDidMount() {
        // get cookie by name
        function getCookie(name){
            let value = '; ' + document.cookie;
            let parts = value.split('; ' + name + '=');
            if(parts.length == 2) return parts.pop().split(';').shift();
        }

        let loginData = getCookie('key');
        if(typeof loginData === "undefined") return;
        loginData = JSON.parse(atob(loginData));

        if(!loginData.isLoggedIn) return;

        this.props.getStatusRequest()
        .then(()=>{
            // console.log(this.props.status);

            if(!this.props.status.valid){
                loginData = {
                    idLoggedIn: false,
                    username: ''
                };

                document.cookie = 'key= ' + btoa(JSON.stringify(loginData));

                let $toastContent = $('<span style="color: #FFB4BA">Your session is expired, please log in again!</span>');
                Materialize.toast($toastContent, 4000);
            }
        })
    }

    handleLogout(){
        this.props.logoutRequest()
        .then(_=>{
            Materialize.toast('Good Bye!', 2000);

            let loginData = {
                isLoggedIn: false,
                username: ''
            }

            document.cookie = 'key=' + btoa(JSON.stringify(loginData));
        })
    }

    render(){
        let re = /(login|register)/;
        let isAuth = re.test(this.props.location.pathname);

        return (
            <div>
                { isAuth ? undefined : <Header isLoggedIn={this.props.status.isLoggedIn}
                                                onLogout={this.handleLogout}/> }
                { this.props.children }
            </div>
        );

    }
}

const mapStateToProps = (state)=>{
    return {
        status: state.authentication.status
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        getStatusRequest: _=>{
            return dispatch(getStatusRequest());
        },
        logoutRequest: _=>{
            return dispatch(logoutRequest());
        }
    }
}

export default connect (mapStateToProps, mapDispatchToProps) (App);