import React, { Component } from 'react';

import AddWidget from './AddWidget';

export default class MonthWidget extends Component {
    constructor(props) {
        super(props);
        let month = this.props.month;
        let questionnaires = this.props.questionnaires;
        month.entries.forEach(entry => {
            questionnaires.forEach(q => {
                if (entry.id === q.id) {
                    entry.name = q.name;
                }
            })
        })
        this.state = {
            questionnaires: this.props.questionnaires,
            showAdd: false,
            month: this.props.month
        }
    }
    showAdd = () => {
        if (!this.state.questionnaires || this.state.questionnaires.length === 0) {
            alert("There are no questionnaires available in this category")
            return;
        }
        this.setState({
            showAdd: true
        })
    }
    handleAdd = (questionnaireId) => {         
        let entry = {
            month: this.state.month.month,
            id: questionnaireId
        }
        this.props.handleAdd(entry);
    }
    hideAdd = () => {
        this.setState({ showAdd: false })
    }
    handleDelete = (event) => {
        alert("Delete: " + event.target.id)
    }
    render() {
        if (this.state.showAdd) {
            return(
                <tr><td>
                    <AddWidget
                        category={this.props.category}
                        handleCancel={this.hideAdd}
                        handleAdd={this.handleAdd}
                        questionnaires={this.state.questionnaires}
                    />
                 </td></tr>
            )
        }
        else {
            return(
                <tr><td style={{padding: '10px'}}> {this.props.month.month} </td>
                <td>
                {this.state.month.entries.length > 0 &&
                    <div style={{                
                        display: 'flex',
                        flex: '1',
                        flexDirection: 'column',
                        alignItems: 'flexStart',
                        fontSize: '13px'
                    }}>  
                        <table><tbody>
                        {this.state.month.entries.map(entry => {
                            return <tr 
                            key={entry.id}                            
                            ><td>{entry.name}</td><td><button id={entry.id} onClick={this.handleDelete}>Delete</button></td></tr>
                        })}
                        </tbody></table>
                    </div>
                }
                </td>
                <td style={{padding: '10px'}}>
                    <button onClick={this.showAdd}>Add an event</button>
                </td>
                </tr>
            )
        }
    }
}