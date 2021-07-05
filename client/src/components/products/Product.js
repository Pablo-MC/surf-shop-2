import React, { Fragment, useContext } from 'react';
import cartContext from '../../context/cart/cartContext';
import $ from 'jquery';

import ModalProduct from './ModalProduct';
import ModalAddCart from './ModalAddCart';

const Product = ({ product }) => {
  const { addProduct } = useContext(cartContext);

  const { name, imageURL, price, description, stock } = product;

  // Modal AddCart with timer
  $('#cartModal').on('shown.bs.modal', () => {
    const timer = setInterval(() => {
      $('#cartModal').modal('toggle');
      clearInterval(timer);
    }, 700);
  });

  // Modal Product
  const dataProductModal = (name, imageURL, description) => {
    document.getElementById('nameProduct').textContent = name;
    document.getElementById('imageProduct').setAttribute('src', imageURL);
    document.getElementById('descriptionProduct').textContent = description;
  };


  return (
    <Fragment>
      <div className="card shadow text-center m-3">
        <div className="card-body mx-auto p-1">
          <p className="lead text-info font-weight-normal pt-3">{name}</p>
          <p className="lead font-weight-normal">$ {price}</p>
          <img src={imageURL} alt={name}
            className="w-75 d-block mx-auto"
            data-toggle="modal" data-target="#productModal" role="button"
            onClick={() => dataProductModal(name, imageURL, description)}
          />
          {!stock
            ?
            <div className="alert alert-danger lead text-center w-75 mx-auto my-3 p-1 out-stock">
              Out of Stock
            </div>
            :
            <button
              className="btn btn-sm btn-outline-info my-3"
              data-toggle="modal" data-target="#cartModal"
              onClick={() => addProduct(product)}
            >Add Cart <i className="fa fa-shopping-cart ml-2"></i>
            </button>
          }
        </div>
      </div>

      {/* /////////////// */}

      <ModalProduct />
      <ModalAddCart />
    </Fragment>
  )
}

export default Product;