import React, { Component } from 'react';
import HomeWrapper, * as HomeStyled from '../../../components/App/Home';
class Home extends Component {
    render() {
        return (
            <HomeWrapper>
                <HomeStyled.Intro>
                    Hello i'm Hossein
                </HomeStyled.Intro>
            </HomeWrapper>
        )
    }
}

export default Home;