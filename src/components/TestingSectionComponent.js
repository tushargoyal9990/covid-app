import React, {Component} from 'react';
import styles from '../components-styles/TestingSection.module.css';
import axios from 'axios';
import {URL_NATIONAL_DAILY, URL_STATE_TEST} from '../assets/URL';
import {population} from '../assets/StatePopulation'
import { CodeToStateNormal } from '../assets/StateCodes';

class TestingSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tested: 0,
            confirmed: 0,
        }
    }
    componentDidMount() {
        //to fetch testing data
        if(this.props.stateCode === 'INDIA') {
            axios
            .get(URL_NATIONAL_DAILY)
            .then(res => {
                return res.data["tested"];
            })
            .then(res => {
                this.setState({tested: res[res.length-1]["totalsamplestested"]});
            })
        }else {
            axios
            .get(URL_STATE_TEST)
            .then(res => {
                return res.data["states_tested_data"];
            })
            .then(res => {
                const stateCode = CodeToStateNormal[this.props.stateCode];
                var tested = 0;
                for(var i = 0; i < res.length; i++) {
                    if(res[i]["state"] === stateCode) {
                        tested = res[i]["totaltested"];
                    }
                }
                this.setState({tested: tested});
            })
        }

        //to fetch confirmed cases
        axios
        .get(URL_NATIONAL_DAILY)
        .then(res => {
            return res.data["statewise"];
        })
        .then(res => {
            if(this.props.stateCode === 'INDIA') {
                this.setState({confirmed: res[0]["confirmed"]});
            }else {
                for(var i = 0; i < res.length; i++) {
                    if(res[i]["statecode"] === this.props.stateCode) {
                        this.setState({confirmed: res[i]["confirmed"]});
                        break;
                    }
                }
            }
        });
    }
    render() {
        const deno = this.props.stateCode === 'INDIA' ? population["IN"] : population[this.props.stateCode];
        return(
            <div className='container'>
                <h3 className={styles.heading}>Testing Info.</h3><hr></hr>
                <div className="row">
                    <div className='col-md-4 col-sm-12'>
                        <div className={styles.tile}>
                            TESTED
                            <div className={styles.content}>{this.state.tested}</div>
                        </div>
                    </div>
                    <div className='col-md-4 col-sm-12'>
                        <div className={styles.tile}>
                            TESTED PER MILLION
                            <div className={styles.content}>{Math.floor((this.state.tested*1000000)/deno)}</div>
                        </div>
                    </div>
                    <div className='col-md-4 col-sm-12'>
                        <div className={styles.tile}>
                            POSITIVITY RATIO
                            <div className={styles.content}>{((this.state.confirmed*100)/this.state.tested).toFixed(2)}%</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default TestingSection;