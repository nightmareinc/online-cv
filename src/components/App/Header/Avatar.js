import styled from 'styled-components';

const Avatar = styled.div`
    max-width: 100px; height: 100px;
    border-radius: 50px;
    flex: 1 0 100px;
    background-color: white;
    background-image:url(${props => props.image ? props.image : ""});
    background-repeat: no-repeat;
    background-size: 100px auto;
    margin-right: 20px;
    transition: ${props => props.theme.transition};
    position: relative;
    z-index: 5;
    :hover {
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.55);
    }
`;

export default Avatar;