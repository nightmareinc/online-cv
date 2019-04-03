import styled from 'styled-components';

const Card = styled.section`
    padding: 5px 10px;
    border-left: 5px solid rgba(16, 19, 18, 0.8);
    color: #d3d6db;
    margin-bottom: 10px;
    flex-basis: 50%;
    
    & * {
        color: #d3d6db;
    }
`;

export default Card;