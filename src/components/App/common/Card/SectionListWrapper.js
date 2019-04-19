import styled from 'styled-components';

const SectionListWrapper = styled.div`
    overflow: hidden;
    padding: 5px 0px;
    &:not(:last-child){
        border-bottom: 1px solid #1d1f1f;
    }
`;

export default SectionListWrapper;