import { Fragment } from 'react';

import Carousel from '../../components/UI/Carousel/Carousel';
import Payment from '../../components/Layout/Payment';
import ProductsCarousel from '../../components/Products/ProductsCarousel';
import Brands from '../../components/Layout/Brands';
import Footer from '../../components/Layout/Footer';

const Home = () => {
  return (
    <Fragment>
      <Carousel />
      <Payment />
      <ProductsCarousel />
      <Brands />
      <Footer />
    </Fragment>
  );
}

export default Home;