import React, { Component } from 'react';
import HomeWrapper, * as HomeStyled from '../../../components/App/Home';

class Home extends Component {
    render() {
        return (
            <HomeWrapper>
                <HomeStyled.TitleWrapper>
                    <HomeStyled.Title>
                        Hello<br />i'm Hossein
                    </HomeStyled.Title>
                    <HomeStyled.SubTitle>
                        Front-end Developer
                    </HomeStyled.SubTitle>
                </HomeStyled.TitleWrapper>
                <HomeStyled.ImageWrapper>
                    {/* <HomeStyled.Image src='/images/avatar.jpg'/> */}
                </HomeStyled.ImageWrapper>
            </HomeWrapper>
        )
    }
}

export default Home;