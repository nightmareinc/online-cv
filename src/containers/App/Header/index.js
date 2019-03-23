import React, { Component } from 'react';
import HeaderWrapper, * as HeaderStyled from '../../../components/App/Header';

class Header extends Component {

    render() {
        const navItems = this.props.navItems;
        return (
            <HeaderWrapper>
                <HeaderStyled.Avatar to='/' image='/images/avatar.jpg' />
                {
                    navItems.map((item, index) =>{
                        return (
                            <HeaderStyled.NavLink key={index} to={item.link} activeStyle={{
                                position: 'absolute',
                                top: '130px',
                                left: '50%',
                                transform: 'translateX(-50%) scale(1.2)',
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