import React, {Component} from 'react';

export default class  LoginWidget extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                username: "",
                password: ""
            }
        }
    }
    handleChange = (event) => {
        let user = {...this.state.user};        
        user[event.target.id] = event.target.value;        
        this.setState({ user });        
      }
    loginUser = () => {      
        this.props.loginUser(this.state.user);
    }
    render() {
        return (
            <div>
                <h1 className="App-intro">Sign In</h1>
                <input 
                    placeholder="Username" 
                    id="username"
                    onChange={this.handleChange}
                    />
                    <br/><br/>
                <input 
                    type="password" 
                    placeholder="Password" 
                    id="password"
                    onChange={this.handleChange}
                    />
                    <br/><br/>
                <button 
                    type="button"
                    style={{
                        padding: '10px',
                        backgroundColor: '#62DFF8'
                    }}
                    onClick={this.loginUser
                    }>Submit</button><br/><br/>
            </div>
        )
    }
}