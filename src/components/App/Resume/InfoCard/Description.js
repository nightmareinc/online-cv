import styled from 'styled-components';

const Description = styled.div`
    position: relative;
    float: left; clear: left;

    font-size: 18px;
    direction: ltr;
    text-align: justify;

    &::before {
        display: block;
        position: relative;
        
        content: '${props => props.title ? props.title + " : " : null}';

        direction: ltr;
        font-size: 20px;
        font-weight: 600;

        margin-top: 10px;
    }

`;

export default Description;
