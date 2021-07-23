import { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct } from '../../store/admin/admin-actions';

const DeleteProduct = () => {
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();
  const products = useSelector(state => state.admin.products);

  const selectProductHandler = (e) => {
    const selectedProduct = products.find(product => product._id === e.target.value);
    setProduct(selectedProduct);
  }

  const deleteProductHandler = () => {
    dispatch(deleteProduct(product));
    setProduct(null);
  }

  return (
    <div className="container mt-5">
      <h2 className="text-danger">Delete Product</h2>

      <div className="form-row mt-4 ml-3">
        <label>Product</label>
        <select className="custom-select" onChange={selectProductHandler}>
          <option hidden>Choose product...</option>
          {products.map(product =>
            <option key={product._id} value={product._id}
            >{product.name}</option>
          )}
        </select>
      </div>

      {product &&
        <div className="card shadow text-center mx-auto my-5 p-4 s">
          <div className="card-body mx-auto p-1">
            <p className="lead text-info font-weight-normal pt-3">{product.name}</p>
            <p className="lead font-weight-normal">$ {product.price}</p>
            <img src={product.imageURL} alt={product.name} className="w-25" />
            <p className="lead">{product.description}</p>
          </div>
          <button
            className="btn btn-danger mt-3 mx-auto"
            onClick={deleteProductHandler}
          >Delete Product</button>
        </div>
      }
    </div>
  );
}

export default DeleteProduct;