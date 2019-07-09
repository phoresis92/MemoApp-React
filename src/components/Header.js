import React, { Component } from 'react';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        const loginButton = (
            <li>
                <a><i className="material-icons">vpn_key</i></a>
            </li>
        )
        const logoutButton = (
            <li>
                <a><i className="material-icons">lock_open</i></a>
            </li>
        )
        return ( 
            <nav>
                <div className="nav-wrapper blue darken-1">
                    <a className="brand-logo center">Memo App</a>

                    <ul>
                        <li><a><i className="material-icons">search</i></a></li>
                    </ul>

                    <div className="right">
                        <ul>
                            { this.props.isLoggedIn ? logoutButton : loginButton }
                        </ul>
                    </div>
                </div>
            </nav>
         );
    }
}
 
export default Header;