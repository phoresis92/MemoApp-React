import React, { Component } from 'react';
import { Link } from 'react-router';

const PropTypes = {
    mode: React.PropTypes.bool,
    onLogin: React.PropTypes.func,
    onRegister: React.PropTypes.func
};

const DefaultProps = {
    mode: true,
    onLogin: (id, pw) => console.error('login function is not defined'),
    onRegister: (id,pw) => console.error('register function is not defined')
}

class Authentication extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    handleChange(e) {
        let nextState = {};
        // console.log(e.target.name);
        // console.log(e.target.value);
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }
    handleLogin() {
        let id = this.state.username;
        let pw = this.state.password;

        this.props.onLogin(id, pw)
        .then((success)=>{
            if(!success){
                this.setState({
                    password: ''
                })
            }
        })
    }
    handleRegister(){
        let id = this.state.username;
        let pw = this.state.password;

        // console.log(id, pw)
        this.props.onRegister(id,pw)
        .then((success)=>{
            // console.log(success);
            if(!success){
                this.setState({
                    username: '',
                    password: ''
                })
            }
        })
    }
    handleKeyPress(e){
        if(e.charCode == 13){
            if(this.props.mode){
                this.handleLogin();
            }else {
                this.handleRegister();
            }
        }
    }

    render() { 
        const inputBoxes =(
            <div>
                <div className="input-field col s12 username">
                    <label>Username</label>
                    <input 
                        name="username"
                        type="text"
                        className="validate"
                        onChange={this.handleChange}
                        value={this.state.username}
                        onKeyPress={this.handleKeyPress}
                    />
                </div>
                <div className="input-field col s12">
                    <label>Password</label>
                    <input
                        name="password"
                        type="password"
                        className="validate"
                        onChange={this.handleChange}
                        value={this.state.password}
                        onKeyPress={this.handleKeyPress}
                    />
                </div>
            </div>
        );

        const loginView = (
            <div>
                <div className="card-content">
                    <div className="row">
                        {inputBoxes}
                        <a 
                            className="waves-effect waves-light btn"
                            onClick={ this.handleLogin }
                        >Submit</a>
                    </div>
                </div>
                <div className="footer">
                    <div className="card-content">
                        <div className="right">
                            New Here? <Link to="/register">Create an account</Link>
                        </div>
                    </div>
                </div>
            </div>
        );
        const registerView = (
            <div>
                <div className="card-content">
                    <div className="row">
                        {inputBoxes}
                        <a 
                            className="waves-effect waves-light btn"
                            onClick={ this.handleRegister }
                        >Create</a>
                    </div>
                </div>
            </div>
        );
        
        return (
            <div className="container auth">
                <Link className="logo" to="/">MemoApp</Link>
                <div className="card">
                    <div className="header blue white-text center">
                        <div className="card-content">{this.props.mode ? "Login" : "Register"}</div>
                    </div>
                    { this.props.mode ? loginView : registerView }
                </div>
            </div>
        );
    }
}

Authentication.propTypes = PropTypes;
Authentication.defaultProps = DefaultProps;
 
export default Authentication;