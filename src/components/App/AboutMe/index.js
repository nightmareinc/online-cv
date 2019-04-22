import styled from 'styled-components';
import Box from '../common/Box'
import Body from './Body';
import Quote from './Quote';

const AboutMe = styled(Box)`
    margin: 20px;
    font-weight: 400 !important;
    font-family: 'Roboto Slab';
    padding: 10px 10vw;
`;

export {
    AboutMe as default,
    Body,
    Quote
}