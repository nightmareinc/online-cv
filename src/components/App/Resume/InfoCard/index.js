import styled from 'styled-components';

import Card from '../../common/Card';
import Avatar from './Avatar';
import Title from './Title';
import Sub from './Sub';
import Description from './Description';
import Name from './Name';

const InfoCard = styled(Card)`
    border: 1px solid red;
    flex-basis: 50%;
`;

export {
    InfoCard as default,
    Avatar,
    Title,
    Sub,
    Description,
    Name
}