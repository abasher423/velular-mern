import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './screens/HomePage';
import ListProducts from './screens/Listedproducts'
import ProductScreen from './screens/ProductScreen';
import { Container } from '@material-ui/core';

const App = () => {
  return (
    <>
      <Router>
          <Header />
        <main>
          <Container>
            <Route path='/' component={HomePage} exact />
            <Route path='/products' component={ListProducts} exact />
            <Route path='/products/:productId' component={ProductScreen} />
          </Container>
        </main>
        {/* <Footer /> */}
        </Router>
    </>
  );
}

export default App;
