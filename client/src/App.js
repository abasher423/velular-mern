import React from 'react';
import Header from './components/Header';
// import Footer from './components/Footer';
import HomePage from './screens/HomePage';
import { Container } from '@material-ui/core';

const App = () => {
  return (
    <>
    <Header />
    <main>
      <Container>
        <HomePage />
      </Container>
    </main>
    {/* <Footer /> */}
    </>
  );
}

export default App;
