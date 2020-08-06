import React, {Component} from 'react';
import '../components-styles/HeadingComponentStyle.css';

class Heading extends Component {
    render() {
        return (
            <div className="heading">
                <i class="fas fa-virus fa-pulse covid-icon"></i>    COVID-19 INDIA
            </div>
        );
    }
}

export default Heading;