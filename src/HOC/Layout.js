import React from 'react';
import { ThemeProvider } from 'styled-components';
import Header from '../containers/App/Header';
import Footer from '../containers/App/Footer';
// configs
import GlobalStyles, { BackgroundImage } from '../config/GLobalStyles';
import theme from '../config/themes';
import navItems from '../config/navItems';
import '../config/FontAwesomeLibrary';

const Layout = (props) => {
    return (
        <ThemeProvider theme={theme}>
            <>
                <GlobalStyles />
                <BackgroundImage />
                <Header navItems={navItems} />
                { props.children }
                <Footer />
            </>
        </ThemeProvider>
    );
};

export default Layout;