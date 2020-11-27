import React from 'react';

import Carousel from './Carousel';
import Payment from './Payment';
import ListProducts from '../products/ListProducts';
import Brands from './Brands';
import Footer from '../layout/Footer';


const Home = () => {
   return (
      <>
         <Carousel />
         <Payment />
         <ListProducts />
         <Brands />
         <Footer />
      </>
   );
}

export default Home;