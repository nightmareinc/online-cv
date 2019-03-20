import React, { Component } from 'react';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import Header from './Header';

const navItems = [
    'Resume','Portfolio','Profile','Personality','Contact me','Github',
]

const theme = {
    transition: 'all 220ms ease-in-out'
}

const GlobalStyle = createGlobalStyle`
   body {
       margin: 0;
       padding: 0;
       background-color: #101312;
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

const Wrapper = styled.div`
    height: 100vh;
`;

class App extends Component {
    render() {
        return (
            <div>
                <ThemeProvider theme={theme}>
                    <Wrapper>
                        <GlobalStyle />
                        <BackgroundImage />
                        <Header navItems={navItems} />
                    </Wrapper>
                </ThemeProvider>
            </div>
        );
    }
}

export default App;