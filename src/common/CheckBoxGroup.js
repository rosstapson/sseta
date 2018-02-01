import React, { Component } from 'react';
import CheckBox from './CheckBox';
import array from 'lodash/array';
import cuid from 'cuid';

export default class CheckBoxGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            entries: this.props.entries, //array of json name:boolean pairs
            id: this.props.id
        }
    }
    handleBoxChecked = (entry) => {        
        //update this.state.entries, then        
        let entries = this.state.entries.slice();
        let index = array.findIndex(entries, (temp) => {
            return entry.label === temp.label;                      
        });        
        entries.splice(index, 1, entry);
        this.setState({entries: entries});
        this.props.handleBoxChecked({id: this.props.id, entries: entries})
    }
    render() {
        return (
            <table><tbody>
                {this.state.entries.map((entry) => {
                    return <CheckBox 
                        key={cuid()}
                        label={entry.label}
                        checked={entry.checked}
                        handleBoxChecked={this.handleBoxChecked}
                    />
                })}
            </tbody></table>
        )
    }
}