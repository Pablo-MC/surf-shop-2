import React, { Fragment, useContext } from 'react';
import roleContext from '../../context/role/roleContext';
import Product from '../../components/products/Product';


const ListProductsCategory = () => {
  const { message, productsCategory, category } = useContext(roleContext);

  return (
    <Fragment>
      {!message
        ?
        <div className="container">
          <h1 className="my-4 text-capitalize text-center">{category}</h1>
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 justify-content-center mb-3">
            {productsCategory.map(product =>
              <div key={product._id}>
                <Product product={product} />
              </div>
            )}
          </div>
        </div>
        :
        <div className="alert alert-danger lead text-center w-50 mx-auto mt-5" role="alert">{message}</div>
      }
    </Fragment>
  );
}

export default ListProductsCategory;
