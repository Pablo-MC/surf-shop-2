import React, { useContext, useEffect } from 'react';
import roleContext from '../../context/role/roleContext';


const DeleteProduct = () => {
  const { product, products, deleteProduct, getProduct, getProducts } = useContext(roleContext);

  useEffect(() => {
    getProducts();
    // eslint-disable-next-line      
  }, [product]);


  return (
    <div className="container mt-5">
      <h2 className="text-danger">Delete Product</h2>

      <div className="form-row mt-4 ml-3">
        <label>Product</label>
        <select className="custom-select" onChange={(e) => getProduct(e.target.value)}>
          <option hidden>Choose product...</option>
          {products.map(product =>
            <option
              key={product._id}
              value={product._id}
            >{product.name}</option>
          )}
        </select>
      </div>

      {product
        ?
        <div className="card shadow text-center mx-auto my-5 p-4 s">
          <div className="card-body mx-auto p-1">
            <p className="lead text-info font-weight-normal pt-3">{product.name}</p>
            <p className="lead font-weight-normal">$ {product.price}</p>
            <img src={product.imageURL} alt={product.name} className="w-25" />
            <p className="lead">{product.description}</p>
          </div>
          <button type="submit" className="btn btn-danger mt-3 mx-auto" onClick={() => deleteProduct(product)}>Delete Product</button>
        </div>
        :
        null
      }
    </div>
  );
}

export default DeleteProduct;