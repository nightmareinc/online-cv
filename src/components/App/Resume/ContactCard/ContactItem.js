import styled from 'styled-components';

const ContactItem = styled.div`
    height: 40px; 
    line-height: 40px;

    & > svg {
        margin-right: 10px;
    }

    & > a {
        text-decoration: none;
    }
`;

export default ContactItem;