import { useContext, useEffect } from 'react';
import Carousel from 'react-elastic-carousel'
import roleContext from '../../context/role/roleContext';
import Product from './Product';

const ListProducts = () => {
  const { products, getProducts } = useContext(roleContext);

  useEffect(() => {
    getProducts();
    // eslint-disable-next-line
  }, []);

  // Almacenar todos los productos ordenados aleatoriamente.
  // let randomProducts = products.sort(() => Math.random() - 0.5);

  // Productos "más vendidos", con stock y ordeandos aleatoriamente. 
  let sellers = products
    // .filter(product => product.sold > 2 && product.stock > 0)
    .filter(product => product.sold > 3)
    .sort(() => Math.random() - 0.5);

  // BreakPoints Carousel
  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 490, itemsToShow: 2, itemsToScroll: 2 },
    { width: 690, itemsToShow: 3, itemsToScroll: 3 },
    { width: 990, itemsToShow: 4, itemsToScroll: 4 }
  ];


  return (
    <div className="container">
      <h2 className="my-5 text-center">Best sellers</h2>
      <Carousel initialFirstItem={Math.ceil(Math.random() * 3)} breakPoints={breakPoints}>
        {sellers.map(product =>
          <Product key={product._id} product={product} />
        )}
      </Carousel>
      <hr className="mt-5 mb-0" />
    </div>
  );
}

export default ListProducts;