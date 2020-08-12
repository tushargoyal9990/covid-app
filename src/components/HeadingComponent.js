import React, {Component} from 'react';
import {CodeToState} from '../assets/StateCodes'
import styles from '../components-styles/Heading.module.css';

class Heading extends Component {
    render() {
        return (
            <div className={styles.heading}>
                <i className={"fas fa-virus fa-pulse ".concat(`${styles.covidIcon}`)}></i>    COVID-19 {(this.props.stateCode === "INDIA") ? "INDIA" : CodeToState[this.props.stateCode]}
            </div>
        );
    }
}

export default Heading;