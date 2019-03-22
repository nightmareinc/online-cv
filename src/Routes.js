import React from 'react';
import { Switch, Route} from 'react-router-dom';
import Layout from './HOC/Layout';

// components
import Home from './containers/App/Home';
import Resume from './containers/App/Resume';

const Routes = () => {
    return (
        <Layout>
            <Switch>
                <Route path='/' exact component={Home} />
                <Route path='/resume' exact component={Resume} />
            </Switch>
        </Layout>
    );
};

export default Routes;