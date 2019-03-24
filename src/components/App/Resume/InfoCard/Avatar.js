import styled from 'styled-components';

const Avatar = styled.div`
    max-width: 100px; height: 100px;
    position: relative;

    border-radius: 50px;
    margin-right: 20px;

    background-color: white;
    background-image: url(${props => props.image ? props.image : ""});
    background-repeat: no-repeat;
    background-size: 100px auto;
    
    transition: ${props => props.theme.transition};
`;

export default Avatar;