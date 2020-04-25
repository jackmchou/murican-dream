import React from 'react';

export default function DeleteConfirm(props) {
  const qty = 1;
  const itemName = 'name';
  return (
    <div className="modal d-block" id="demoDisclaimerModal" tabIndex="-1" role="dialog"
      aria-labelledby="demoDisclaimerModalTitle" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content text-primary">
          <div className="modal-header d-inline">
            <h5 className="modal-title text-center" id="demoDisclaimerModalTitle">Welcome to Murican Dream</h5>
          </div>
          <div className="modal-body">
            {`Are you sure you want to remove ${qty} of ${itemName} from your cart?`}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-primary"
              onClick={() => props.acceptTerms()} data-dismiss="modal">Yes</button>
            <a href="https://jackmchou.com"><button type="button" className="btn btn-secondary"
              data-dismiss="modal" aria-label="Close">Nah</button></a>
          </div>
        </div>
      </div>
    </div>
  );
}
