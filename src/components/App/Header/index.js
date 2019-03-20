import styled from 'styled-components';

import ButtonWrapper from './ButtonWrapper';
import NavButton from './NavButton';
import Avatar from './Avatar';

const Header = styled.header`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-content: center;
    align-items: center;
    padding: 20px;
`;

export {
    Header as default,
    ButtonWrapper,
    NavButton,
    Avatar
};