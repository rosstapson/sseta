import React, { Component } from 'react';
import UserListItem from '../components/UserListItem';
import UserContainer from './UserContainer';
import EditContainer from './EditContainer';
import array from 'lodash/array';

import { API_ROOT} from '../../config';

export default class UserList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showUser: false,
            showEdit: false,
            users: ''
        }
    }
    handleSubmit = (user) => {
        try {
            let config = {
                method: 'post',
                headers: {
                  'content-type': 'application/json'
                },
                body: JSON.stringify({user: user, token: localStorage.getItem("token")})
              }
              return fetch(API_ROOT + "/user_update", config)
                .then(response => response.json().then(json => ({json, response})))
                .then(({json, response}) => {
                  if (!response.ok) {
                    throw new Error(response.error)
                  }
                  //optimistically update state.users
                  
                  let users = this.state.users.slice();
                  let index = array.findIndex(users, (entry) => {
                      return entry.id === user.id;                      
                  });
                  users.splice(index, 1, user);
                  this.setState({users: users, showList: true, showEdit: false})
                })
                .catch(err => {                    
                    alert(err)
                }); 
        }
        catch(err) {
            alert(err.message);
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
    edit = (id) => {        
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
                                showEdit: true
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
        this.setState({showList: false, showUser: false, showEdit: false })
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
                    <tr><td colSpan={4}><h1 className="App-intro">Users</h1></td></tr>
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
                        edit={this.edit}
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
                if (this.state.showEdit) {
                    return (
                        <EditContainer
                            user={this.state.userInQuestion}
                            hideMe={this.hideMe}
                            handleSubmit={this.handleSubmit}
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
}