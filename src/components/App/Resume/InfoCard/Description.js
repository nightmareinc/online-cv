import styled from 'styled-components';

const Description = styled.p`
    font-size: 12px;
    direction: ltr;
    text-align: justify;

    &::before {
        display: block;
        position: relative;
        content: '${props => props.title ? props.title + " : " : null}';
        direction: ltr;
        font-size: 13px;
        font-weight: 700;
    }

`;

export default Description;
