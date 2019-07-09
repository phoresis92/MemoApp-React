import React, { Component } from 'react';
import { Authentication } from '../components';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (
            <div>
                <Authentication mode={false}></Authentication>
            </div>
        );
    }
}
 
export default Register;