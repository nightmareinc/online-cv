import styled from 'styled-components';

const ButtonWrapper = styled.div`
    transition: ${props=> props.theme.transition};
    flex-grow: 1;
    height: 50px;
    :not(:last-child) {
        margin-right: 20px;
    }
`;
 
export default ButtonWrapper;