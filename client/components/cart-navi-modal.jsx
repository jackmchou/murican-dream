import React from 'react';
import { Link } from 'react-router-dom';

export default function CartNaviModal(props) {
  if (!props.show) return null;
  return (
    <div className="modal d-block" id="demoDisclaimerModal" tabIndex="-1" role="dialog"
      aria-labelledby="demoDisclaimerModalTitle" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header d-inline">
            <h5 className="modal-title text-center" id="demoDisclaimerModalTitle">Item Added!</h5>
          </div>
          <div className="modal-body">
            Would you like to continue shopping? or view shopping cart?
          </div>
          <div className="modal-footer">
            <Link to="/">
              <button type="button" className="btn btn-info" onClick={() => props.showModal()}>Continue Shopping</button>
            </Link>
            <Link to="/cartsummary">
              <button type="button" className="btn btn-success" onClick={() => props.showModal()}>View Cart</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
