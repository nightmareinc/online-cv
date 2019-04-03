import styled from 'styled-components';

const Title = styled.div`
    font-size: 20px;
    direction: ltr;
    font-weight: 200;
    text-transform: uppercase;

    &::after {
        content: ':';
    }

`;

export default Title;