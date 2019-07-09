import React, { Component } from 'react';
import { Authentication } from '../components';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (
            <div>
                <Authentication mode={true}></Authentication>
            </div>
        );
    }
}
 
export default Login;