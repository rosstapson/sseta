import React, { Component } from 'react';

import { API_ROOT} from '../../config';

export default class UserList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arb: false
        }
    }
    showList = () => {        
        try {
            let config = {
                method: 'post',
                headers: {
                  'content-type': 'application/json'
                },
                body: JSON.stringify({email: localStorage.getItem("username"), token: localStorage.getItem("token")})
              }
              return fetch(API_ROOT + "/user_list", config)
                .then(response => response.json().then(json => ({json, response})))
                .then(({json, response}) => {
                  if (!response.ok) {
                    throw new Error("zomg")
                  }
                  this.setState({users: json, showList: true})
                });
            
                      
        }
        catch(err) {
            alert(err.message);
        } 
    }
    render() {
        if (this.state.showList) {
            return (
                <div style={{
                    borderStyle: "solid",
                    borderColor: '#62DFF8', 
                    padding: '10px',
                    width: "50%",
                    alignSelf: "center"}}>
                    <h2>User List</h2>
                </div>
            )
        }
        else {
            return(
                <div style={{
                    borderStyle: "solid",
                    borderColor: '#62DFF8', 
                    padding: '10px',
                    width: "50%",
                    alignSelf: "center"}}><button style={{
                    padding: '10px',
                    backgroundColor: '#62DFF8'
                }}
                onClick={this.showList}>Show Users</button></div>
            )
        }
    }
}