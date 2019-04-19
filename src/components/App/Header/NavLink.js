import styled from 'styled-components';
import RouterNavLinkElement from '../../../elements/NavLink';

const NavLink = styled(RouterNavLinkElement)`
    flex-grow: 1;
    height: 50px;
    margin-bottom: 10px;

    @media (max-width: 599px) {
        flex: 1 1 100%;
    }
    @media (min-width: 600px) {
        flex: 1 1 100%;
    }
    @media (min-width: 900px) {
        flex-basis: auto;
    }

    :not(:last-child) {
        margin-right: 20px;
    }
`;

export default NavLink;