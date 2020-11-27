import React, { useContext } from 'react';
import cartContext from '../../context/cart/cartContext';
import $ from 'jquery';


const Product = ({ product }) => {

   const { addProduct } = useContext(cartContext);

   const { name, imageURL, price, description, stock } = product;


   // Modal AddCart (timer)
   $(document).ready(() => {
      $('#cartModal').on('shown.bs.modal', () => {
         var timer = setInterval(() => {
            $('#cartModal').modal('toggle');
            clearInterval(timer);
         }, 700);
      });
   });

   // Modal Product (content)
   const viewModalProduct = (name, imageURL, description) => {
      $('#nameProduct').html(name);
      $('#imageProduct').attr('src', imageURL);
      $('#descriptionProduct').html(description);
   }


   return (
      <>
         <div className="card shadow text-center m-3">
            <div className="card-body mx-auto p-1">
               <p className="lead text-info font-weight-normal pt-3">{name}</p>
               <p className="lead font-weight-normal">$ {price}</p>
               <img src={imageURL} alt={name}
                  className="w-75 d-block mx-auto"
                  data-toggle="modal" data-target="#productModal" role="button"
                  onClick={() => viewModalProduct(name, imageURL, description)}
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


         {/* Modal Product */}
         <div className="modal fade style-modal" id="productModal" tabIndex="-1" role="dialog" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
               <div className="modal-content">
                  <div className="modal-header">
                     <h5 className="modal-title mx-auto" id="nameProduct">{name}</h5>
                  </div>
                  <div className="modal-body text-center">
                     <img className="w-50" src={imageURL} alt={name} id="imageProduct" />
                     <p className="pt-3" id="descriptionProduct">{description}</p>
                  </div>
                  <div className="modal-footer mx-auto">
                     <button className="btn btn-secondary mr-3" type="button" data-dismiss="modal"><i className="fa fa-undo mr-2"></i>Back to Products</button>
                  </div>
               </div>
            </div>
         </div>


         {/* Modal AddCart */}
         <div className="modal fade" id="cartModal" tabIndex="-1" role="dialog" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
               <div className="modal-content">
                  <div className="card-body text-center py-5">
                     <i className="fa fa-check-circle-o text-success fa-5x"></i>
                     <h4 className="mt-3">Product added to Cart</h4>
                  </div>
               </div>
            </div>
         </div>
      </>
   )
}

export default Product;