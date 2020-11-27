import React, { useContext } from 'react';
import cartContext from '../../context/cart/cartContext';
import $ from 'jquery';


const Checkout = (props) => {

   const { totalPrice, makePurchase } = useContext(cartContext);

   const handleSubmit = (e) => {
      e.preventDefault();

      makePurchase();

      $('#checkoutModal').modal('show');

      setTimeout(() => {
         props.history.push('/');
      }, 3000);
   }


   // Modal Checkout (timer)
   $(document).ready(() => {
      $('#checkoutModal').on('shown.bs.modal', () => {
         var timer = setInterval(() => {
            $('#checkoutModal').modal('toggle');
            clearInterval(timer);
         }, 2000);
      });
   });


   return (
      <>
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
                              <img src={require('../../assets/images/cards/mastercard.png')} alt="Mastercard" />
                              <img src={require('../../assets/images/cards/discover.png')} alt="Discover" />
                              <img src={require('../../assets/images/cards/paypal.png')} alt="Paypal" />
                              <img src={require('../../assets/images/cards/american-express.png')} alt="American Express" />
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
      </>
   );
}

export default Checkout;