import React from 'react';
import { Switch, Route} from 'react-router-dom';
import Layout from './HOC/Layout';

// components
import Home from './containers/App/Home';
import Resume from './containers/App/Resume';
import Protfolio from './containers/App/Portfolio';
import Personality from './containers/App/Personality';
import ContactMe from './containers/App/ContactMe';
import Projects from './containers/App/Projects';
import Skills from './containers/App/Skills';

const Routes = () => {
    return (
        <Layout>
            <Switch>
                <Route path='/' exact component={Home} />
                <Route path='/resume' exact component={Resume} />
                <Route path='/portfolio' exact component={Protfolio} />
                <Route path='/personality' exact component={Personality} />
                <Route path='/contactme' exact component={ContactMe} />
                <Route path='/projects' exact component={Projects} />
                <Route path='/skills' exact component={Skills} />
            </Switch>
        </Layout>
    );
};

export default Routes;