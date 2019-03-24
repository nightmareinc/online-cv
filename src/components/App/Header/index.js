import styled from 'styled-components';

import NavLink from './NavLink';

const Header = styled.header`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-content: center;
    align-items: center;
    flex-wrap: wrap;
    flex-direction: row;
    padding: 20px;
    padding-bottom: 10px !important;
`;

export {
    Header as default,
    NavLink
};