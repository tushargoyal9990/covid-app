import React, {Component} from 'react';
import {CodeToState} from '../assets/StateCodes'
import styles from '../components-styles/Heading.module.css';
import {Link} from 'react-router-dom';

class Heading extends Component {
    render() {
        return (
            <div className="container">
                <div className={styles.heading}>
                    {this.props.stateCode !== 'INDIA' ? (<Link to='/'><i className={'fas fa-arrow-circle-left '.concat(`${styles.backButton}`)}></i></Link>) : ''}<i className={"fas fa-virus fa-pulse ".concat(`${styles.covidIcon}`)}></i>    COVID-19 {(this.props.stateCode === "INDIA") ? "INDIA" : CodeToState[this.props.stateCode]}
                </div>
            </div>
        );
    }
}

export default Heading;