import React, { Component } from 'react';

export default class CheckBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: this.props.checked
        }        
    }
    toggleCheckboxChange = () => {
        this.setState({
            checked: !this.state.checked
        })
        this.props.handleBoxChecked({label: this.props.lable, checked: this.state.checked});
    }
    render() {
        return (
            <tr><td>
                <label>
                    <input
                    type="checkbox"
                    value={this.props.label}
                    checked={this.state.checked}
                    onChange={this.toggleCheckboxChange}
                    />
            </label>
            </td><td>
            {this.props.label}
            </td></tr>
            
        )
    }
}