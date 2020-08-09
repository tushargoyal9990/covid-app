import React, {Component} from 'react';
import {Table, Form} from 'reactstrap';
import {URL_NATIONAL_DAILY} from '../assets/URL';
import {CodeToState} from '../assets/StateCodes';
import axios from 'axios';

class TableSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rows: []
        }
        this.getRow = this.getRow.bind(this);
    }

    getRow(data) {
        const row = [];
        const state = data["state"];
        const confirmed = data["confirmed"];
        const active = data["confirmed"] - data["recovered"] - data["deaths"];
        const recovered = data["recovered"];
        const deceased = data["deaths"];
        row.push(state);
        row.push(confirmed);
        row.push(active);
        row.push(recovered);
        row.push(deceased);
        return row;
    }

    componentDidMount() {
        axios
        .get(URL_NATIONAL_DAILY)
        .then(res => {
            return res.data.statewise;
        })
        .then(res => {
            const rows = [];
            for(var i = 0; i < res.length; i++) {
                if(CodeToState[res[i]["statecode"]]) {
                    rows.push(this.getRow(res[i]));
                }
            }
            this.setState({rows: rows});
        });
    }

    render() {
        const rows = this.state.rows.map((row) => {
            const i = 0;
            const rowContent = row.map((entry) => {
                const rowCell = entry; 
                return(
                    <td>
                        {rowCell}
                    </td>
                );
            });
            return(
                <tr>
                    {rowContent}
                </tr>
            );
        });
        return(
            <div className="container">
                <Table striped bordered hover responsive size="sm">
                    <thead>
                        <tr>
                            <th>State/UT</th>
                            <th>Confirmed</th>
                            <th>Active</th>
                            <th>Recovered</th>
                            <th>Deceased</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default TableSection;