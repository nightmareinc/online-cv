import React, { Component } from 'react';
import HeaderWrapper, * as HeaderStyled from '../../../components/App/Header';
import { NavLink } from 'react-router-dom';

class Header extends Component {

    handleClick = (e) => {
        console.log(e.target.dataset.toggle);
    }
    
    render() {
        const navItems = this.props.navItems;
        return (
            <HeaderWrapper>
                <HeaderStyled.Avatar to='/' image='/images/avatar.jpg' />
                {
                    navItems.map((item, index) =>{
                        return (
                            <HeaderStyled.ButtonWrapper key={index}>
                                <NavLink to={item.link}>
                                    <HeaderStyled.NavButton data-toggle="present" onClick={this.handleClick}>
                                        {item.title}
                                    </HeaderStyled.NavButton>
                                </NavLink>
                            </HeaderStyled.ButtonWrapper>
                        );
                    })
                }
            </HeaderWrapper>
        );
    }
}

export default Header;