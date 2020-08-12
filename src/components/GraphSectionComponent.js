import React, {Component} from 'react';
import axios from 'axios';
import { URL_NATIONAL_DAILY, URL_STATES_DAILY } from '../assets/URL';
import '../../node_modules/react-vis/dist/style.css';
import styles from '../components-styles/GraphSection.module.css';
import {FlexibleWidthXYPlot, LineMarkSeries, XAxis, YAxis, Hint} from 'react-vis';

class Graph extends Component{
    constructor(props) {
        super(props);
        this.state = {
            hoverValue: null
        };
    }
    render() {
        const data = this.props.data;
        const stroke = this.props.stroke;
        const strokeLight = this.props.strokeLight;
        return(
            <FlexibleWidthXYPlot height={300} margin={{bottom: 80, left: 80}} style={{backgroundColor: strokeLight}}>
                <XAxis 
                    tickFormat={(val) => {return this.props.data[val]['label']}} 
                    tickLabelAngle={-90} style={{marginBottom: '50px'}} 
                    tickTotal={10}
                    style={{
                        line: {stroke: stroke},
                        ticks: {stroke: stroke},
                        text: {stroke: stroke, fontWeight: 10}
                    }}/>
                <YAxis
                    tickTotal={5}
                    style={{
                        line: {stroke: stroke},
                        ticks: {stroke: stroke},
                        text: {stroke: stroke, fontWeight: 10}
                    }}/>
                <LineMarkSeries 
                    size={1.5}
                    fill='white'
                    data={data} 
                    color={stroke}
                    curve={'curveMonotoneX'} 
                    onNearestX={(value) => {
                            this.setState({ hoverValue: value })
                            this.props.changeHover(value);
                        }
                    }/>
            </FlexibleWidthXYPlot>  
        );
    }
}

class GraphSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataConfirmed: [],
            dataActive: [],
            dataRecovered: [],
            dataDeceased: [],
            hoverValueConfirmed: {},
            hoverValueActive: {},
            hoverValueRecovered: {},
            hoverValueDeceased: {}
        }
        this.handleHoverConfirmed = this.handleHoverConfirmed.bind(this);
        this.handleHoverActive = this.handleHoverActive.bind(this);
        this.handleHoverRecovered = this.handleHoverRecovered.bind(this);
        this.handleHoverDeceased = this.handleHoverDeceased.bind(this);
    }

    handleHoverConfirmed(val) {
        this.setState({hoverValueConfirmed: val});
    }

    handleHoverActive(val) {
        this.setState({hoverValueActive: val});
    }

    handleHoverRecovered(val) {
        this.setState({hoverValueRecovered: val});
    }

    handleHoverDeceased(val) {
        this.setState({hoverValueDeceased: val});
    }

    componentDidMount() {
        if(this.props.stateCode === 'INDIA') {
            axios
            .get(URL_NATIONAL_DAILY)
            .then(res => {
                return res.data["cases_time_series"];
            })
            .then(res => {
                const dataConfirmed = [];
                const dataActive = [];
                const dataRecovered = [];
                const dataDeceased = [];
                for(var i = 0; i < res.length; i++) {
                    dataConfirmed.push({x: i, y: Number(res[i]["dailyconfirmed"]), label: res[i]["date"]});
                    dataActive.push({x: i, y: Number(res[i]["dailyconfirmed"] - res[i]["dailyrecovered"] - res[i]["dailydeceased"]), label: res[i]["date"]});
                    dataRecovered.push({x: i, y: Number(res[i]["dailyrecovered"]), label: res[i]["date"]});
                    dataDeceased.push({x: i, y: Number(res[i]["dailydeceased"]), label: res[i]["date"]});
                }
                this.setState({
                    dataConfirmed: dataConfirmed,
                    dataActive: dataActive,
                    dataRecovered: dataRecovered,
                    dataDeceased: dataDeceased
                });
            });
        }else {
            axios
            .get(URL_STATES_DAILY)
            .then(res => {
                return res.data["states_daily"];
            })
            .then(res => {
                const dataConfirmed = [];
                const dataActive = [];
                const dataRecovered = [];
                const dataDeceased = [];
                for(var i = 0; i < res.length; i++) {
                    if(i % 3 == 0)
                        dataConfirmed.push({x: i/3, y: Number(res[i][this.props.stateCode.toLowerCase()]), label: res[i]["date"]});
                    if(i % 3 == 1)
                        dataRecovered.push({x: Math.floor(i/3), y: Number(res[i][this.props.stateCode.toLowerCase()]), label: res[i]["date"]});
                    if(i % 3 == 2) {
                        dataDeceased.push({x: Math.floor(i/3), y: Number(res[i][this.props.stateCode.toLowerCase()]), label: res[i]["date"]});
                        dataActive.push({x: Math.floor(i/3), y: Number(res[i-2][this.props.stateCode.toLowerCase()] - res[i-1][this.props.stateCode.toLowerCase()] - res[i][this.props.stateCode.toLowerCase()]), label: res[i]["date"]})
                    }
                }
                this.setState({
                    dataConfirmed: dataConfirmed,
                    dataActive: dataActive,
                    dataRecovered: dataRecovered,
                    dataDeceased: dataDeceased
                });
            })
        }
    }

    render() {
        return(
            <div className="container">
                <h3 className={styles.heading}>Spread Trends</h3><hr></hr>
                <div className="row">
                    <div className={`'col col-md-6 ' ${styles.outer}`}>
                        <div className={`${styles.bgFilledConfirmed}`}>
                            <h6 className={`${styles.confirmed} ${styles.textStyle}`}>Confirmed {this.state.hoverValueConfirmed.label ? this.state.hoverValueConfirmed.label : '--'} : {this.state.hoverValueConfirmed.y ? this.state.hoverValueConfirmed.y : '0'}</h6>
                            <Graph data={this.state.dataConfirmed} stroke={'#f70404'} strokeLight={'#f8dce4'} changeHover={this.handleHoverConfirmed}></Graph>
                        </div>
                    </div>
                    <div className={`'col col-md-6 ' ${styles.outer}`}>
                        <div className={`${styles.bgFilledActive}`}>
                            <h6 className={`${styles.active} ${styles.textStyle}`}>Active {this.state.hoverValueActive.label ? this.state.hoverValueActive.label : '--'} : {this.state.hoverValueActive.y ? this.state.hoverValueActive.y : '0'}</h6>
                            <Graph data={this.state.dataActive} stroke={'#4179f1'} strokeLight={'#e1e4fa'} changeHover={this.handleHoverActive}></Graph>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className={`'col col-md-6 ' ${styles.outer}`}>
                        <div className={`${styles.bgFilledRecovered}`}>
                            <h6 className={`${styles.recovered} ${styles.textStyle}`}>Recovered {this.state.hoverValueRecovered.label ? this.state.hoverValueRecovered.label : '--'} : {this.state.hoverValueRecovered.y ? this.state.hoverValueRecovered.y : '0'}</h6>
                            <Graph data={this.state.dataRecovered} stroke={'#10aa37'} strokeLight={'#d6fad6'} changeHover={this.handleHoverRecovered}></Graph>
                        </div>
                    </div>
                    <div className={`'col col-md-6 ' ${styles.outer}`}>
                        <div className={`${styles.bgFilledDeceased}`}>
                            <h6 className={`${styles.deceased} ${styles.textStyle}`}>Deceased {this.state.hoverValueDeceased.label ? this.state.hoverValueDeceased.label : '--'} : {this.state.hoverValueDeceased.y ? this.state.hoverValueDeceased.y : '0'}</h6>
                            <Graph data={this.state.dataDeceased} stroke={'#808080'} strokeLight={'#e9e7e7'} changeHover={this.handleHoverDeceased}></Graph>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default GraphSection;