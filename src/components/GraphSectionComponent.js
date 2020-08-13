import React, {Component} from 'react';
import axios from 'axios';
import { URL_NATIONAL_DAILY, URL_STATES_DAILY } from '../assets/URL';
import '../../node_modules/react-vis/dist/style.css';
import styles from '../components-styles/GraphSection.module.css';
import {FlexibleWidthXYPlot, LineMarkSeries, XAxis, YAxis, Crosshair} from 'react-vis';
import {Button, ButtonGroup} from 'reactstrap';
 
class Graph extends Component{
    constructor(props) {
        super(props);
        this.state = {
            hoverValue: null
        };
    }
    render() {
        const data = (this.props.selected === 0) ? this.props.data : (this.props.selected === 1) ? this.props.data.slice(this.props.data.length-90) : (this.props.selected === 2) ? this.props.data.slice(this.props.data.length-30) : this.props.data.slice(this.props.data.length-7);
        const stroke = this.props.stroke;
        const strokeLight = this.props.strokeLight;
        return(
            <FlexibleWidthXYPlot height={300} margin={{bottom: 80, left: 80}} style={{backgroundColor: strokeLight}}>
                <XAxis 
                    tickFormat={(val) => {return this.props.data[val]['label']}} 
                    tickLabelAngle={-90} style={{marginBottom: '50px'}} 
                    tickTotal={7}
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
                {(this.state.hoverValue) && (<Crosshair values={[this.state.hoverValue]}><div></div></Crosshair>)}
            </FlexibleWidthXYPlot>  
        );
    }
}

class GraphSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataConfirmed: [],
            dataConfirmedCumulative: [],
            dataActive: [],
            dataActiveCumulative: [],
            dataRecovered: [],
            dataRecoveredCumulative: [],
            dataDeceased: [],
            dataDeceasedCumulative: [],
            hoverValueConfirmed: {},
            hoverValueActive: {},
            hoverValueRecovered: {},
            hoverValueDeceased: {},
            selected: 0,
            checked: false
        }
        this.handleHoverConfirmed = this.handleHoverConfirmed.bind(this);
        this.handleHoverActive = this.handleHoverActive.bind(this);
        this.handleHoverRecovered = this.handleHoverRecovered.bind(this);
        this.handleHoverDeceased = this.handleHoverDeceased.bind(this);
        this.changeSelect = this.changeSelect.bind(this);
        this.handleToggle = this.handleToggle.bind(this);
    }

    handleToggle() {
        console.log(this.state.checked);
        this.setState({checked: !this.state.checked});
    }

    changeSelect(val) {
        this.setState({selected: val});
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
                const dataConfirmedCumulative = [];
                const dataActiveCumulative = [];
                const dataRecoveredCumulative = [];
                const dataDeceasedCumulative = [];
                for(var i = 0; i < res.length; i++) {
                    dataConfirmed.push({x: i, y: Number(res[i]["dailyconfirmed"]), label: res[i]["date"]});
                    dataActive.push({x: i, y: Number(res[i]["dailyconfirmed"] - res[i]["dailyrecovered"] - res[i]["dailydeceased"]), label: res[i]["date"]});
                    dataRecovered.push({x: i, y: Number(res[i]["dailyrecovered"]), label: res[i]["date"]});
                    dataDeceased.push({x: i, y: Number(res[i]["dailydeceased"]), label: res[i]["date"]});
                    dataConfirmedCumulative.push({x: i, y: Number(res[i]["totalconfirmed"]), label: res[i]["date"]});
                    dataActiveCumulative.push({x: i, y: Number(res[i]["totalconfirmed"] - res[i]["totalrecovered"] - res[i]["totaldeceased"]), label: res[i]["date"]});
                    dataRecoveredCumulative.push({x: i, y: Number(res[i]["totalrecovered"]), label: res[i]["date"]});
                    dataDeceasedCumulative.push({x: i, y: Number(res[i]["totaldeceased"]), label: res[i]["date"]});
                }
                this.setState({
                    dataConfirmed: dataConfirmed,
                    dataActive: dataActive,
                    dataRecovered: dataRecovered,
                    dataDeceased: dataDeceased,
                    dataConfirmedCumulative: dataConfirmedCumulative,
                    dataActiveCumulative: dataActiveCumulative,
                    dataRecoveredCumulative: dataRecoveredCumulative,
                    dataDeceasedCumulative: dataDeceasedCumulative
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
                const dataConfirmedCumulative = [];
                const dataActiveCumulative = [];
                const dataRecoveredCumulative = [];
                const dataDeceasedCumulative = [];
                var sumC = 0, sumA = 0, sumR = 0, sumD = 0;
                for(var i = 0; i < res.length; i++) {
                    if(i % 3 === 0) {
                        dataConfirmed.push({x: i/3, y: Number(res[i][this.props.stateCode.toLowerCase()]), label: res[i]["date"]});
                        sumC += Number(res[i][this.props.stateCode.toLowerCase()]);
                        dataConfirmedCumulative.push({x: i/3, y: sumC, label: res[i]["date"]});
                    }
                    if(i % 3 === 1) {
                        dataRecovered.push({x: Math.floor(i/3), y: Number(res[i][this.props.stateCode.toLowerCase()]), label: res[i]["date"]});
                        sumR += Number(res[i][this.props.stateCode.toLowerCase()]);
                        dataRecoveredCumulative.push({x: Math.floor(i/3), y: sumR, label: res[i]["date"]});
                    }
                    if(i % 3 === 2) {
                        dataDeceased.push({x: Math.floor(i/3), y: Number(res[i][this.props.stateCode.toLowerCase()]), label: res[i]["date"]});
                        sumD += Number(res[i][this.props.stateCode.toLowerCase()]);
                        dataDeceasedCumulative.push({x: Math.floor(i/3), y: sumD, label: res[i]["date"]});
                        dataActive.push({x: Math.floor(i/3), y: Number(res[i-2][this.props.stateCode.toLowerCase()] - res[i-1][this.props.stateCode.toLowerCase()] - res[i][this.props.stateCode.toLowerCase()]), label: res[i]["date"]})
                        sumA = sumC - sumR - sumD;
                        dataActiveCumulative.push({x: Math.floor(i/3), y: sumA, label: res[i]["date"]});
                    }
                }
                this.setState({
                    dataConfirmed: dataConfirmed,
                    dataActive: dataActive,
                    dataRecovered: dataRecovered,
                    dataDeceased: dataDeceased,
                    dataConfirmedCumulative: dataConfirmedCumulative,
                    dataActiveCumulative: dataActiveCumulative,
                    dataRecoveredCumulative: dataRecoveredCumulative,
                    dataDeceasedCumulative: dataDeceasedCumulative
                });
            })
        }
    }

    render() {
        return(
            <div className="container">
                <h3 className={styles.heading}>Spread Trends</h3><hr></hr>
                <div className="row">
                    <div className="col col-xs-6">
                        <ButtonGroup>
                            <Button color="dark" onClick={()=>this.changeSelect(0)} active={this.state.selected === 0}>Beginning</Button>
                            <Button color="dark" onClick={()=>this.changeSelect(1)} active={this.state.selected === 1}>3 Months</Button>
                            <Button color="dark" onClick={()=>this.changeSelect(2)} active={this.state.selected === 2}>1 Month</Button>
                            <Button color="dark" onClick={()=>this.changeSelect(3)} active={this.state.selected === 3}>1 Week</Button>
                        </ButtonGroup>
                    </div>
                    <div className="col col-xs-6">
                        <Button className={styles.right} color="dark" onClick={()=>this.handleToggle()}>{this.state.checked ? 'Cumulative' : 'Daily'}</Button>
                    </div>
                </div>
                <div className="row">
                    <div className={`'col col-md-6 ' ${styles.outer}`}>
                        <div className={`${styles.bgFilledConfirmed}`}>
                            <h6 className={`${styles.confirmed} ${styles.textStyle}`}>Confirmed {this.state.hoverValueConfirmed.label ? this.state.hoverValueConfirmed.label : '--'} : {this.state.hoverValueConfirmed.y ? this.state.hoverValueConfirmed.y : '0'}</h6>
                            <Graph data={this.state.checked ? this.state.dataConfirmedCumulative : this.state.dataConfirmed} stroke={'#f70404'} strokeLight={'#f8dce4'} changeHover={this.handleHoverConfirmed} selected={this.state.selected}></Graph>
                        </div>
                    </div>
                    <div className={`'col col-md-6 ' ${styles.outer}`}>
                        <div className={`${styles.bgFilledActive}`}>
                            <h6 className={`${styles.active} ${styles.textStyle}`}>Active {this.state.hoverValueActive.label ? this.state.hoverValueActive.label : '--'} : {this.state.hoverValueActive.y ? this.state.hoverValueActive.y : '0'}</h6>
                            <Graph data={this.state.checked ? this.state.dataActiveCumulative : this.state.dataActive} stroke={'#4179f1'} strokeLight={'#e1e4fa'} changeHover={this.handleHoverActive} selected={this.state.selected}></Graph>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className={`'col col-md-6 ' ${styles.outer}`}>
                        <div className={`${styles.bgFilledRecovered}`}>
                            <h6 className={`${styles.recovered} ${styles.textStyle}`}>Recovered {this.state.hoverValueRecovered.label ? this.state.hoverValueRecovered.label : '--'} : {this.state.hoverValueRecovered.y ? this.state.hoverValueRecovered.y : '0'}</h6>
                            <Graph data={this.state.checked ? this.state.dataRecoveredCumulative : this.state.dataRecovered} stroke={'#10aa37'} strokeLight={'#d6fad6'} changeHover={this.handleHoverRecovered} selected={this.state.selected}></Graph>
                        </div>
                    </div>
                    <div className={`'col col-md-6 ' ${styles.outer}`}>
                        <div className={`${styles.bgFilledDeceased}`}>
                            <h6 className={`${styles.deceased} ${styles.textStyle}`}>Deceased {this.state.hoverValueDeceased.label ? this.state.hoverValueDeceased.label : '--'} : {this.state.hoverValueDeceased.y ? this.state.hoverValueDeceased.y : '0'}</h6>
                            <Graph data={this.state.checked ? this.state.dataDeceasedCumulative : this.state.dataDeceased} stroke={'#808080'} strokeLight={'#e9e7e7'} changeHover={this.handleHoverDeceased} selected={this.state.selected}></Graph>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default GraphSection;