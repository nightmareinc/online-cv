import styled from 'styled-components';

const Avatar = styled.div`
    width: 100px; height: 100px;
    position: relative;
    float: left;

    border-radius: 5px;
    margin-right: 20px;

    background-color: white;
    background-image: url(${props => props.image ? props.image : ""});
    background-repeat: no-repeat;
    background-size: 100px auto;
    
    transition: ${props => props.theme.transition};
`;

export default Avatar;