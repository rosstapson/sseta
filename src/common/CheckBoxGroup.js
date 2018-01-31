import React, { Component } from 'react';
import CheckBox from './CheckBox';
import array from 'lodash/array';

export default class CheckBoxGroup extends Component {
    constructor(props) {
        super(props);
        console.log(this.props.entries)
        this.state = {
            entries: this.props.entries, //array of json name:boolean pairs
            id: this.props.id
        }
    }
    handleBoxChecked = (entry) => {
        //update this.state.entries, then
        let entries = this.state.entries.slice();
        let index = array.findIndex(entries, (temp) => {
            return entry.id === temp.id;                      
        });
        entries.splice(index, 1, entry);
        this.setState({entries: entries})
        this.props.handleBoxChecked({id: this.props.id, entries: this.state.entries})
    }
    render() {
        return (
            <table><tbody>
                {this.state.entries.map((entry) => {
                    return <CheckBox 
                        label={entry.label}
                        checked={entry.checked}
                        handleBoxChecked={this.handleBoxChecked}
                    />
                })}
            </tbody></table>
        )
    }
}