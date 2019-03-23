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
                <HeaderStyled.Avatar to='/' image='/images/avatar.jpg' />
                {
                    navItems.map((item, index) =>{
                        return (
                            <HeaderStyled.ButtonWrapper key={index} data-toggle="present" onClick={this.handleClick}>
                                <HeaderStyled.NavLink to={item.link}>
                                    {item.title}
                                </HeaderStyled.NavLink>
                            </HeaderStyled.ButtonWrapper>
                        );
                    })
                }
            </HeaderWrapper>
        );
    }
}

export default Header;