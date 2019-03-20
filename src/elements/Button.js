import styled from 'styled-components';

const Button = styled.button`
    width: 100%;
    white-space: nowrap;
    line-height: 50px;
    text-align: center;
    border-radius: 25px;
    color: #ffffff;
    background: rgba(16, 19, 18, 0.36);
    border: none;
    font-family: 'Raleway', sans-serif;
    font-size: 20px;
    transition: ${props=> props.theme.transition};
    box-sizing: border-box;
    padding: 0px 20px;
    cursor: pointer;
    :hover {
        background: rgba(16, 19, 18, 0.8);
    }
`;

export default Button;