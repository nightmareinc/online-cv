import React from 'react';
import Header from '../containers/App/Header';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import Footer from '../containers/App/Footer';

const GlobalStyle = createGlobalStyle`
   body {
       margin: 0;
       padding: 0;
       background-color: #101312;
       height: 100vh;
   }
   button {
       outline: none !important;
   }
`;

const BackgroundImage = styled.div`
    height: 100vh; width: 100%;
    position: absolute;
    top: 0; left: 0;
    background-image: url('/images/bg2.jpg');
    background-size: 100% auto;
    background-repeat: no-repeat;
    z-index: -5;
    opacity: 0.6;
    filter: blur(3px);
`;


const navItems = [
    'Resume','Portfolio','Profile','Personality','Contact me','Github',
]


const theme = {
    transition: 'all 220ms ease-in-out'
}

const Layout = (props) => {
    return (
        <ThemeProvider theme={theme}>
            <>
                <GlobalStyle />
                <BackgroundImage />
                <Header navItems={navItems} />
                { props.children }
                <Footer />
            </>
        </ThemeProvider>
    );
};

export default Layout;