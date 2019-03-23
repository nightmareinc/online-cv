import styled from 'styled-components';

import NavLink from './NavLink';
import Avatar from './Avatar';

const Header = styled.header`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-content: center;
    align-items: center;
    flex-wrap: wrap;
    flex-direction: row;
    padding: 20px;
`;

export {
    Header as default,
    NavLink,
    Avatar
};