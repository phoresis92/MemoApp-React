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
    }

    handleChange(e) {
        let nextState = {};
        // console.log(e.target.name);
        // console.log(e.target.value);
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
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
                    />
                </div>
            </div>
        );

        const loginView = (
            <div>
                <div className="card-content">
                    <div className="row">
                        {inputBoxes}
                        <a className="waves-effect waves-light btn">Submit</a>
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
                        <a className="waves-effect waves-light btn">Create</a>
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