import styled from 'styled-components';

const Title = styled.span`
    font-size: 17px;
    direction: ltr;
    font-weight: 500;

    &::after {
        content: ':';
    }

`;

export default Title;