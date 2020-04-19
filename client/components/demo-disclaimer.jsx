import React from 'react';

export default function DemoDisclaimer(props) {
  return (
    <div className="modal d-block" id="demoDisclaimerModal" tabIndex="-1" role="dialog" aria-labelledby="demoDisclaimerModalTitle" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header d-inline">
            <h5 className="modal-title text-center" id="demoDisclaimerModalTitle">Welcome to Murican Dream</h5>
          </div>
          <div className="modal-body">
            Please note that this website is a content management application created for the purpose of DEMOSTRATION.
            By choosing the accept button below you to acknowledge that the merchandise shown here is NOT available for purchase,
            that you will NOT provide genuine financial or personal information,
            and that you are aware no purchase will truly be processed.
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-primary"
              onClick={() => !props.termsAccepted} data-dismiss="modal">Accept</button>
            <button type="button" className="btn btn-secondary" data-dismiss="modal" aria-label="Close">Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
