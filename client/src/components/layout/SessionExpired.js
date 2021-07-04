import React from 'react';
import $ from 'jquery';

const SessionExpired = () => {

  $(document).ready(() => {
    $('#modalExpired').modal('show');
  });

  return (
    <div className="modal fade bg-dark" id="modalExpired" data-backdrop="static" data-keyboard="false" tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header bg-info p-0">
            <img src={require('../../assets/images/logo/logo_white.png')} className="mx-auto" width="100" alt="Main Logo" />
          </div>
          <div className="modal-body text-center p-4 mt-4">
            <h2>Ups!... Your Session Expired</h2>
          </div>
          <div className="modal-footer justify-content-center">
            <a href="/" className="btn btn-secondary text-uppercase ml-3">Exit<i className="fa fa-times-circle ml-2"></i></a>
            <a href="/login" className="btn btn-info text-uppercase ml-3">Sign In<i className="fa fa-user-circle ml-2"></i></a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SessionExpired;