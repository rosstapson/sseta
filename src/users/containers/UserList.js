import React, { Component } from 'react';
import UserListItem from '../components/UserListItem';
import UserContainer from './UserContainer';

import { API_ROOT} from '../../config';

export default class UserList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showUser: false
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
                })
                .catch(err => {                    
                    alert(err)
                }); 
        }
        catch(err) {
            alert(err.message);
        } 
    }
    preview = (id) => {        
        let config = {
            method: 'post',
            headers: {
              'content-type': 'application/json'
            },
            body: JSON.stringify({id: id, token: localStorage.getItem("token")})
            
        }
        try {
            return fetch(API_ROOT + "/user", config)
                .then(response =>
                    {
                        if (!response.ok) {
                            alert("Unable to retrieve User");
                            return;
                        }
                        else {                          
                          response.json().then(json => {
                              // server returns questionnaire
                            this.setState({
                                userInQuestion: json,                                
                                showList: false,
                                showUser: true
                            });
                          });                  
                        }
                    });
                
            }
            catch(err) {
                alert(err);
            }        
    }
    hideMe = () => {
        this.setState({showList: false, showUser: false})
    }
    
    render() {
        if (this.state.showList) {
            return (
                <div style={{
                    display: 'flex',
                    flex: '1',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    borderStyle: "solid",
                    borderColor: '#62DFF8', 
                    padding: '10px',
                    width: "50%",
                    }}>
                    <table><tbody>
                <tr >
                <th style={{padding: '10px'}}>Name</th>
                <th style={{padding: '10px'}}>Email</th>
                <th style={{padding: '10px'}}>Company</th><td></td>
                <th style={{padding: '10px'}}>Actions</th>
                </tr>
                {this.state.users.map(user => {
                    return <UserListItem
                        key={user.id}
                        user={user}
                        view={this.preview}
                    />
                })}
                
                <tr><td></td><td colSpan={2}>
                <button style={{
                    padding: '10px',
                    backgroundColor: '#62DFF8'}}
                    onClick={this.hideMe}
                    >Close</button>
                    </td></tr>
                    </tbody></table>
                </div>
            )
        }
        else {
            if (this.state.showUser) {
                return(
                    <UserContainer 
                        user={this.state.userInQuestion}
                        hideMe={this.hideMe}
                    />
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
}