import React, { Component } from 'react';

import CreateTemplate from './CreateTemplate';
import MyTemplates from './MyTemplates';
import { API_ROOT } from '../../config';

export default class TemplateContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showMyTemplates: false,
            showCreateTemplate: false
        }
    }
    showMyTemplates = () => {
        // fetch templates from 'program'
        let config = {
            method: 'post',
            headers: {
              'content-type': 'application/json'
            },
            body: JSON.stringify({token: localStorage.getItem("token")})
        };
        return fetch(API_ROOT + "/program", config)
            .then(response => response.json().then(json => ({json, response})))
            .then(({json, response}) => {
                if (!response.ok) {
                throw new Error("Unable to retrieve program information")
                }
                //console.log(json);
                this.setState({
                    program: json,
                    showMyTemplates: true
                })
            })
            .catch(err => {                    
                alert(err)
            }); 
    }
    showCreateTemplate = () => {
        this.setState({ showCreateTemplate: true})
    }
    handleCancel = () => {
        this.setState({
            showMyTemplates: false,
            showCreateTemplate: false
        })
    }
    render() {
        return(
            <div style={{
                borderStyle: "solid",
                borderColor: '#62DFF8', 
                padding: '10px',
                width: "50%",
                alignSelf: "center"}}>
                {!this.state.showMyTemplates && !this.state.showCreateTemplate &&
                    <div>
                    <button style={{
                        padding: '10px',
                        backgroundColor: '#62DFF8'
                    }}
                    onClick={this.showCreateTemplate}>New template</button><button style={{
                        padding: '10px',
                        backgroundColor: '#62DFF8'
                    }}
                    onClick={this.showMyTemplates}>Program Templates</button>
                    </div>
                }
                {this.state.showMyTemplates &&
                    <MyTemplates 
                        program={this.state.program}
                        handleCancel={this.handleCancel}
                    />
                }
                {this.state.showCreateTemplate &&
                    <CreateTemplate
                        handleCancel={this.handleCancel}
                    />
                }
                </div>
        )
    }
}