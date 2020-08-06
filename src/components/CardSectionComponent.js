import React, {Component} from 'react';
import '../components-styles/CardSectionComponentStyle.css';

class CardSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showConfirmed: false,
            showActive: false,
            showRecovered: false,
            showDeceased: false
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
    render() {
        return(
            <div className="container">
                <div className="row">
                    <div className="col-md-3 col-sm-6 tile-container">
                        <div className={"tile confirmed " + `${this.state.showConfirmed ? "bg-filled-confirmed" : ""}`} onMouseEnter={this.toggleConfirmed} onMouseLeave={this.toggleConfirmed}>CONFIRMED</div>
                    </div>
                    <div className="col-md-3 col-sm-6 tile-container">
                        <div className={"tile active " + `${this.state.showActive ? "bg-filled-active" : ""}`} onMouseEnter={this.toggleActive} onMouseLeave={this.toggleActive}>ACTIVE</div>
                    </div>
                    <div className="col-md-3 col-sm-6 tile-container">
                        <div className={"tile recovered " + `${this.state.showRecovered ? "bg-filled-recovered" : ""}`} onMouseEnter={this.toggleRecovered} onMouseLeave={this.toggleRecovered}>RECOVERED</div>
                    </div>
                    <div className="col-md-3 col-sm-6 tile-container">
                        <div className={"tile deceased " + `${this.state.showDeceased ? "bg-filled-deceased" : ""}`} onMouseEnter={this.toggleDeceased} onMouseLeave={this.toggleDeceased}>DECEASED</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CardSection;