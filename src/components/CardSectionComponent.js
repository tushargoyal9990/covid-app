import React, {Component} from 'react';
import styles from '../components-styles/CardSection.module.css';
import {URL_NATIONAL_DAILY} from '../assets/URL';
import axios from 'axios';

class CardSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showConfirmed: false,
            showActive: false,
            showRecovered: false,
            showDeceased: false,
            confirmed: 0,
            deltaConfirmed: 0,
            active: 0,
            deltaActive: 0,
            recovered: 0,
            deltaRecovered: 0,
            deceased: 0,
            deltaDeceased: 0,
            lastUpdated: ''
        };
        this.toggleConfirmed = this.toggleConfirmed.bind(this);
        this.toggleActive = this.toggleActive.bind(this);
        this.toggleRecovered = this.toggleRecovered.bind(this);
        this.toggleDeceased = this.toggleDeceased.bind(this);
    }
    toggleConfirmed() {
        this.setState({
            showConfirmed: !this.state.showConfirmed
        });
    }
    toggleActive() {
        this.setState({
            showActive: !this.state.showActive
        });
    }
    toggleRecovered() {
        this.setState({
            showRecovered: !this.state.showRecovered
        });
    }
    toggleDeceased() {
        this.setState({
            showDeceased: !this.state.showDeceased
        });
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
                        <div className={`${styles.tile} ${styles.confirmed} `.concat(`${this.state.showConfirmed ? `${styles.bgFilledConfirmed}` : ""}`)} onMouseEnter={this.toggleConfirmed} onMouseLeave={this.toggleConfirmed}>
                            CONFIRMED 
                            <div className={styles.tileContent}>
                                <div className={styles.delta}>+{this.state.deltaConfirmed}</div>
                                {this.state.confirmed}
                            </div>
                        </div>
                    </div>
                    <div className={"col-md-3 col-sm-6 ".concat(`${styles.tileContainer}`)}>
                        <div className={`${styles.tile} ${styles.active} `.concat(`${this.state.showActive ? `${styles.bgFilledActive}` : ""}`)} onMouseEnter={this.toggleActive} onMouseLeave={this.toggleActive}>
                            ACTIVE 
                            <div className={styles.tileContent}>
                                <div className={styles.delta}>+{this.state.deltaActive}</div>
                                {this.state.active}
                            </div>
                        </div>
                    </div>
                    <div className={"col-md-3 col-sm-6 ".concat(`${styles.tileContainer}`)}>
                        <div className={`${styles.tile} ${styles.recovered} `.concat(`${this.state.showRecovered ? `${styles.bgFilledRecovered}` : ""}`)} onMouseEnter={this.toggleRecovered} onMouseLeave={this.toggleRecovered}>
                            RECOVERED 
                            <div className={styles.tileContent}>
                                <div className={styles.delta}>+{this.state.deltaRecovered}</div>
                                {this.state.recovered}
                            </div>
                        </div>
                    </div>
                    <div className={"col-md-3 col-sm-6 ".concat(`${styles.tileContainer}`)}>
                        <div className={`${styles.tile} ${styles.deceased} `.concat(`${this.state.showDeceased ? `${styles.bgFilledDeceased}` : ""}`)} onMouseEnter={this.toggleDeceased} onMouseLeave={this.toggleDeceased}>
                            DECEASED 
                            <div className={styles.tileContent}>
                                <div className={styles.delta}>+{this.state.deltaDeceased}</div>
                                {this.state.deceased}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.timeLabel}>
                    <span className={styles.labelColor}>&nbsp;<i className="fas fa-sync-alt"></i> Last Updated on {this.state.lastUpdated}&nbsp;</span>
                </div>
            </div>
        );
    }
}

export default CardSection;