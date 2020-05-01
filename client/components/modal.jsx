import React from 'react';

export default function Modal(props) {
  function productListOrCheckOut() {
    props.showModal();
  }
  if (!props.showModal) return null;
  return (
    <div className="modal d-block" id="demoDisclaimerModal" tabIndex="-1" role="dialog"
      aria-labelledby="demoDisclaimerModalTitle" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header d-inline">
            <h5 className="modal-title text-center" id="demoDisclaimerModalTitle">Item Added!</h5>
          </div>
          <div className="modal-body">
            Would you like to check out? Or Continue to shopping cart?
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-info" onClick={productListOrCheckOut}>View Cart</button>
            <button type="button" className="btn btn-success" onClick={() => props.showModal()}>Check Out</button>
          </div>
        </div>
      </div>
    </div>
  );
}
