import { Fragment } from 'react';
import $ from 'jquery';

import { useDispatch, useSelector } from 'react-redux';
import { makePurchase, saveCartUser } from '../../store/cart/cart-actions';

import mastercard from '../../assets/images/cards/mastercard.png'
import discover from '../../assets/images/cards/discover.png'
import paypal from '../../assets/images/cards/paypal.png'
import americanExpress from '../../assets/images/cards/american-express.png'

const Checkout = (props) => {
  const dispatch = useDispatch();

  const user = useSelector(state => state.auth.user);
  const productsCart = useSelector(state => state.cart.productsCart);
  const totalPrice = useSelector(state => state.cart.totalPrice);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Actualiza la base de datos y despues elimina los productos del carrito del usuario.  
    dispatch(makePurchase(productsCart));

    // Elimina los productos de la propiedad cart del usuario. 
    dispatch(saveCartUser(user));

    // Poner un Spinner y cuando termine de actualizar todo que vuelva al Home.

    // $('#checkoutModal').modal('show');
    // setTimeout(() => {
    //   props.history.push('/');
    // }, 3000);
  }

  // Modal Checkout with timer
  $('#checkoutModal').on('shown.bs.modal', () => {
    const timer = setInterval(() => {
      $('#checkoutModal').modal('toggle');
      clearInterval(timer);
    }, 2000);
  });

  return (
    <Fragment>
      <div className="container my-5">
        <div className="row justify-content-center h-100">
          <div className="col-sm-10 col-md-7 col-lg-5 col-xl-4">
            <form
              onSubmit={handleSubmit}
            >
              <div className="card shadow-lg payment">
                <div className="card-header bg-info pb-1">
                  <h5 className="text-center">Total: $ {totalPrice}</h5>
                </div>
                <div className="card-body text-uppercase text-center pb-2">
                  <div>
                    <h3 className="text-center text-capitalize p-2">Payment Details</h3>
                    <img src={mastercard} alt="Mastercard" />
                    <img src={discover} alt="Discover" />
                    <img src={paypal} alt="Paypal" />
                    <img src={americanExpress} alt="American Express" />
                  </div>
                  <hr />
                  <div className="form-group w-75 mx-auto">
                    <label>Card Number</label>
                    <input type="number" className="form-control text-center" placeholder="xxxx-xxxx-xxxx-xxxx" required />
                  </div>
                  <div className="d-flex justify-content-center w-100">
                    <div className="form-group w-50">
                      <label>Expiration Date</label>
                      <input type="date" className="form-control px-1" required />
                    </div>
                    <div className="form-group w-25 ml-3">
                      <label>CVC</label>
                      <input type="number" className="form-control text-center" placeholder="123" required />
                    </div>
                  </div>
                </div>
                <div className="card-footer">
                  <button
                    type="submit"
                    className="btn btn-success btn-lg btn-block"
                  >Confirm Payment</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>


      {/* Modal Checkout */}
      <div className="modal fade" id="checkoutModal" tabIndex="-1" role="dialog" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="card-body text-center py-5">
              <i className="fa fa-smile-o text-success fa-5x"></i>
              <h4 className="mt-3">Thanks for your purchase! <br /> Your order has shipped!</h4>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Checkout;