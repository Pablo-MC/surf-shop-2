import { Fragment, useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { updateProduct } from '../../store/admin/admin-actions';

const EditProduct = () => {
  const [product, setProduct] = useState();
  const dispatch = useDispatch();
  const products = useSelector(state => state.admin.products);

  // Edición dinámica. 
  useEffect(() => {
    setProduct(product);
  }, [product]);

  const selectProductHandler = (e) => {
    const selectedProduct = products.find(product => product._id === e.target.value);
    setProduct(selectedProduct);
  }

  const changeHandler = (e) => setProduct({ ...product, [e.target.name]: e.target.value });

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateProduct(product));

    // PONER mensaje de 'producto actualizado dentro de la funcion updateProduct, usar dispatch!'

  }

  return (
    <div className="container mt-5">
      <h2 className="text-info">Edit Product</h2>
      <div className="mt-4 ml-3">
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
        <Fragment>
          <div className="card shadow text-center mx-auto mt-5 p-4 product-size">
            <div className="card-body mx-auto p-1">
              <p className="lead text-info font-weight-normal pt-3">{product.name}</p>
              <p className="lead font-weight-normal">$ {product.price}</p>
              <img src={product.imageURL} alt={product.name} className="w-25" />
              <p className="lead m-2">{product.description}</p>
            </div>
          </div>

          <form className="mt-5 ml-3" onSubmit={submitHandler}>
            <div className="mt-4">
              <label>Product name</label>
              <input type="text" name="name" value={product.name} className="form-control" onChange={changeHandler} required />
            </div>

            <div className="mt-4">
              <label>Description</label>
              <textarea name="description" value={product.description} className="form-control" rows="3" onChange={changeHandler} required></textarea>
            </div>

            <div className="form-row mt-3">
              <div className="col-auto">
                <label>Price</label>
                <input type="number" min="0" step="any" name="price" value={product.price} className="form-control" onChange={changeHandler} required />
              </div>
            </div>

            <div className="form-row mt-4">
              <div className="col-auto">
                <label>Stock</label>
                <input type="number" min="0" name="stock" value={product.stock} className="form-control" onChange={changeHandler} required />
              </div>
            </div>

            <div className="from mt-4">
              <label>Shipping</label>
              <div className="form-check">
                <input type="radio" name="shipping" value={true} id="yes" className="form-check-input" onChange={changeHandler} />
                <label htmlFor="yes" className="form-check-label">Yes</label>
              </div>
              <div className="form-check">
                <input type="radio" name="shipping" value={false} id="no" className="form-check-input" onChange={changeHandler} />
                <label htmlFor="no" className="form-check-label">No</label>
              </div>
            </div>

            <button type="submit" className="btn btn-primary my-5">Edit Product</button>
          </form>
        </Fragment>
      }
    </div>
  );
}

export default EditProduct;