import styled from 'styled-components';

const SectionEndDate = styled.div`
    position: relative;
    float: left;
    ::before {
        content: '-';
        margin-right: 4px;
    }
`;

export default SectionEndDate;