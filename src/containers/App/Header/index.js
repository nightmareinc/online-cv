import React, { Component } from 'react';
import HeaderWrapper, * as HeaderStyled from '../../../components/App/Header';

class Header extends Component {

    handleClick = (e) => {
        console.log(e.target.dataset.toggle);
    }
    
    render() {
        const navItems = this.props.navItems;
        return (
            <HeaderWrapper>
                <HeaderStyled.Avatar image='/images/avatar.jpg' />
                {
                    navItems.map((item, index) =>{
                        return (
                            <HeaderStyled.ButtonWrapper key={index}>
                                <HeaderStyled.NavButton data-toggle="present" onClick={this.handleClick}>{item}</HeaderStyled.NavButton>
                            </HeaderStyled.ButtonWrapper>
                        );
                    })
                }
            </HeaderWrapper>
        );
    }
}

export default Header;