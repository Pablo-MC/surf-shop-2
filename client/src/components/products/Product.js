import { Fragment } from 'react';
import $ from 'jquery';

import { useDispatch } from 'react-redux';
import { cartActions } from '../../store/cart/cart-slice';

import ModalProduct from './ModalProduct';
import ModalAddCart from './ModalAddCart';

const Product = (props) => {
  const dispatch = useDispatch();

  // const user = useSelector(state => state.auth.user);
  // const productsCart = useSelector(state => state.cart.productsCart);

  const { name, imageURL, price, description, stock } = props.product;

  // // Modal AddCart with timer
  $('#cartModal').on('shown.bs.modal', () => {
    const timer = setInterval(() => {
      $('#cartModal').modal('toggle');
      clearInterval(timer);
    }, 700);
  });

  // // Modal Product
  const dataProductModal = (name, imageURL, description) => {
    document.getElementById('nameProduct').textContent = name;
    document.getElementById('imageProduct').setAttribute('src', imageURL);
    document.getElementById('descriptionProduct').textContent = description;
  };

  // const addProductHandler = () => {

  // guardar producto en el carrito.
  // dispatch(cartActions.addProductToCart(product));

  // guardar los productos del carrito en la propiedad cart del usuario. 
  // dispatch(saveCartUserandPutInCart(user, product));

  // console.log(user, product);
  // }



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
              onClick={() => dispatch(cartActions.addProductToCart(props.product))}
            // onClick={addProductHandler}
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