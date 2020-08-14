import React, {Component} from 'react';
import styles from '../components-styles/CardSection.module.css';
import {URL_NATIONAL_DAILY} from '../assets/URL';
import axios from 'axios';
import {population, populationShort} from '../assets/StatePopulation';
import { Tooltip } from 'reactstrap';

class CardSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            confirmed: 0,
            deltaConfirmed: 0,
            active: 0,
            deltaActive: 0,
            recovered: 0,
            deltaRecovered: 0,
            deceased: 0,
            deltaDeceased: 0,
            lastUpdated: '',
            confirmedTT: false,
            activeTT: false,
            recoveredTT: false,
            deceasedTT: false,
        };
        this.toggleConfirmedTT = this.toggleConfirmedTT.bind(this);
        this.toggleActiveTT = this.toggleActiveTT.bind(this);
        this.toggleRecoveredTT = this.toggleRecoveredTT.bind(this);
        this.toggleDeceasedTT = this.toggleDeceasedTT.bind(this);
    }

    toggleConfirmedTT() {
        this.setState({confirmedTT: !this.state.confirmedTT});
    }

    toggleActiveTT() {
        this.setState({activeTT: !this.state.activeTT});
    }

    toggleRecoveredTT() {
        this.setState({recoveredTT: !this.state.recoveredTT});
    }

    toggleDeceasedTT() {
        this.setState({deceasedTT: !this.state.deceasedTT});
    }

    componentDidMount() {
        axios
        .get(URL_NATIONAL_DAILY)
        .then(res => {
            return res.data.statewise;
        })
        .then(data => {
            for(var i = 0; i < data.length; i++) {
                if(data[i]["statecode"] === this.props.stateCode) {
                    return data[i];
                }
            }
            return data[0];
        })
        .then(data => {
            const confirmed = data["confirmed"];
            const deltaConfirmed = data["deltaconfirmed"];
            const active = data["active"];
            const recovered = data["recovered"];
            const deltaRecovered = data["deltarecovered"];
            const deceased = data["deaths"];
            const deltaDeceased = data["deltadeaths"];
            const deltaActive = deltaConfirmed - deltaRecovered - deltaDeceased;
            const lastUpdated = data["lastupdatedtime"]
            this.setState({
                confirmed: confirmed,
                deltaConfirmed: deltaConfirmed,
                active: active,
                deltaActive: deltaActive,
                recovered: recovered,
                deltaRecovered: deltaRecovered,
                deceased: deceased,
                deltaDeceased: deltaDeceased,
                lastUpdated: lastUpdated
            });
        });
    }
    render() {
        return(
            <div className="container">
                <div className="row">
                    <div className={"col-md-3 col-sm-6 ".concat(`${styles.tileContainer}`)}>
                        <div className={`${styles.tile} ${styles.confirmed}`}>
                            CONFIRMED <i id="confirmedTT" className={'fa fa-info-circle '.concat(`${styles.icon}`)} aria-hidden="true"></i>
                            <Tooltip isOpen={this.state.confirmedTT} target="confirmedTT" toggle={this.toggleConfirmedTT}>Per Million : {Math.floor((this.state.confirmed*1000000)/population[this.props.stateCode.slice(0,2)])}</Tooltip>
                            <div className={styles.tileContent}>
                                <div className={styles.delta}>+{this.state.deltaConfirmed}</div>
                                {this.state.confirmed}
                            </div>
                        </div>
                    </div>
                    <div className={"col-md-3 col-sm-6 ".concat(`${styles.tileContainer}`)}>
                        <div className={`${styles.tile} ${styles.active}`}>
                            ACTIVE <i id="activeTT" className={'fa fa-info-circle '.concat(`${styles.icon}`)} aria-hidden="true"></i>
                            <Tooltip isOpen={this.state.activeTT} target="activeTT" toggle={this.toggleActiveTT}>Per Million : {Math.floor((this.state.active*1000000)/population[this.props.stateCode.slice(0,2)])}<br></br>Active Ratio: {((this.state.active*100)/this.state.confirmed).toFixed(2)}%</Tooltip>
                            <div className={styles.tileContent}>
                                <div className={styles.delta}>+{this.state.deltaActive}</div>
                                {this.state.active}
                            </div>
                        </div>
                    </div>
                    <div className={"col-md-3 col-sm-6 ".concat(`${styles.tileContainer}`)}>
                        <div className={`${styles.tile} ${styles.recovered}`}>
                            RECOVERED <i id="recoveredTT" className={'fa fa-info-circle '.concat(`${styles.icon}`)} aria-hidden="true"></i>
                            <Tooltip isOpen={this.state.recoveredTT} target="recoveredTT" toggle={this.toggleRecoveredTT}>Per Million : {Math.floor((this.state.recovered*1000000)/population[this.props.stateCode.slice(0,2)])}<br></br>Recovery Ratio: {((this.state.recovered*100)/this.state.confirmed).toFixed(2)}%</Tooltip>
                            <div className={styles.tileContent}>
                                <div className={styles.delta}>+{this.state.deltaRecovered}</div>
                                {this.state.recovered}
                            </div>
                        </div>
                    </div>
                    <div className={"col-md-3 col-sm-6 ".concat(`${styles.tileContainer}`)}>
                        <div className={`${styles.tile} ${styles.deceased}`}>
                            DECEASED <i id="deceasedTT" className={'fa fa-info-circle '.concat(`${styles.icon}`)} aria-hidden="true"></i>
                            <Tooltip isOpen={this.state.deceasedTT} target="deceasedTT" toggle={this.toggleDeceasedTT}>Per Million : {Math.floor((this.state.deceased*1000000)/population[this.props.stateCode.slice(0,2)])}<br></br>Fatality Ratio: {((this.state.deceased*100)/this.state.confirmed).toFixed(2)}%</Tooltip>
                            <div className={styles.tileContent}>
                                <div className={styles.delta}>+{this.state.deltaDeceased}</div>
                                {this.state.deceased}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.label}>
                    <span className={styles.populationLabel}>&nbsp;Population: {populationShort[this.props.stateCode.slice(0,2)]}&nbsp;</span>
                    <span className={styles.timeLabel}>&nbsp;<i className="fas fa-sync-alt"></i> Last Updated on {this.state.lastUpdated}&nbsp;</span>
                </div>
            </div>
        );
    }
}

export default CardSection;