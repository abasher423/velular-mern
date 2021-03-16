import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './screens/HomePage';
import ListedProducts from './screens/Listedproducts'
import ProductScreen from './screens/ProductScreen';
import CreateProductScreen  from './screens/CreateProductScreen';
import CartScreen from './screens/CartScreen';
import { Container } from '@material-ui/core';

const App = () => {
  return (
    <>
      <Router>
          <Header />
        <main>
          <Container>
            <Route path='/' component={HomePage} exact />
            <Route path='/products' component={ListedProducts} exact />
            <Route path='/products/:productId' component={ProductScreen} />
            <Route path='/create-a-custom' component={CreateProductScreen} exact/>
            <Route path='/cart/:cartId?' component={CartScreen} exact/>
          </Container>
        </main>
        {/* <Footer /> */}
        </Router>
    </>
  );
}

export default App;
