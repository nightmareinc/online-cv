import React, { Component } from 'react';
import PersonalityBox, * as P from '../../../components/App/Personality';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
class Personality extends Component {
    render() {
        return (
            <PersonalityBox>
                <P.ExternalLink href='https://www.16personalities.com/profiles/fb16fc5fa3cc5' target='_blank'>
                    checkout my personality Profile <Icon icon={['fas','external-link-alt']}/>
                </P.ExternalLink>
                <P.ExternalLink download href='/files/Hossein Azadi - PVA Feb 2019.pdf'>
                    Personal Values Assessment (Barrett Values Centre)
                </P.ExternalLink>
            </PersonalityBox>
        );
    }
}

export default Personality;