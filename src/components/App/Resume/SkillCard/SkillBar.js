import styled from 'styled-components';

const SkillBar = styled.div`
    height: 20px;
    flex-basis: 25%;
    background: ${({active}) => active ? 'rgba(255, 255, 255, 0.9);':'rgba(0, 0, 0, 0.34);'};
    
    &:first-child {
        border-radius: 10px 0 0 10px;
    }
    &:last-child {
        border-radius:0 10px 10px 0;
    }
`;

export default SkillBar;