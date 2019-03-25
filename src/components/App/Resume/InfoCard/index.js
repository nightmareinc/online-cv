import styled from 'styled-components';

import Card from '../../common/Card';
import Avatar from './Avatar';
import Sub from './Sub';
import Description from './Description';
import Name from './Name';

const InfoCard = styled(Card)`
    flex-basis: 50%;
`;

export {
    InfoCard as default,
    Avatar,
    Sub,
    Description,
    Name
}