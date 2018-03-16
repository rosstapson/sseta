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
        // fetch templates from 'program' and questionnaire list from etc
        try {
            let program = '';
            let config = {
                method: 'post',
                headers: {
                'content-type': 'application/json'
                },
                body: JSON.stringify({token: localStorage.getItem("token")})
            };
            fetch(API_ROOT + "/program", config)
                .then(response => response.json().then(json => ({json, response})))
                .then(({json, response}) => {
                    if (!response.ok) {
                    throw new Error("Unable to retrieve program information")
                    }
                    program = json;
                })
                .catch(err => {                    
                    alert(err)
                });
                // 2nd db call
                
            return fetch(API_ROOT + "/questionnaire_list", config)
                .then(response => response.json().then(json => ({json, response})))
                .then(({json, response}) => {
                    if (!response.ok) {
                    throw new Error("Unable to retrieve questionnaire list")
                    }
                    //console.log(json);
                    this.setState({
                        questionnaires: json,
                        program: program,
                        showMyTemplates: true
                    })
                })
                .catch(err => {                    
                    alert(err)
                });
        }
        catch(err) {
            alert(err)
        }
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
    handleAdd = (entry) => {
        // temp fix:
        entry.relevance = '.';
        try {
        let config = {
            method: 'post',
            headers: {
            'content-type': 'application/json'
            },
            body: JSON.stringify({entry: entry, token: localStorage.getItem("token")})
        };
        fetch(API_ROOT + "/program_add", config)
            .then(response => response.json().then(json => ({json, response})))
            .then(({json, response}) => {
                if (!response.ok) {
                throw new Error("Unable to save program information")
                }
                this.setState({program: json})
            })
            .catch(err => {                    
                alert(err)
            });
        }
        catch(err) {
            alert(err)
        }
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
                        questionnaires={this.state.questionnaires}
                        handleCancel={this.handleCancel}
                        handleAdd={this.handleAdd}
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