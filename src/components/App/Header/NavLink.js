import styled from 'styled-components';
import RouterNavLinkElement from '../../../elements/NavLink';

const NavLink = styled(RouterNavLinkElement)`
    flex-grow: 1;
    height: 50px;
    :not(:last-child) {
        margin-right: 20px;
    }
`;

export default NavLink;