import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePageScreen from './screens/HomePageScreen';
import UserRegisterScreen from './screens/UserRegisterScreen';
import UserLoginScreen from './screens/UserLoginScreen';
import UserProfileScreen from './screens/UserProfileScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductDetailScreen from './screens/ProductDetailScreen';
import CartScreen from './screens/CartScreen';
import { Container } from '@material-ui/core';
import ShippingScreen from './screens/ShippingScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import UserListScreen from './screens/UserListScreen';
import UserUpdateScreen from './screens/UserUpdateScreen';
import CustomListScreen from './screens/CustomListScreen';
import CustomUpdateScreen from './screens/CustomUpdateScreen';
import OrderListScreen from './screens/OrderListScreen';
import CustomCreateScreen from './screens/CustomCreateScreen';
import UserOrdersScreen from './screens/UserOrdersScreen';

const App = () => {
  return (
    <>
      <Router>
          <Header />
        <main>
          <Container>
            <Route path='/' component={HomePageScreen} exact />
            <Route path='/products' component={ProductListScreen} exact />
            <Route path='/products/:productId' component={ProductDetailScreen} />
            <Route path='/cart/:cartId?' component={CartScreen} exact/>
            <Route path='/register' component={UserRegisterScreen} exact />
            <Route path='/login' component={UserLoginScreen} exact />
            <Route path='/profile' component={UserProfileScreen} exact />
            <Route path='/orders' component={UserOrdersScreen} exact />
            <Route path='/admin/users-list' component={UserListScreen} exact />
            <Route path='/users/:userId' component={UserUpdateScreen} />
            <Route path='/shipping' component={ShippingScreen} exact />
            <Route path='/place-order' component={PlaceOrderScreen} exact />
            <Route path='/orders/:orderId' component={OrderScreen} />
            <Route path='/admin/customs-list' component={CustomListScreen} />
            <Route path='/admin/orders-list' component={OrderListScreen} exact />
            <Route path='/artist/customs' component={CustomCreateScreen} exact />
            <Route path='/customs/:customId' component={CustomUpdateScreen} />
          </Container>
        </main>
        <Footer />
        </Router>
    </>
  );
}

export default App;
