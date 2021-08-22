import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Repo from './views/Repo/Repo';

const App: React.FC = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Repo} />
        </Switch>
    </BrowserRouter>
);

export default App;
