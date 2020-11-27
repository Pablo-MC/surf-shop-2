import React, { useContext } from 'react';
import authContext from '../../context/auth/authContext';
import cartContext from '../../context/cart/cartContext';
import CartList from '../cart/CartList';


const Cart = (props) => {

   const { authenticated } = useContext(authContext);
   const { productsCart, totalPrice } = useContext(cartContext);

   
   return (
      <>
         {productsCart.length === 0
            ?
            <div className="container">
               <div className="alert alert-danger lead text-center w-50 mx-auto mt-5" role="alert">
                  There are no products added to the Cart
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
                  <CartList
                     key={product._id}
                     product={product}
                  />
               )}

               <div className="container d-flex justify-content-end mt-4 pt-3 pb-5 cart-price">
                  <h2 className="m-0">Total: $ {totalPrice.toFixed(2)}</h2>
                  {authenticated
                     ?
                     <button
                        type="submit"
                        className="btn btn-md btn-success ml-4 py-2 text-uppercase"
                        onClick={() => props.history.push('/checkout')}
                     >Checkout<i className="fa fa-arrow-right ml-3"></i></button>
                     :
                     <button
                        className="btn btn-md btn-success ml-4 py-2 text-uppercase"
                        onClick={() => props.history.push('/login')}
                     >Checkout<i className="fa fa-arrow-right ml-3"></i></button>
                  }
               </div>
            </div>
         }
      </>
   );
}

export default Cart;
