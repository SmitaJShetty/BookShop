import React from 'react';
import './App.css';
import MainBody from './components/mainbody';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from '@apollo/react-hooks';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
});

function App() {
  return (  
    <ApolloProvider client={client}>
      <MainBody  />
    </ApolloProvider>
  );
}

export default App;
