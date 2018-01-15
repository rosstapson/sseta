import React, { Component } from 'react';
import { API_ROOT } from '../../config'; 

import LoginWidget from '../components/LoginWidget';
export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showLogin: true,
            showSuccess: false,
            showError: false
        }
    }
    
    seeAllUsers = () => {           
        let config = {
            method: 'get',
            headers: {
                'content-type': 'application/json'                  
            }
        }
        try {
        return fetch(API_ROOT + "/users", config)
            .then(response =>
                { 
                    console.log(response)
                });                    
        }
        catch(err) {
            alert(err);
        }
    }
    render() {
        return (
            <LoginWidget loginUser={this.props.handleLogin} seeAllUsers={this.seeAllUsers}/>
        )
    }
}