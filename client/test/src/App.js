import React from 'react';
/*CSS Imports*/
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/style.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
/*Object Imports*/
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { Footer } from "./components";
import { Router } from "react-router-dom";
import Routes from "./routes"
import history from "./routes/history"
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import Configx from "../src/config";
import { Container } from "react-bootstrap";



library.add(fas);

const client = new ApolloClient({
  uri: Configx.endPointUri,
  cache: new InMemoryCache()
});

function App() {
  return (
    <div className="App">
      <ApolloProvider client={client}>        
        <Container className ="mainContainer">        
          <Router history={history}>
            <Routes />
          </Router>
        </Container>
        <Footer />
      </ApolloProvider>
    </div>
  );
}

export default App;
