import styled, {createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
    *{
        box-sizing: border-box;
    }
   body {
       margin: 0;
       padding: 0;
       background-color: #101312;
       height: 100vh;
       font-family: "Roboto";
   }
   button {
       outline: none !important;
   }
`;

const BackgroundImage = styled.div`
    height: 100vh; width: 100%;
    position: fixed;
    color: white;
    top: 0; left: 0;
    background-image: url('/images/bg2.jpg');
    background-size: 100% auto;
    background-attachment: fixed;
    background-repeat: no-repeat;
    z-index: -5;

    @media screen and (max-width: 1000px){
        background-size: auto 100%;
        background-position: center center;
    }
`;

export {
    GlobalStyles as default,
    BackgroundImage
};