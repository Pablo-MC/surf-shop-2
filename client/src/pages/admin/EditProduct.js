import React, { useContext, useEffect, useState } from 'react';
import roleContext from '../../context/role/roleContext';

const EditProduct = () => {
  const { product, products, getProduct, editProduct } = useContext(roleContext);

  // Agregro al state de editedProduct el producto seleccionado. 
  useEffect(() => {
    if (product) setEditedProduct(product);
    // eslint-disable-next-line      
  }, [product]);

  // Uso el mismo state para mostrar los datos del producto selecionado y agregar los datos editados del producto.
  const [editedProduct, setEditedProduct] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    shipping: ''
  });

  const { name, description, price, stock } = editedProduct;


  const handleChange = (e) => {
    setEditedProduct({ ...editedProduct, [e.target.name]: e.target.value });
  }

  const handleSubmit = () => {
    editProduct(editedProduct);
  }


  return (
    <div className="container mt-5">
      <h2 className="text-info">Edit Product</h2>

      <div className="mt-4 ml-3">
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
        <div className="card shadow text-center mx-auto mt-5 p-4 product-size">
          <div className="card-body mx-auto p-1">
            <p className="lead text-info font-weight-normal pt-3">{name}</p>
            <p className="lead font-weight-normal">$ {price}</p>
            <img src={product.imageURL} alt={name} className="w-25" />
            <p className="lead m-2">{description}</p>
          </div>
        </div>
        :
        null
      }

      <form
        onSubmit={handleSubmit}
        className="mt-5 ml-3"
      >
        <div className="form-group mt-4">
          <label>Product name</label>
          <input type="text" name="name" value={name} className="form-control" onChange={handleChange} required />
        </div>

        <div className="form-group mt-4">
          <label>Description</label>
          <textarea name="description" value={description} className="form-control" rows="3" onChange={handleChange} required></textarea>
        </div>

        <div className="form-row mt-3">
          <div className="col-auto">
            <label>Price</label>
            <input type="number" min="0" step="any" name="price" value={price} className="form-control" onChange={handleChange} required />
          </div>
        </div>

        <div className="form-row mt-4">
          <div className="col-auto">
            <label>Stock</label>
            <input type="number" min="0" name="stock" value={stock} className="form-control" onChange={handleChange} required />
          </div>
        </div>

        <div className="form-row mt-4">
          <div className="col-auto">
            <label>Shipping</label>
            <div className="form-check">
              <input type="radio" name="shipping" value={true} id="yes" className="form-check-input" onChange={handleChange} />
              <label htmlFor="yes" className="form-check-label">Yes</label>
            </div>
            <div className="form-check">
              <input type="radio" name="shipping" value={false} id="no" className="form-check-input" onChange={handleChange} />
              <label htmlFor="no" className="form-check-label">No</label>
            </div>
          </div>
        </div>

        <button type="submit" className="btn btn-primary my-5">Edit Product</button>
      </form>
    </div>
  );
}

export default EditProduct;