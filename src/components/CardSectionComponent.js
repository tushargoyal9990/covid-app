import React, {Component} from 'react';
import styles from '../components-styles/CardSection.module.css';
import {URL_NATIONAL_DAILY} from '../assets/URL';
import axios from 'axios';

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
            lastUpdated: ''
        };
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
                            CONFIRMED 
                            <div className={styles.tileContent}>
                                <div className={styles.delta}>+{this.state.deltaConfirmed}</div>
                                {this.state.confirmed}
                            </div>
                        </div>
                    </div>
                    <div className={"col-md-3 col-sm-6 ".concat(`${styles.tileContainer}`)}>
                        <div className={`${styles.tile} ${styles.active}`}>
                            ACTIVE 
                            <div className={styles.tileContent}>
                                <div className={styles.delta}>+{this.state.deltaActive}</div>
                                {this.state.active}
                            </div>
                        </div>
                    </div>
                    <div className={"col-md-3 col-sm-6 ".concat(`${styles.tileContainer}`)}>
                        <div className={`${styles.tile} ${styles.recovered}`}>
                            RECOVERED 
                            <div className={styles.tileContent}>
                                <div className={styles.delta}>+{this.state.deltaRecovered}</div>
                                {this.state.recovered}
                            </div>
                        </div>
                    </div>
                    <div className={"col-md-3 col-sm-6 ".concat(`${styles.tileContainer}`)}>
                        <div className={`${styles.tile} ${styles.deceased}`}>
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