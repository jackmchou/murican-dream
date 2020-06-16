import React from 'react';
import LinkButton from '../components/linkbutton';

export default function PPEOrderConfirm(props) {
  return (
    <div className="modal overlay d-block" id="orderConfirmModal" tabIndex="-1" role="dialog"
      aria-labelledby="orderConfirmModalTitle" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered animate__animated animate__bounceIn" role="document">
        <div className="modal-content">
          <div className="modal-header d-inline">
            <h5 className="modal-title text-center" id="orderConfirmModalTitle">Order confirmed!</h5>
          </div>
          <div className="modal-body">
            Thank you for your order!
          </div>
          <div className="modal-footer">
            <LinkButton to="/ppeproductlist" type="button" className="btn btn-info">
              Continue Shopping</LinkButton>
            <LinkButton to="/" type="button" className="btn btn-success">
              Back to Storefront Selection</LinkButton>
          </div>
        </div>
      </div>
    </div>
  );
}
