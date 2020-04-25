import React from 'react';

export default function ConfirmDelete(props) {
  const { cartItem } = props;
  const itemName = cartItem.name;
  const qty = 1;
  function deleteOperation() {
    props.showModal();
    props.deleteCartItem(cartItem.cartItemId);
  }
  if (!props.show) return null;
  return (
    <div className="modal d-block" id="demoDisclaimerModal" tabIndex="-1" role="dialog"
      aria-labelledby="demoDisclaimerModalTitle" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header d-inline">
            <h5 className="modal-title text-center" id="demoDisclaimerModalTitle">Please confirm</h5>
          </div>
          <div className="modal-body">
            {`Are you sure you want to remove ${qty} of ${itemName} from your cart?`}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-danger" onClick={deleteOperation}>DELETE</button>
            <button type="button" className="btn btn-secondary" onClick={() => props.showModal()}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
}
