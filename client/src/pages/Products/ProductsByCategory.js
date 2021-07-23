import { Fragment } from 'react';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';

import Product from '../../components/Products/Product';

const ProductsByCategory = () => {
  const params = useParams();
  const products = useSelector(state => state.admin.products);

  const productsCategory = products.filter(prod => prod.category.name === params.category);

  return (
    <Fragment>
      {productsCategory.length !== 0
        ?
        <div className="container">
          <h1 className="my-4 text-capitalize text-center">{params.category}</h1>
          <p className="lead text-center">{productsCategory[0]?.category.description}</p>
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 justify-content-center mb-3">
            {productsCategory.map(product =>
              <div key={product._id}>
                <Product product={product} />
              </div>
            )}
          </div>
        </div>
        :
        <div className="alert alert-danger lead text-center w-50 mx-auto mt-5" role="alert">Category without products</div>
      }
    </Fragment>
  );
}

export default ProductsByCategory;