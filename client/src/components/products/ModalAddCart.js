import React from "react";

const ModalAddCart = () => {
  return (
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
  );
}

export default ModalAddCart;