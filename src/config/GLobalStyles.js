import styled, {createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
   body {
       margin: 0;
       padding: 0;
       background-color: #101312;
       height: 100vh;
       font-family: "Raleway";
   }
   button {
       outline: none !important;
   }
`;

const BackgroundImage = styled.div`
    height: 100vh; width: 100%;
    position: absolute;
    color: white;
    top: 0; left: 0;
    background-image: url('/images/bg2.jpg');
    background-size: 100% auto;
    background-repeat: no-repeat;
    z-index: -5;
    opacity: 0.6;
    filter: blur(3px);
    -webkit-filter:blur(3px);
`;

export {
    GlobalStyles as default,
    BackgroundImage
};