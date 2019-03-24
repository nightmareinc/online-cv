import React, { Component } from 'react';
import HeaderWrapper, * as HeaderStyled from '../../../components/App/Header';

class Header extends Component {

    render() {
        const navItems = this.props.navItems;
        return (
            <HeaderWrapper>
                {
                    navItems.map((item, index) =>{
                        return (
                            <HeaderStyled.NavLink key={index} exact to={item.link} activeStyle={{
                                backgroundColor: 'rgba(16, 19, 18, 0.8)'
                            }}>
                                {item.title}
                            </HeaderStyled.NavLink>
                        );
                    })
                }
            </HeaderWrapper>
        );
    };
}

export default Header;