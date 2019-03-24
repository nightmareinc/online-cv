import { css } from 'styled-components';

const for_phone_only = css`
    @media (max-width: 599px) { 
        flex: 1 1 100%;
     }
`
const for_tablet_portrait_up = css`
    @media (min-width: 600px) { 
        flex: 1 1 100%;
     }
`
const for_tablet_landscape_up = css`
    @media (min-width: 900px) { 
        flex-basis: auto;
     }
`
const for_desktop_up = css`
    @media (min-width: 1200px) { 
     }
`
const for_big_desktop_up = css`
    @media (min-width: 1800px) { 
     }
`

export {
    for_phone_only,
    for_tablet_portrait_up,
    for_tablet_landscape_up,
    for_desktop_up,
    for_big_desktop_up
}