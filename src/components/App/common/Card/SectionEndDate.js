import styled from 'styled-components';

const SectionEndDate = styled.div`
    font-size: .8rem;
    line-height: 25px;
    position: relative;
    float: left;
    ::before {
        content: '-';
        margin-right: 4px;
    }
`;

export default SectionEndDate;