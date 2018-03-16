import React, { Component } from 'react';

import MonthWidget from './MonthWidget';

export default class Program extends Component {
    constructor(props) {
        super(props);
        let program = this.props.program;
        let grid = [];
        for (let i = 0; i < 12; i++) {
            let gridEntry = {month: i + 1, entries: []};
            program.forEach(entry => {
                // eslint-disable-next-line
                if (entry.month == gridEntry.month) {
                    console.log("found")
                    gridEntry.entries.push(entry);
                }
            });
            grid.push(gridEntry);
        }
        let questionnaires = this.props.questionnaires.filter(q => {
            return q.category === this.props.category;
        })
        this.state = {
            program: program,
            questionnaires: questionnaires,
            grid: grid,
            category: this.props.category
        }
    }
    handleAdd = (entry) => {
        entry.category = this.state.category;
        entry.type = 'Questionnaire';
        this.props.handleAdd(entry);
    }
    render() {
        return(
            <div  style={{                
                display: 'flex',
                flex: '1',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
            }}><table><tbody>
            <tr><th>Month</th><th>Questionnaires</th></tr>
                {
                    this.state.grid.map(entry => {
                        return(
                            <MonthWidget
                                handleAdd={this.handleAdd}
                                questionnaires={this.state.questionnaires}
                                key={entry.month}
                                month={entry}
                                category={this.props.category}
                            />
                        )
                    })
                }
            </tbody></table></div>
        )
    }
}