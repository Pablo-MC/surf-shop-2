import { Fragment } from 'react';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';

import CartList from '../../components/Cart/CartList';

const Cart = () => {
  const history = useHistory();

  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const productsCart = useSelector(state => state.cart.productsCart);
  const totalPrice = useSelector(state => state.cart.totalPrice);

  const options = {
    style: 'currency',
    currency: 'USD',
  };

  return (
    <Fragment>
      {productsCart.length === 0
        ?
        <div className="container">
          <div className="alert alert-danger lead text-center w-50 mx-auto mt-5" role="alert">
            Your cart is empty &#8291; 😥
          </div>
        </div>
        :
        <div className="container">
          <table className="table table-info mt-3 text-center">
            <thead className="d-none d-lg-block">
              <tr className="row m-0">
                <th className="col-4">Product</th>
                <th className="col-2">Price</th>
                <th className="col-2">Quantity</th>
                <th className="col-2">Total</th>
                <th className="col-2">Delete</th>
              </tr>
            </thead>
          </table>

          {productsCart.map(product =>
            <CartList key={product._id} product={product} />
          )}

          <div className="container d-flex justify-content-end mt-4 pt-3 pb-5 cart-price">
            <h2 className="m-0">Total: {new Intl.NumberFormat(navigator.language, options).format(totalPrice)}</h2>
            <button
              className="btn btn-md btn-success ml-4 py-2 text-uppercase"
              onClick={isAuthenticated
                ? () => history.push('/checkout')
                : () => history.push('/login')}
            >Checkout<i className="fa fa-arrow-right ml-3"></i>
            </button>
          </div>
        </div>
      }
    </Fragment >
  );
}

export default Cart;