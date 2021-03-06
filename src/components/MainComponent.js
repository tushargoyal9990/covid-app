import React, {Component} from 'react';
import {Switch, Route, Redirect, withRouter} from 'react-router-dom';
import {CodeToState} from '../assets/StateCodes'
import Heading from './HeadingComponent';
import CardSection from './CardSectionComponent';
import TableSection from './TableSectionComponent';
import GraphSection from './GraphSectionComponent';
import TestingSection from './TestingSectionComponent';
import IconsSection from './IconsSectionComponent';

class Main extends Component {
    render() {
        const NationalPage = () => {
            return (
                <>
                    <Heading stateCode="INDIA"></Heading>
                    <CardSection stateCode="INDIA"></CardSection>
                    <TableSection stateCode="INDIA"></TableSection>
                    <GraphSection stateCode="INDIA"></GraphSection>
                    <TestingSection stateCode="INDIA"></TestingSection>
                </>
            );
        }
        const StatePage = (props) => {
            if(!CodeToState[props.match.params.stateCode]) {
                return (
                    <Redirect to="/"></Redirect>
                );
            }
            return (
                <>
                    <Heading stateCode={props.match.params.stateCode}></Heading>
                    <CardSection stateCode={props.match.params.stateCode}></CardSection>
                    <TableSection stateCode={props.match.params.stateCode}></TableSection>
                    <GraphSection stateCode={props.match.params.stateCode}></GraphSection>
                    <TestingSection stateCode={props.match.params.stateCode}></TestingSection>
                </>
            );
        }
        return(
            <>
            <Switch>
                <Route exact path="/" component={NationalPage}></Route>
                <Route exact path="/:stateCode" component={StatePage}></Route>
                <Redirect to="/"></Redirect>
            </Switch>
            <IconsSection></IconsSection>
            </>
        );
    }
};

export default withRouter(Main);