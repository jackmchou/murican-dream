import React from 'react';
import { Link } from 'react-router-dom';

export default function OrderConfirm(props) {
  return (
    <div className="modal d-block" id="demoDisclaimerModal" tabIndex="-1" role="dialog"
      aria-labelledby="demoDisclaimerModalTitle" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header d-inline">
            <h5 className="modal-title text-center" id="demoDisclaimerModalTitle">Order confirmed!</h5>
          </div>
          <div className="modal-body">
            Thank you for your order!
          </div>
          <div className="modal-footer">
            <Link to="/productlist">
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
