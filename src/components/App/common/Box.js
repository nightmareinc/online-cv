import styled from 'styled-components';

const Box = styled.div`
    height: auto; width: auto;
    border-radius: 25px;
    padding: 20px;
    background-color: rgba(255, 255, 255, 0.46);
    margin: 20px;
    margin-top: 0 !important;
    color: ${props => props.theme.darker};
`;

export default Box;