import React, { Component } from 'react';

export default class CheckBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: this.props.checked,
            label: this.props.label
        }        
    }
    toggleCheckboxChange = () => {
        // this.setState({
        //     checked: !this.state.checked
        // })
        this.props.handleBoxChecked({label: this.state.label, checked: !this.state.checked});
    }
    render() {
        return (
            <tr><td>
                <label>
                    <input
                    type="checkbox"
                    value={this.state.label}
                    checked={this.state.checked}
                    onChange={this.toggleCheckboxChange}
                    />
            </label>
            </td><td>
            {this.state.label}
            </td></tr>
            
        )
    }
}