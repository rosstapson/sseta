import React, { Component } from 'react';

import MonthWidget from '../components/MonthWidget';

export default class CreateTemplate extends Component {
    constructor(props) {
        super(props);
        let template = [];
        for (let i = 0; i < 10; i++) {
            template.push({month: i})
        }
        this.state={
            template: template
        }
    }
    handleChange = (event) => {
        console.log(event);
    }
    render() {
        return(
            <div><h1 className="App-intro">Create Template</h1>
            <div>
                <table><tbody>
                    {this.state.template.map((entry) => {
                        return(
                        <tr key={entry.month}><td>
                            <MonthWidget 
                                month={entry}
                                onChange={this.handleChange}
                            />
                        </td></tr>)
                    })

                    }
                    <tr><td>
                    <button style={{
                        padding: '10px',
                        backgroundColor: '#62DFF8'
                    }}
                    onClick={this.props.handleCancel}>Cancel</button>                    
                    </td></tr>
                </tbody></table>
                </div>
            </div>
            
        )
    }
}