import React from 'react';
import { Switch, Route} from 'react-router-dom';
import Layout from './HOC/Layout';
import Home from './containers/App/Home';

const Routes = () => {
    return (
        <Layout>
            <Switch>
                <Route path='/' exact component={Home} />
            </Switch>
        </Layout>
    );
};

export default Routes;