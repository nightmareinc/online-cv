import styled from 'styled-components';

const Card = styled.section`
    padding: 5px 10px;
    border-left: 5px solid rgba(16, 19, 18, 0.8);
    /* color: #d3d6db; */
    margin-bottom: 10px;
    order: ${props => props.order ? Number(props.order) : 0};
    
    @media (max-width: 599px) {
        flex: 1 1 100%;
    }
    @media (min-width: 600px) {
        flex: 1 1 100%;
    }
    @media (min-width: 900px) {
        flex-basis: 50%;
    }
    
    & * {
        color: ${props => props.theme.darker};
    }
`;

export default Card;