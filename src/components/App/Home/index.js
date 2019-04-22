import styled from 'styled-components';
import Box from '../common/Box'
import Title from './Title';
import SubTitle from './SubTitle';
import Image from './Image';
import ImageWrapper from './ImageWrapper';
import TitleWrapper from './TitleWrapper';

const Home = styled(Box)`
    overflow: hidden;
    margin: 20px;
    font-weight: 400 !important;
    font-family: 'Roboto Slab';
    height: calc(100vh - 110px);
`;

export {
    Home as default,
    Title,
    SubTitle,
    Image,
    ImageWrapper,
    TitleWrapper
}