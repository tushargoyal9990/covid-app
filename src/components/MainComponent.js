import React, {Component} from 'react';
import CardSection from './CardSectionComponent';
import Heading from './HeadingComponent';

class Main extends Component {
    render() {
        return(
            <>
                <Heading></Heading>
                <CardSection></CardSection>
            </>
        );
    }
};

export default Main;