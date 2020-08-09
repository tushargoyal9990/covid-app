import React, {Component} from 'react';
import {Table} from 'reactstrap';
import {URL_NATIONAL_DAILY, URL_DISTRICT_WISE} from '../assets/URL';
import {CodeToState, CodeToStateNormal} from '../assets/StateCodes';
import '../components-styles/TableSectionComponentStyle.css';
import axios from 'axios';

class TableSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rows: [],
            isAscConfirmed: true,
            isAscActive: true,
            isAscRecovered: true,
            isAscDeceased: true
        }
        this.getRow = this.getRow.bind(this);
        this.toggleSort = this.toggleSort.bind(this);
        this.sortRows = this.sortRows.bind(this);
    }

    getRow(data) {
        const row = [];
        const state = data["state"];
        const confirmed = data["confirmed"];
        const active = data["confirmed"] - data["recovered"] - (this.props.stateCode === 'INDIA' ? data["deaths"] : data["deceased"]);
        const recovered = data["recovered"];
        const deceased = (this.props.stateCode === 'INDIA' ? data["deaths"] : data["deceased"]);
        if(this.props.stateCode === 'INDIA')
            row.push(state);
        row.push(confirmed);
        row.push(active);
        row.push(recovered);
        row.push(deceased);
        return row;
    }

    componentDidMount() {
        if(this.props.stateCode === 'INDIA') {
            axios
            .get(URL_NATIONAL_DAILY)
            .then(res => {
                return res.data["statewise"];
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
        }else {
            axios
            .get(URL_DISTRICT_WISE)
            .then(res => {
                return res.data[CodeToStateNormal[this.props.stateCode]]["districtData"];
            })
            .then(res => {
                const rows = [];
                for (let [key, value] of Object.entries(res)) {
                    var row = this.getRow(value);
                    row = [key, ...row];
                    rows.push(row);
                }
                this.setState({rows: rows});
            })
        }
    }

    sortRows(col, isAsc) {
        const temp = this.state.rows;
        temp.sort((a, b) => {return isAsc ? a[col] - b[col] : b[col] - a[col]});
        this.setState({rows: temp});
    }

    toggleSort(str) {
        if(str === 'isAscConfirmed') {
            this.setState({isAscConfirmed : !this.state.isAscConfirmed});
            this.sortRows(1, this.state.isAscConfirmed);
        }
        else if(str === 'isAscActive') {
            this.setState({isAscActive : !this.state.isAscActive});
            this.sortRows(2, this.state.isAscActive);
        }
        else if(str === 'isAscRecovered') {
            this.setState({isAscRecovered : !this.state.isAscRecovered});
            this.sortRows(3, this.state.isAscRecovered);
        }
        else if(str === 'isAscDeceased') {
            this.setState({isAscDeceased: !this.state.isAscDeceased});
            this.sortRows(4, this.state.isAscDeceased);
        }
    }

    render() {
        const rows = this.state.rows.map((rowValue, rowIndex) => {
            const rowContent = rowValue.map((entryValue, entryIndex) => {
                const rowCell = entryValue; 
                return(
                    <td key={entryIndex}>
                        {rowCell}
                    </td>
                );
            });
            return(
                <tr key={rowIndex}>
                    {rowContent}
                </tr>
            );
        });
        return(
            <div className="container margin-top">
                <Table striped bordered hover responsive size="sm">
                    <thead>
                        <tr className="table-row">
                            <th>{this.props.stateCode === 'INDIA' ? "State/UT" : "District/Other"}</th>
                            <th className="confirmed" onClick={() => this.toggleSort('isAscConfirmed')}>
                                Confirmed <i className="fas fa-sort sort-icon"></i>
                            </th>
                            <th className="active" onClick={() => this.toggleSort('isAscActive')}>
                                Active <i className="fas fa-sort sort-icon"></i>
                            </th>
                            <th className="recovered" onClick={() => this.toggleSort('isAscRecovered')}>
                                Recovered <i className="fas fa-sort sort-icon"></i>
                            </th>
                            <th className="deceased" onClick={() => this.toggleSort('isAscDeceased')}>
                                Deceased <i className="fas fa-sort sort-icon"></i>
                            </th>
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