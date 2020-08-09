import React, {Component} from 'react';
import {CodeToState} from '../assets/StateCodes'
import '../components-styles/HeadingComponentStyle.css';

class Heading extends Component {
    render() {
        return (
            <div className="heading">
                <i className="fas fa-virus fa-pulse covid-icon"></i>    COVID-19 {(this.props.stateCode === "INDIA") ? "INDIA" : CodeToState[this.props.stateCode]}
            </div>
        );
    }
}

export default Heading;