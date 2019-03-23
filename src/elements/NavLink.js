import styled from 'styled-components';
import { NavLink as RouterNavLink } from 'react-router-dom';

const NavLink = styled(RouterNavLink)`
    display: block;
    width: 100%;

    line-height: 50px;
    color: #d3d6db;
    white-space: nowrap;
    text-align: center;
    font-family: 'Raleway', sans-serif;
    font-size: 20px;
    text-decoration: none;

    background: rgba(16, 19, 18, 0.36);
    border-radius: 25px;
    border: none;
    
    box-sizing: border-box;
    padding: 0px 20px;

    transition: ${props=> props.theme.transition};
    cursor: pointer;
    :hover {
        background: rgba(16, 19, 18, 0.8);
    }
`;

export default NavLink;