import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import Repo from './views/Repo/Repo';

const GlobalStyle = createGlobalStyle`
  .ant-pagination {
    display: none;
  }
`;

const App: React.FC = () => (
    <BrowserRouter>
        <GlobalStyle />
        <Switch>
            <Route exact path="/" component={Repo} />
        </Switch>
    </BrowserRouter>
);

export default App;
