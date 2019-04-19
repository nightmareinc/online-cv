import React, { Component } from 'react';
import PersonalityBox from '../../../components/App/Personality';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';

class Personality extends Component {
    render() {
        return (
            <PersonalityBox>
                <a style={{
                    color:'white',
                    textDecoration:'none'
                }} href='https://www.16personalities.com/profiles/fb16fc5fa3cc5' target='_blank'>
                    checkout my personality Profile <Icon icon={['fas','external-link-alt']}/>
                </a>
            </PersonalityBox>
        );
    }
}

export default Personality;