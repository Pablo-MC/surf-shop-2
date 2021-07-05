import React, { Fragment } from 'react';

import Carousel from '../../components/UI/Carousel/Carousel';
import Payment from '../../components/layout/Payment';
import ListProducts from '../../components/products/ListProducts';
import Brands from '../../components/layout/Brands';
import Footer from '../../components/layout/Footer';

const Home = () => {
  return (
    <Fragment>
      <Carousel />
      <Payment />
      <ListProducts />
      <Brands />
      <Footer />
    </Fragment>
  );
}

export default Home;