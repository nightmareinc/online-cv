import styled from 'styled-components';
import RouterNavLinkElement from '../../../elements/NavLink';
import { for_phone_only, for_big_desktop_up, for_tablet_portrait_up, for_desktop_up, for_tablet_landscape_up } from '../common/MediaQueries';

const NavLink = styled(RouterNavLinkElement)`
    flex-grow: 1;
    height: 50px;
    margin-bottom: 10px;
    ${for_phone_only}
    ${for_tablet_portrait_up}
    ${for_tablet_landscape_up}
    ${for_desktop_up}
    ${for_big_desktop_up}

    :not(:last-child) {
        margin-right: 20px;
    }
`;

export default NavLink;