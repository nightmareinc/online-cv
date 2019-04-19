import styled from 'styled-components';
import Box from '../common/Box';

const ResumeBox = styled(Box)`
    min-height: 160px;
    /* height: 1130px; */
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: flex-start;
`;

export {
    ResumeBox as default
};