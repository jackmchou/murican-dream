import React from 'react';
import { Link } from 'react-router-dom';

export default function PPEOrderConfirm(props) {
  return (
    <div className="modal overlay d-block" id="orderConfirmModal" tabIndex="-1" role="dialog"
      aria-labelledby="orderConfirmModalTitle" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header d-inline">
            <h5 className="modal-title text-center" id="orderConfirmModalTitle">Order confirmed!</h5>
          </div>
          <div className="modal-body">
            Thank you for your order!
          </div>
          <div className="modal-footer">
            <Link to="/ppeproductlist">
              <button type="button" className="btn btn-info">Continue Shopping</button>
            </Link>
            <Link to="/">
              <button type="button" className="btn btn-success">Back to Storefront Selection</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
