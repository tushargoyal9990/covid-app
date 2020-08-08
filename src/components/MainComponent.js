import React, {Component} from 'react';
import CardSection from './CardSectionComponent';
import Heading from './HeadingComponent';
import TableSection from './TableSectionComponent';

class Main extends Component {

    render() {
        return(
            <>
                <Heading></Heading>
                <CardSection></CardSection>
                <TableSection></TableSection>
            </>
        );
    }
};

export default Main;