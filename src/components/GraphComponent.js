import React, {Component} from 'react';
import axios from 'axios';
import { URL_NATIONAL_DAILY } from '../assets/URL';
import '../../node_modules/react-vis/dist/style.css';
import {FlexibleWidthXYPlot, LineSeries, XAxis, YAxis, Hint} from 'react-vis';

class ConfirmedGraph extends Component{
    constructor(props) {
        super(props);
        this.state = {
            hoverValue: null
        };
    }
    render() {
        const dataConfirmed = this.props.dataConfirmed;
        return(
            <div className="container" style={{marginTop: '20px'}}>
                <FlexibleWidthXYPlot height={300} margin={{bottom: 80, left: 80}} className=" bg-filled-confirmed">
                    <XAxis 
                        tickFormat={(val) => {return this.props.dataConfirmed[val]['label']}} 
                        tickLabelAngle={-90} style={{marginBottom: '50px'}} 
                        tickTotal={10}
                        style={{
                            line: {stroke: '#f70404'},
                            ticks: {stroke: '#f70404'},
                            text: {stroke: '#f70404', fontWeight: 10}
                        }}/>
                    <YAxis
                        tickTotal={5}
                        style={{
                            line: {stroke: '#f70404'},
                            ticks: {stroke: '#f70404'},
                            text: {stroke: '#f70404', fontWeight: 10}
                        }}/>
                    <LineSeries 
                        data={dataConfirmed} 
                        color='#f70404'
                        curve={'curveMonotoneX'} 
                        onNearestX={(value) => {
                                this.setState({ hoverValue: value })
                            }
                        }/>
                    {this.state.hoverValue && (
                        <Hint value={this.state.hoverValue}>
                            <div style={{background: '#808080', color: 'white', padding: '3px', height: '50px', width: '120px', fontSize: '10px', borderRadius: '5px', textAlign: 'center'}}>
                                <div>Cases on {this.state.hoverValue.label}: {this.state.hoverValue.y}</div>
                            </div>
                        </Hint>
                    )}
                </FlexibleWidthXYPlot>  
            </div>
        );
    }
}

class Graph extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataConfirmed: [],
            dataRecovered: [],
            isDataConfirmed: false
        }
    }

    componentDidMount() {
        axios
        .get(URL_NATIONAL_DAILY)
        .then(res => {
            return res.data["cases_time_series"];
        })
        .then(res => {
            const dataConfirmed = [];
            const dataRecovered = [];
            for(var i = 0; i < res.length; i++) {
                dataConfirmed.push({x: i, y: Number(res[i]["dailyconfirmed"]), label: res[i]["date"]});
                dataRecovered.push({x: i, y: Number(res[i]["dailyrecovered"]), label: res[i]["date"]});
            }
            this.setState({
                dataConfirmed: dataConfirmed,
                dataRecovered: dataRecovered
            });
        });
    }

    render() {
        return(
            <>
            {this.state.isDataConfirmed ? <ConfirmedGraph dataConfirmed={this.state.dataConfirmed}></ConfirmedGraph> : <ConfirmedGraph dataConfirmed={this.state.dataRecovered}></ConfirmedGraph>} 
            <div style={{height: '100px', width: '100px', backgroundColor: 'red'}} onClick={()=>{this.setState({isDataConfirmed: !this.state.isDataConfirmed})}}>{this.state.isDataConfirmed}</div>
            </>
        );
    }
}

export default Graph;