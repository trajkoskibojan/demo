import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import App from './app/App';
import reportWebVitals from './reportWebVitals';
import { BASE_URL } from './app/api/APIEndpoint';

const client = new ApolloClient({
    uri: BASE_URL,
    headers: {
        Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
    },
    cache: new InMemoryCache(),
});

ReactDOM.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>,
    document.getElementById('root')
);

reportWebVitals();
