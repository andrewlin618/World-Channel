import React from 'react';
import LoginWindow from './LoginWindow';

import Section from '../../components/Section'

const Home = () => {
    return (
        <Section>
            <Block />
            <LoginWindow />
        </Section>
    );
}

const Block = () => {
    return (
        <div className="block"></div>
    );
}

export default Home;