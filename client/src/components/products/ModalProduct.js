import React from "react";

const ModalProduct = () => {
  return (
    <div className="modal fade style-modal" id="productModal" tabIndex="-1" role="dialog" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title mx-auto" id="nameProduct">...</h5>
          </div>
          <div className="modal-body text-center">
            <img className="w-50" src='...' alt='...' id="imageProduct" />
            <p className="pt-3" id="descriptionProduct">...</p>
          </div>
          <div className="modal-footer mx-auto">
            <button className="btn btn-secondary mr-3" type="button" data-dismiss="modal">
              <i className="fa fa-undo mr-2"></i>Back to Products
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalProduct;