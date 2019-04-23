import styled from 'styled-components';

const SkillBarsList = styled.div`
    position: relative;
    float: left;
    width: calc(100% - 200px);
    display: flex;
    flex-direction: row;
    align-content: center;
    align-items: center;
    border: 1px solid rgb(54,56,55);
    border-radius: 15px;

    @media screen and (max-width: 600px) {
        width: 100%;
    }
`;

export default SkillBarsList;