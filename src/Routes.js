import React from 'react';
import { Switch, Route, Link} from 'react-router-dom';
import Layout from './HOC/Layout';

// components
import Home from './containers/App/Home';
import Resume from './containers/App/Resume';
import Portfolio from './containers/App/Portfolio';
import Personality from './containers/App/Personality';
import ContactMe from './containers/App/ContactMe';
import Projects from './containers/App/Projects';
import Skills from './containers/App/Skills';
import AboutMe from './containers/App/AboutMe';

const NoMatch = () => {
    return (
        <div style={{
            textAlign: 'center',
            color: '#d3d6db'
        }}>
            <div>
                <h1 style={{
                    fontSize: '124px',
                    letterSpacing: '10px'
                }}>404</h1>
            </div>
            <h2>Oops! Page Not Found</h2>
            <Link to='/' style={{
                color: '#d3d6db'
            }}>Back To Homepage</Link>
        </div>
    )
}

const Routes = () => {
    return (
        <Layout>
            <Switch>
                <Route path='/' exact component={Home} />
                <Route path='/resume' exact component={Resume} />
                <Route path='/portfolio' exact component={Portfolio} />
                <Route path='/personality' exact component={Personality} />
                <Route path='/contactme' exact component={ContactMe} />
                <Route path='/projects' exact component={Projects} />
                <Route path='/skills' exact component={Skills} />
                <Route path='/aboutme' exact component={AboutMe} />
                <Route component={NoMatch} />
            </Switch>
        </Layout>
    );
};

export default Routes;